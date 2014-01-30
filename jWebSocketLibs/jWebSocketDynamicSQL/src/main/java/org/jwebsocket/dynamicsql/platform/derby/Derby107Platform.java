//	---------------------------------------------------------------------------
//	jWebSocket - ClassPathUpdater (Community Edition, CE)
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
package org.jwebsocket.dynamicsql.platform.derby;

import java.sql.Types;
import org.apache.ddlutils.platform.derby.DerbyModelReader;
import org.apache.ddlutils.platform.derby.DerbyPlatform;

/**
 *
 * @author markos
 */
public class Derby107Platform extends DerbyPlatform {

	/**
	 * Creates a new Derby platform instance. For Derby 10.7 or higher.
	 */
	public Derby107Platform() {
		super();
		getPlatformInfo().addNativeTypeMapping(Types.BOOLEAN,
				"BOOLEAN", Types.BOOLEAN);
		setSqlBuilder(new Derby107Builder(this));
		setModelReader(new DerbyModelReader(this));
	}
}