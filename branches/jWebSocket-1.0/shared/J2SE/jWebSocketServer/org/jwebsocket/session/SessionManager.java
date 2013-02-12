//	---------------------------------------------------------------------------
//	jWebSocket - Copyright (c) 2011 jwebsocket.org
//	---------------------------------------------------------------------------
//	This program is free software; you can redistribute it and/or modify it
//	under the terms of the GNU Lesser General Public License as published by the
//	Free Software Foundation; either version 3 of the License, or (at your
//	option) any later version.
//	This program is distributed in the hope that it will be useful, but WITHOUT
//	ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
//	FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for
//	more details.
//	You should have received a copy of the GNU Lesser General Public License along
//	with this program; if not, see <http://www.gnu.org/licenses/lgpl.html>.
//	---------------------------------------------------------------------------
package org.jwebsocket.session;

import java.util.Map;
import javolution.util.FastMap;
import org.apache.log4j.Logger;
import org.jwebsocket.api.*;
import org.jwebsocket.logging.Logging;
import org.jwebsocket.plugins.system.SystemPlugIn;
import org.jwebsocket.storage.httpsession.HttpSessionStorage;

/**
 * Manages the jWebSocket sessions. It uses a cache implementation, which can be
 * configured by Spring.
 *
 * @author kyberneees, aschulze
 */
public class SessionManager implements ISessionManager {

	private IStorageProvider mStorageProvider;
	private ISessionReconnectionManager mReconnectionManager;
	private static Logger mLog = Logging.getLogger();
	private Map<String, IBasicStorage<String, Object>> mStorageRefs;

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public ISessionReconnectionManager getReconnectionManager() {
		return mReconnectionManager;
	}

	/**
	 *
	 * @param aReconnectionManager
	 */
	public void setReconnectionManager(ISessionReconnectionManager aReconnectionManager) {
		this.mReconnectionManager = aReconnectionManager;
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public IStorageProvider getStorageProvider() {
		return mStorageProvider;
	}

	/**
	 *
	 * @param aStorageProvider
	 */
	public void setStorageProvider(IStorageProvider aStorageProvider) {
		this.mStorageProvider = aStorageProvider;
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public IBasicStorage<String, Object> getSession(WebSocketConnector aConnector) throws Exception {
		return getSession(aConnector.getSession().getSessionId());
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public IBasicStorage<String, Object> getSession(String aSessionId) throws Exception {
		if (mLog.isDebugEnabled()) {
			mLog.debug("Getting session for: " + aSessionId + "...");
		}

		if (mStorageRefs.containsKey(aSessionId)) {
			// Getting the local cached storage instance if exists
			return mStorageRefs.get(aSessionId);
		}

		if (mReconnectionManager.isExpired(aSessionId)) {
			if (mLog.isDebugEnabled()) {
				mLog.debug("Creating a blank storage for session: " + aSessionId + "...");
			}
			IBasicStorage<String, Object> lStorage = mStorageProvider.getStorage(aSessionId);
			lStorage.clear();
			mStorageRefs.put(aSessionId, lStorage);

			return lStorage;
		} else {
			// avoid security holes 
			mReconnectionManager.getReconnectionIndex().remove(aSessionId);
			// recovered session, require to be removed from the trash
			mReconnectionManager.getSessionIdsTrash().remove(aSessionId);

			IBasicStorage<String, Object> lStorage = mStorageProvider.getStorage(aSessionId);
			mStorageRefs.put(aSessionId, lStorage);

			return lStorage;
		}
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public void initialize() throws Exception {
		mStorageRefs = new FastMap<String, IBasicStorage<String, Object>>();
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public void shutdown() throws Exception {
		mStorageRefs.clear();
	}

	@Override
	public void connectorStarted(WebSocketConnector aConnector) throws Exception {
		Map<String, Object> lStorage;
		if (null == aConnector.getSession().getStorage()) {
			if (mLog.isDebugEnabled()) {
				mLog.debug("Creating the WebSocketSession persistent storage "
						+ "for connector '" + aConnector.getId() + "'...");
			}
			lStorage = (Map<String, Object>) getSession(aConnector.getSession().getSessionId());
			aConnector.getSession().setStorage(lStorage);
		} else {
			lStorage = aConnector.getSession().getStorage();
		}

		// setting the username
		if (lStorage.containsKey(SystemPlugIn.USERNAME)) {
			aConnector.setUsername(lStorage.get(SystemPlugIn.USERNAME).toString());
		}
	}

	@Override
	public void connectorStopped(WebSocketConnector aConnector) throws Exception {
		Map<String, Object> lStorage = aConnector.getSession().getStorage();

		// ommiting if running in embedded session mode (HTTP servlet containers)
		if (lStorage != null && !(lStorage instanceof HttpSessionStorage)) {
			String lSessionId = aConnector.getSession().getSessionId();

			if (mLog.isDebugEnabled()) {
				mLog.debug("Putting the session: " + lSessionId
						+ ", in reconnection mode...");
			}
			synchronized (this) {
				// removing the local cached  storage instance. 
				// free space if the client never gets reconnected
				mStorageRefs.remove(lSessionId);
				getReconnectionManager().putInReconnectionMode(aConnector.getSession());
			}
		}

		if (mLog.isDebugEnabled()) {
			mLog.debug("Removing connection specific storage for connector '" + aConnector.getId() + "'...");
		}
		getStorageProvider().removeStorage(aConnector.getId());
	}
}
