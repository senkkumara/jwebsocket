//	---------------------------------------------------------------------------
//	jWebSocket - JWSResponseTokenListener (Community Edition, CE)
//	---------------------------------------------------------------------------
//	Copyright 2010-2014 Innotrade GmbH (jWebSocket.org)
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
package org.jwebsocket.jms.endpoint;

import javax.jms.Message;
import org.jwebsocket.packetProcessors.JSONProcessor;
import org.jwebsocket.token.Token;

/**
 *
 * @author Rolando Santamaria Maso
 */
public class JWSResponseTokenListener implements IJMSResponseListener {

	/**
	 *
	 */
	public static final String RESP_TIME_FIELD = "$respTimeElapsed";
	private String mResponseTimeField = null;
	private Long mRequestTime = null;

	/**
	 *
	 */
	public JWSResponseTokenListener() {
	}

	/**
	 *
	 * @param aResponseTimeField
	 */
	public JWSResponseTokenListener(String aResponseTimeField) {
		mResponseTimeField = aResponseTimeField;
		mRequestTime = System.currentTimeMillis();
	}

	@Override
	public void onReponse(String aReponse, Message aMessage) {
		Token lResponseToken = JSONProcessor.JSONStringToToken(aReponse);
		if (null != mResponseTimeField && null != lResponseToken) {
			lResponseToken.setLong(mResponseTimeField,
					System.currentTimeMillis() - mRequestTime);
		}
		// calling token callbacks
		onReponse(lResponseToken);

		if (null != lResponseToken) {
			if ("event".equals(lResponseToken.getString("type"))
					&& "progress".equals(lResponseToken.getString("name"))) {
				onProgress(lResponseToken);
			} else if ("response".equals(lResponseToken.getString("type"))
					&& 0 == lResponseToken.getCode()) {
				onSuccess(lResponseToken);
			} else {
				onFailure(lResponseToken);
			}
		}
	}

	/**
	 *
	 * @param aReponse
	 */
	public void onReponse(Token aReponse) {
	}

	/**
	 *
	 * @param aReponse
	 */
	public void onSuccess(Token aReponse) {
	}

	/**
	 *
	 * @param aReponse
	 */
	public void onFailure(Token aReponse) {
	}

	@Override
	public void onTimeout() {
	}

	/**
	 *
	 * @param aEvent
	 */
	@Override
	public void onProgress(Token aEvent) {
	}
}