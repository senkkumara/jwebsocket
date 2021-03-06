//	---------------------------------------------------------------------------
//	jWebSocket - IConnectorsManager (Community Edition, CE)
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
package org.jwebsocket.http;

import java.util.Iterator;
import java.util.Map;
import org.jwebsocket.api.IConnectorsPacketQueue;
import org.jwebsocket.api.IInitializable;
import org.jwebsocket.api.ISessionManager;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketEngine;

/**
 *
 * @author kyberneees
 */
public interface IConnectorsManager extends IInitializable {

	/**
	 *
	 * @param aSessionId
	 * @param aConnectionId
	 * @return
	 * @throws Exception
	 */
	WebSocketConnector add(String aSessionId, String aConnectionId) throws Exception;

	/**
	 *
	 * @param aConnectorId
	 * @return
	 */
	boolean connectorExists(String aConnectorId);

	/**
	 *
	 * @return
	 */
	Long count();

	/**
	 *
	 * @return
	 * @throws Exception
	 */
	Map<String, WebSocketConnector> getAll() throws Exception;

	/**
	 *
	 * @param aConnectorId
	 * @return
	 * @throws Exception
	 */
	WebSocketConnector getConnectorById(String aConnectorId) throws Exception;

	/**
	 *
	 * @param aConnectorId
	 * @param aStartupConnection
	 * @return
	 * @throws Exception
	 */
	WebSocketConnector getConnectorById(String aConnectorId, boolean aStartupConnection) throws Exception;

	/**
	 *
	 * @param aSessionId
	 * @return
	 * @throws Exception
	 */
	WebSocketConnector getConnectorBySessionId(String aSessionId) throws Exception;

	/**
	 *
	 * @return
	 */
	WebSocketEngine getEngine();

	/**
	 *
	 * @return
	 */
	IConnectorsPacketQueue getPacketsQueue();

	/**
	 *
	 * @return
	 */
	ISessionManager getSessionManager();

	/**
	 *
	 * @param aSessionId
	 * @return
	 * @throws Exception
	 */
	Map<String, WebSocketConnector> getSharedSession(String aSessionId) throws Exception;

	/**
	 *
	 * @param aConnectorId
	 * @throws Exception
	 */
	void remove(String aConnectorId) throws Exception;

	/**
	 *
	 * @param aSessionId
	 * @return
	 */
	boolean sessionExists(String aSessionId);

	/**
	 *
	 * @param aEngine
	 */
	void setEngine(WebSocketEngine aEngine);

	/**
	 *
	 * @param aPacketsQueue
	 */
	void setPacketsQueue(IConnectorsPacketQueue aPacketsQueue);

	/**
	 *
	 * @return
	 */
	Iterator<WebSocketConnector> getIterator();
}
