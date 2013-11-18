//	---------------------------------------------------------------------------
//	jWebSocket MessagingControl (Community Edition, CE)
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
package org.jwebsocket.util;

import org.jwebsocket.token.Token;
import org.jwebsocket.token.TokenFactory;

/**
 * Utility class to control message packaging for transmission and fragmentation
 *
 * @author kyberneees
 */
public class MessagingControl {

	public static final String TYPE_INFO = "info";
	public static final String TYPE_MESSAGE = "message";
	public static final String NAME_MAX_FRAME_SIZE = "maxFrameSize";
	public static final String NAME_MESSAGE_DELIVERY_ACKNOWLEDGE = "ack";
	public static final String PROPERTY_IS_ACK_REQUIRED = "isAckRequired";
	public static final String PROPERTY_MESSAGE_ID = "msgId";
	public static final String PROPERTY_TYPE = "type";
	public static final String PROPERTY_NAME = "name";
	public static final String PROPERTY_DATA = "data";
	public static final String PROPERTY_IS_FRAGMENT = "isFragment";
	public static final String PROPERTY_IS_LAST_FRAGMENT = "isLastFragment";
	public static final String PROPERTY_FRAGMENTATION_ID = "fragmentationId";
	public static final String PROPERTY_MAX_FRAME_SIZE = NAME_MAX_FRAME_SIZE;
	public static final String PROPERTY_IS_WRAPPED_MESSAGE = "i$WrappedMsg";
	private static Long mUID = new Long(0);

	public static Token buildAckMessage(String aMessageId) {
		Token lMessage = TokenFactory.createToken();
		lMessage.setString(PROPERTY_TYPE, TYPE_INFO);
		lMessage.setString(PROPERTY_NAME, NAME_MESSAGE_DELIVERY_ACKNOWLEDGE);
		lMessage.setString(PROPERTY_DATA, aMessageId);
		lMessage.setBoolean(PROPERTY_IS_WRAPPED_MESSAGE, true);

		return lMessage;
	}

	public static Token buildMaxFrameSizeMessage(int aMaxFrameSize) {
		Token lMessage = TokenFactory.createToken();
		lMessage.setString(PROPERTY_TYPE, TYPE_INFO);
		lMessage.setString(PROPERTY_NAME, NAME_MAX_FRAME_SIZE);
		lMessage.setInteger(PROPERTY_DATA, aMaxFrameSize);
		lMessage.setBoolean(PROPERTY_IS_WRAPPED_MESSAGE, true);

		return lMessage;
	}

	public static Token buildFragmentMessage(String aNodeId, String aFragmentationId,
			boolean aIsLastFragment, byte[] aData) {
		Token lMessage = buildMessage(aNodeId, aData);

		// adding fragment specific properies
		lMessage.setString(PROPERTY_FRAGMENTATION_ID, aFragmentationId);
		lMessage.setBoolean(PROPERTY_IS_FRAGMENT, true);
		lMessage.setBoolean(PROPERTY_IS_LAST_FRAGMENT, aIsLastFragment);

		return lMessage;
	}

	public static Token buildMessage(String aNodeId, byte[] aData) {
		Token lMessage = TokenFactory.createToken();
		lMessage.setString(PROPERTY_TYPE, TYPE_MESSAGE);
		lMessage.setString(PROPERTY_MESSAGE_ID, getUUID(aNodeId));
		lMessage.setString(PROPERTY_DATA, new String(aData));
		lMessage.setBoolean(PROPERTY_IS_WRAPPED_MESSAGE, true);

		return lMessage;
	}

	/**
	 * The resulting UID is in format: "node id"-"long number", example:
	 * "NODE01-0"
	 *
	 * @param aNodeId
	 * @return
	 */
	private static synchronized String getUUID(String aNodeId) {
		if (mUID.equals(Long.MAX_VALUE)) {
			mUID = new Long(0);
		}
		return aNodeId + "-" + String.valueOf(++mUID);
	}

	public static synchronized String getFragmentationID() {
		if (mUID.equals(Long.MAX_VALUE)) {
			mUID = new Long(0);
		}

		return (++mUID).toString();
	}
}