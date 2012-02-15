// ---------------------------------------------------------------------------
// jWebSocket - JMXPlugIn v1.0
// Copyright(c) 2010-2012 Innotrade GmbH, Herzogenrath, Germany, jWebSocket.org
// ---------------------------------------------------------------------------
// THIS CODE IS FOR RESEARCH, EVALUATION AND TEST PURPOSES ONLY!
// THIS CODE MAY BE SUBJECT TO CHANGES WITHOUT ANY NOTIFICATION!
// THIS CODE IS NOT YET SECURE AND MAY NOT BE USED FOR PRODUCTION ENVIRONMENTS!
// ---------------------------------------------------------------------------
// This program is free software; you can redistribute it and/or modify it
// under the terms of the GNU Lesser General Public License as published by the
// Free Software Foundation; either version 3 of the License, or (at your
// option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for
// more details.
// You should have received a copy of the GNU Lesser General Public License along
// with this program; if not, see <http://www.gnu.org/licenses/lgpl.html>.
// ---------------------------------------------------------------------------
package org.jwebsocket.plugins.jmx;

import java.util.List;
import java.util.Map;
import javax.management.MBeanServer;
import javax.management.openmbean.CompositeData;
import javolution.util.FastMap;
import mx4j.tools.adaptor.http.HttpAdaptor;
import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.jwebsocket.api.PluginConfiguration;
import org.jwebsocket.api.WebSocketEngine;
import org.jwebsocket.api.WebSocketPlugIn;
import org.jwebsocket.api.WebSocketServer;
import org.jwebsocket.config.JWebSocketConfig;
import org.jwebsocket.factory.JWebSocketFactory;
import org.jwebsocket.logging.Logging;
import org.jwebsocket.plugins.TokenPlugIn;
import org.jwebsocket.spring.ServerXmlBeanFactory;
import org.jwebsocket.token.JSONToken;
import org.jwebsocket.token.Token;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.memory.InMemoryDaoImpl;

/**
 *
 * @author Lisdey Pérez Hernández(lisdey89, UCI)
 */
public class JMXPlugIn extends TokenPlugIn {

	private static Logger mLog = Logging.getLogger(JMXPlugIn.class);
	private static String mNamespace = "org.jwebsocket.plugins.jmx";
	private static JMXPlugIn mJmxPlugin = null;
	private static CompositeData mInformationOfRunningServers;

	public JMXPlugIn(PluginConfiguration aConfiguration) {
		super(aConfiguration);

		setNamespace(mNamespace);
		if (mLog.isDebugEnabled()) {
			mLog.debug("Instantiating JMX PlugIn...");
		}
		this.mJmxPlugin = this;
	}

	public static JMXPlugIn getInstance() {
		return mJmxPlugin;
	}

	@Override
	public void engineStarted(WebSocketEngine aEngine) {
		JMXHandler.setLog(mLog);
		JMXServerFunctions.setLog(mLog);
		
		String lPath = JWebSocketConfig.getConfigFolder("") + getString("config_file");
		Resource lResource = new FileSystemResource(lPath);
		XmlBeanFactory lFactory = new ServerXmlBeanFactory(lResource, getClass().getClassLoader());
		
		InMemoryDaoImpl lAuthentication = (InMemoryDaoImpl) lFactory.getBean("staticAuthUserDetailsService");
		UserDetails lUser = lAuthentication.loadUserByUsername("admin");
		JMXPlugInAuthenticator.setDefinedUser(lUser.getUsername());
		JMXPlugInAuthenticator.setDefinedPassword(lUser.getPassword());
		
		lFactory.getBean("exporter");
		lFactory.getBean("rmiConnector");
		HttpAdaptor httpAdaptor = (HttpAdaptor) lFactory.getBean("HttpAdaptor");
		try {
			httpAdaptor.addAuthorization(lUser.getUsername(), "httpadmin");
			httpAdaptor.start();

			MBeanServer lMBServer = (MBeanServer) lFactory.getBean("jWebSocketServer");

			String lBeanPath = JWebSocketConfig.getConfigFolder("") + getString("beans_config");

			JMXPlugInsExporter lPluginsExporter = new JMXPlugInsExporter(lBeanPath, lMBServer, mLog);
			lPluginsExporter.createMBeansToExport();
		} catch (Exception ex) {
			mLog.error("JMXPlugIn on engineStarted: " + ex.getMessage());
		}
	}

	public CompositeData invokePluginOperation(String aServer, String aPluginId, String aMethodName, String aMethodParameters) throws Exception {
		try {
			if (aServer.equals("") || aPluginId.equals("") || aMethodName.equals("") || aMethodParameters.equals("")) {
				throw new IllegalArgumentException("The parameters must not be empty.");
			} else {
				//get the object of the server
				WebSocketServer lServer = JWebSocketFactory.getServer(aServer);
				if (lServer != null) {
					//get the plugin
					TokenPlugIn lPlugin = (TokenPlugIn) lServer.getPlugInById(aPluginId);
					if (lPlugin != null) {
						//create the token with json methodParameters
						JSONObject lParameters = new JSONObject(aMethodParameters);
						JSONToken lObjToken = new JSONToken(lParameters);
						lObjToken.setNS(lPlugin.getNamespace());
						lObjToken.setType(aMethodName);
						//invoke the plugin method
						Token lResponse = lPlugin.invoke(null, lObjToken);
						if (lResponse != null) {
							/*creating a CompositeData to expose the TokenResponse of the plugins*/
							CompositeData lResult = JMXHandler.convertMapToCompositeData(lResponse.getMap());
							if (lResult != null) {
								return lResult;
							} else {
								throw new NullPointerException("Failed to convert the resulting Token to a CompositeData.");
							}
						} else {
							throw new NullPointerException("The method specified is not available to invoke.");
						}
					} else {
						throw new NullPointerException("The plugin Id do not belong to any loaded jWebSocket PlugIn.");
					}
				} else {
					throw new NullPointerException("The server Id do not belong to any running jWebSocket Server.");
				}
			}
		} catch (Exception ex) {
			mLog.error("JMXPlugIn on invokePluginOperation: " + ex.getMessage());
			throw new Exception(ex.getMessage());
		}

	}

	public CompositeData getInformationOfRunningServers() throws Exception {
		CompositeData result = null;
		try {
			List<WebSocketServer> lAllServers = JWebSocketFactory.getServers();
			Map lServers = new FastMap();

			for (int i = 0; i < lAllServers.size(); i++) {
				List<WebSocketPlugIn> lAllPlugins = lAllServers.get(i).getPlugInChain().getPlugIns();
				Map lServerPlugins = new FastMap();
				if (!lAllPlugins.isEmpty()) {
					for (int j = 1; j <= lAllPlugins.size(); j++) {
						Map lPlugins = new FastMap();
						TokenPlugIn lValue = (TokenPlugIn) lAllPlugins.get(j - 1);
						lPlugins.put("id", lValue.getId());
						lPlugins.put("name", lValue.getName());
						lPlugins.put("namespace", lValue.getNamespace());

						lServerPlugins.put("plugin_" + j, lPlugins);
					}
				} else {
					lServerPlugins.put("plugin", "This server doesn't have any plugins running");
				}

				lServers.put("serverId" + "_" + lAllServers.get(i).getId(), lServerPlugins);
			}

			result = JMXHandler.convertMapToCompositeData(lServers);
		} catch (Exception ex) {
			mLog.error("JMXPlugIn on getInformationOfRunningServers: " + ex.getMessage());
			throw new Exception(ex.getMessage());
		}
		return result;
	}
}
