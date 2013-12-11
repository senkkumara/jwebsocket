//  ---------------------------------------------------------------------------
//  jWebSocket - IJWSMessageListener (Community Edition, CE)
//	---------------------------------------------------------------------------
//	Copyright 2010-2013 Innotrade GmbH (jWebSocket.org)
//  Alexander Schulze, Germany (NRW)
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

import org.jwebsocket.token.Token;

/**
 *
 * @author aschulze
 */
public interface IJWSMessageListener {

	/**
	 *
	 * @param aFrom
	 * @param aTo
	 * @param aNS
	 * @param aType
	 * @param aArgs
	 * @param aPayload
	 */
	void processMessage(
			String aFrom, String aTo,
			String aNS, String aType, String[] aArgs,
			String aPayload);

	/**
	 *
	 * @param aSourceId
	 * @param aToken
	 */
	void processToken(String aSourceId, Token aToken);

	/**
	 *
	 * @param aSourceId
	 * @param aToken
	 */
	void sendToken(String aSourceId, Token aToken);
}