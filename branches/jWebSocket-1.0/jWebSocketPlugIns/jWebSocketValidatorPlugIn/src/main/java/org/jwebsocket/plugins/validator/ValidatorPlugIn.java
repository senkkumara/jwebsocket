//	---------------------------------------------------------------------------
//	jWebSocket Validator Plug-in (Community Edition, CE)
//	---------------------------------------------------------------------------
//	Copyright 2010-2015 Innotrade GmbH (jWebSocket.org)
//	Alexander Schulze, Germany (NRW)
//
//	Licensed under the Apache License, Version 2.0 (the "License");
//	you may not use this file except in compliance with the License.
//	You may obtain a copy of the License at
//
//	http://www.apache.org/licenses/LICENSE-2.0
//
//	Unless required by applicable law or agreed to in writing, software
//	distributed under the License is distributed on an "AS IS" BASIS,
//	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//	See the License for the specific language governing permissions and
//	limitations under the License.
//	---------------------------------------------------------------------------
package org.jwebsocket.plugins.validator;

import java.util.Map;
import java.util.Map.Entry;
import org.apache.log4j.Logger;
import org.jwebsocket.api.PluginConfiguration;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.config.JWebSocketCommonConstants;
import org.jwebsocket.config.JWebSocketServerConstants;
import org.jwebsocket.kit.PlugInResponse;
import org.jwebsocket.logging.Logging;
import org.jwebsocket.plugins.TokenPlugIn;
import org.jwebsocket.server.TokenServer;
import org.jwebsocket.token.Token;
import org.jwebsocket.util.Tools;
import org.springframework.context.ApplicationContext;

/**
 *
 * @author Alexander Schulze
 */
public class ValidatorPlugIn extends TokenPlugIn {

	private static final Logger mLog = Logging.getLogger();
	/**
	 *
	 */
	public static final String NS_VALIDATOR = JWebSocketServerConstants.NS_BASE + ".plugins.validator";
	private final static String VERSION = "1.0.0";
	private final static String VENDOR = JWebSocketCommonConstants.VENDOR_CE;
	private final static String LABEL = "jWebSocket ValidatorPlugIn";
	private final static String COPYRIGHT = JWebSocketCommonConstants.COPYRIGHT_CE;
	private final static String LICENSE = JWebSocketCommonConstants.LICENSE_CE;
	private final static String DESCRIPTION = "jWebSocket Validator Plug-in - Community Edition";
	/**
	 *
	 */
	protected ApplicationContext mBeanFactory;
	/**
	 *
	 */
	protected Settings mSettings;

	/**
	 *
	 * @param aConfiguration
	 * @throws Exception
	 */
	public ValidatorPlugIn(PluginConfiguration aConfiguration) throws Exception {
		super(aConfiguration);
		if (mLog.isDebugEnabled()) {
			mLog.debug("Instantiating Validator plug-in...");
		}
		// specify default name space for validator plugin
		this.setNamespace(NS_VALIDATOR);

		try {
			mBeanFactory = getConfigBeanFactory();
			if (null == mBeanFactory) {
				mLog.error("No or invalid spring configuration for validator "
						+ "plug-in, some features may not be available.");
			} else {
				mSettings = (Settings) mBeanFactory.getBean("org.jwebsocket.plugins.validator.settings");
				// replace all alias values with environment variables
				Map<String, String> lAllowedProgs = mSettings.getAllowedProgs();
				for (Entry<String, String> lEntry : lAllowedProgs.entrySet()) {
					lEntry.setValue(Tools.expandEnvVarsAndProps(lEntry.getValue()));
				}
				if (mLog.isInfoEnabled()) {
					mLog.info("Validator plug-in successfully instantiated.");
				}
			}
		} catch (Exception lEx) {
			mLog.error(Logging.getSimpleExceptionMessage(lEx,
					"instantiating validator plug-in"));
			throw lEx;
		}
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
		return NS_VALIDATOR;
	}

	@Override
	public void processToken(PlugInResponse aResponse, WebSocketConnector aConnector, Token aToken) {
		String lType = aToken.getType();
		String lNS = aToken.getNS();

		if (lType != null && getNamespace().equals(lNS)) {
			if (lType.equals("call")) {
				call(aConnector, aToken);
			}
		}
	}

	@Override
	public Token invoke(WebSocketConnector aConnector, Token aToken) {
		String lType = aToken.getType();
		String lNS = aToken.getNS();

		if (lType != null && getNamespace().equals(lNS)) {
			/*
			 if (lType.equals("getFilelist")) {
			 return getFilelist(aConnector.getUsername(), aToken);
			 } else if (lType.equals("getAliasPath")) {
			 String lTargetAlias = aToken.getString("alias");
			 Token lToken = TokenFactory.createToken();
			 lToken.setString("aliasPath", getAliasPath(aConnector, lTargetAlias));

			 return lToken;
			 }
			 */
		}

		return null;
	}

	private void call(WebSocketConnector aConnector, Token aToken) {
		TokenServer lServer = getServer();
		Token lResponse = createResponse(aToken);
		lServer.sendToken(aConnector, lResponse);
	}
}
