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

import javax.management.MBeanServer;
import javax.management.remote.rmi.RMIConnectorServer;
import mx4j.tools.adaptor.http.HttpAdaptor;
import mx4j.tools.adaptor.ssl.SSLAdaptorServerSocketFactory;
import org.apache.log4j.Logger;
import org.jwebsocket.api.PluginConfiguration;
import org.jwebsocket.api.WebSocketEngine;
import org.jwebsocket.config.JWebSocketCommonConstants;
import org.jwebsocket.config.JWebSocketConfig;
import org.jwebsocket.config.JWebSocketServerConstants;
import org.jwebsocket.logging.Logging;
import org.jwebsocket.plugins.TokenPlugIn;
import org.jwebsocket.plugins.jmx.util.JMXPlugInAuthenticator;
import org.springframework.context.ApplicationContext;

/**
 * Main class of the module which takes care of creating the JMX infrastructure
 * to use. Initializes all other components within the module.
 *
 * @author Lisdey Pérez Hernández(lisdey89, UCI)
 */
public class JMXPlugIn extends TokenPlugIn {

	private static Logger mLog = Logging.getLogger();
	private static JMXPlugIn mJmxPlugin = null;
	private HttpAdaptor mHttpAdaptor = null;
	private HttpAdaptor mHttpSSLAdaptor = null;
	private RMIConnectorServer mRmiConnector = null;
	private RMIConnectorServer mRmiSSLConnector = null;
	public static final String NS_JMX =
			JWebSocketServerConstants.NS_BASE + ".plugins.jmx";
	private final static String VERSION = "1.0.0";
	private final static String VENDOR = JWebSocketCommonConstants.VENDOR_CE;
	private final static String LABEL = "jWebSocket JMXPlugIn";
	private final static String COPYRIGHT = JWebSocketCommonConstants.COPYRIGHT_CE;
	private final static String LICENSE = JWebSocketCommonConstants.LICENSE_CE;
	private final static String DESCRIPTION = "jWebSocket JMXPlugIn - Community Edition";

	/**
	 * The class constructor.
	 *
	 * @param aConfiguration
	 */
	public JMXPlugIn(PluginConfiguration aConfiguration) {
		super(aConfiguration);

		setNamespace(NS_JMX);
		if (mLog.isDebugEnabled()) {
			mLog.debug("Instantiating JMX PlugIn...");
		}
		this.mJmxPlugin = this;
	}

	@Override
	public String getVersion() {
		return VERSION;
	}

	@Override
	public String getLabel() {
		return LABEL;
	}

	@Override
	public String getDescription() {
		return DESCRIPTION;
	}

	@Override
	public String getVendor() {
		return VENDOR;
	}

	@Override
	public String getCopyright() {
		return COPYRIGHT;
	}

	@Override
	public String getLicense() {
		return LICENSE;
	}

	@Override
	public String getNamespace() {
		return NS_JMX;
	}

	/**
	 * Static method that returns an instance of this class, which is used in
	 * the module configuration file.
	 *
	 * @return JMXPlugIn
	 */
	public static JMXPlugIn getInstance() {
		return mJmxPlugin;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void engineStarted(WebSocketEngine aEngine) {

		ApplicationContext lFactory = getConfigBeanFactory();
		JMXPlugInAuthenticator.setConfigPath(getString("spring_config"));

		lFactory.getBean("exporter");


		SSLAdaptorServerSocketFactory lSSLSocket = new SSLAdaptorServerSocketFactory();
		lSSLSocket.setKeyStoreName(JWebSocketConfig.getConfigFolder("jWebSocket.ks"));
		String lKeyPass = getServer().getEngines().get("tcp0").getConfiguration().getKeyStorePassword();
		lSSLSocket.setKeyStorePassword(lKeyPass);
		mHttpSSLAdaptor.setSocketFactory(lSSLSocket);


		try {
			mRmiConnector = (RMIConnectorServer) lFactory.getBean("rmiConnector");
			mRmiSSLConnector = (RMIConnectorServer) lFactory.getBean("rmiSSLConnector");
			mHttpAdaptor = (HttpAdaptor) lFactory.getBean("HttpAdaptor");
			mHttpSSLAdaptor = (HttpAdaptor) lFactory.getBean("HttpSSLAdaptor");

			mRmiConnector.start();
			mRmiSSLConnector.start();

			mHttpAdaptor.addAuthorization(getString("http_user"), getString("http_password"));
			mHttpSSLAdaptor.addAuthorization(getString("http_user"), getString("http_password"));

			mHttpAdaptor.start();
			mHttpSSLAdaptor.start();

			MBeanServer lMBServer = (MBeanServer) lFactory.getBean("jWebSocketServer");

			String lBeanPath = JWebSocketConfig.getConfigFolder("")
					+ getString("beans_config");

			JMXPlugInsExporter lPluginsExporter =
					new JMXPlugInsExporter(lBeanPath, lMBServer);

			lPluginsExporter.createMBeansToExport();
		} catch (Exception ex) {
			mLog.error("JMX plug-in on engineStarted: " + ex.getMessage());
		}
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void engineStopped(WebSocketEngine aEngine) {
		try {
			mHttpAdaptor.stop();
			mHttpSSLAdaptor.stop();
			mRmiConnector.stop();
			mRmiSSLConnector.stop();
		} catch (Exception ex) {
			mLog.error("JMX plug-in on engineStopped: " + ex.getMessage());
		}
	}
}
