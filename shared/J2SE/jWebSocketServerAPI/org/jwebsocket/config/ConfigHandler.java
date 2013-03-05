//	---------------------------------------------------------------------------
//	jWebSocket - ConfigHandler (Community Edition, CE)
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
package org.jwebsocket.config;

import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;

/**
 * Base interface for config handler.
 *
 * @author puran
 * @version $Id: ConfigHandler.java 596 2010-06-22 17:09:54Z fivefeetfurther $
 *
 */
public interface ConfigHandler {

	/**
	 * Process the configuration using the give xml stream reader
	 *
	 * @param streamReader the stream reader object
	 * @return the config object
	 * @throws XMLStreamException if exception occurs while parsing
	 */
	Config processConfig(XMLStreamReader streamReader) throws XMLStreamException;
}
