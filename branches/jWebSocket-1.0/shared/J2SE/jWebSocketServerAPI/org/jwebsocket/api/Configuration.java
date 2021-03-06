//	---------------------------------------------------------------------------
//	jWebSocket - Configuration (Community Edition, CE)
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
package org.jwebsocket.api;

/**
 * Base interface for all the configurations of jWebSocket
 *
 * @author puran
 * @version $Id: Configuration.java 570 2010-06-20 02:41:13Z
 * mailtopuran@gmail.com $
 */
public interface Configuration {

	/**
	 * @return the id
	 */
	String getId();

	/**
	 * @return the name
	 */
	String getName();
}
