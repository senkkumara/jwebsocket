//	---------------------------------------------------------------------------
//	jWebSocket - MemoryClientCollection (Community Edition, CE)
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
package org.jwebsocket.plugins.itemstorage.memory;

import java.util.List;
import javolution.util.FastList;
import org.jwebsocket.plugins.itemstorage.api.IClientCollection;

/**
 *
 * @author Rolando Santamaria Maso
 */
public class MemoryClientCollection implements IClientCollection {

	private final List<String> mData = new FastList<String>();

	@Override
	public boolean contains(String aUID) {
		return mData.contains(aUID);
	}

	@Override
	public void add(String aUID) {
		if (!contains(aUID)) {
			mData.add(aUID);
		}
	}

	@Override
	public void remove(String aUID) {
		mData.remove(aUID);
	}

	@Override
	public List<String> getAll() {
		return mData;
	}

	@Override
	public void clear() {
		mData.clear();
	}

	@Override
	public int size() {
		return mData.size();
	}
}
