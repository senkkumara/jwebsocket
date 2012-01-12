//  ---------------------------------------------------------------------------
//  jWebSocket - EventsPlugIn
//  Copyright (c) 2010 Innotrade GmbH, jWebSocket.org
//  ---------------------------------------------------------------------------
//  This program is free software; you can redistribute it and/or modify it
//  under the terms of the GNU Lesser General Public License as published by the
//  Free Software Foundation; either version 3 of the License, or (at your
//  option) any later version.
//  This program is distributed in the hope that it will be useful, but WITHOUT
//  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
//  FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for
//  more details.
//  You should have received a copy of the GNU Lesser General Public License along
//  with this program; if not, see <http://www.gnu.org/licenses/lgpl.html>.
//  ---------------------------------------------------------------------------
package org.jwebsocket.eventmodel.plugin.test;

import java.text.DecimalFormat;
import java.util.Map;
import javax.smartcardio.CommandAPDU;
import javax.smartcardio.ResponseAPDU;
import javolution.util.FastMap;
import org.jwebsocket.eventmodel.event.C2SResponseEvent;
import org.jwebsocket.eventmodel.event.test.GetEventsInfo;
import org.jwebsocket.eventmodel.event.test.GetHashCode;
import org.jwebsocket.eventmodel.event.test.S2CNotification;
import org.jwebsocket.eventmodel.event.test.S2CPlusXYEvent;
import org.jwebsocket.eventmodel.event.test.JcTest;
import org.jwebsocket.eventmodel.event.test.UpdateSiteCounterEvent;
import org.jwebsocket.eventmodel.exception.MissingTokenSender;
import org.jwebsocket.eventmodel.plugin.jc.JcPlugIn;
import org.jwebsocket.eventmodel.plugin.jc.JcResponseCallback;
import org.jwebsocket.eventmodel.s2c.FailureReason;
import org.jwebsocket.eventmodel.s2c.OnResponse;
import org.jwebsocket.eventmodel.s2c.TransactionContext;
import org.jwebsocket.logging.Logging;
import org.apache.log4j.Logger;

/**
 *
 * @author kyberneees
 */
public class TestPlugIn extends JcPlugIn {

	private static Logger mLog = Logging.getLogger(TestPlugIn.class);

	/**
	 * Return the hash-code for a custom text
	 * 
	 * @param aEvent
	 * @param aResponseEvent
	 */
	public void processEvent(GetHashCode aEvent, C2SResponseEvent aResponseEvent) throws Exception {
		aResponseEvent.getArgs().setInteger("hash_code", aEvent.getText().hashCode());
	}

	/**
	 * Return the EventsPlugIn name and version
	 * @param aEvent
	 * @param aResponseEvent
	 */
	public void processEvent(GetEventsInfo aEvent, C2SResponseEvent aResponseEvent) {
		Map lInfo = new FastMap();
		lInfo.put("name", "EventsPlugIn");
		lInfo.put("version", "1.0");

		aResponseEvent.getArgs().setMap("table", lInfo);
	}

	/**
	 * Execute a s2c call
	 *
	 * @param aEvent
	 * @param aResponseEvent
	 */
	public void processEvent(S2CNotification aEvent, C2SResponseEvent aResponseEvent) throws MissingTokenSender {
		//Notification with callbacks
		this.notifyS2CEvent(new S2CPlusXYEvent(5, 5)).to(aEvent.getConnector(),
				new OnResponse(new TransactionContext(getEm(), aEvent, null)) {

					@Override
					public boolean isValid(Object response, String from) {
						return response.equals(10);
					}

					@Override
					public void success(Object response, String from) {
						System.out.println(">> S2CPlusXYEvent success callback. Response: " + (Integer) response);

						DecimalFormat f = new DecimalFormat("0");
						System.out.println(">> S2CPlusXYEvent processing time: " + f.format(getProcessingTime()));
						System.out.println(">> S2CPlusXYEvent elapsed time: " + f.format(getElapsedTime()));
						System.out.println(">> S2CPlusXYEvent response from: " + from);

						((TransactionContext) getContext()).success(response);
					}

					@Override
					public void failure(FailureReason reason, String from) {
						System.out.println(">> S2CPlusXYEvent failure callback. Reason: " + reason.name());
					}
				});

		//Notification w/o callbacks
		UpdateSiteCounterEvent e = new UpdateSiteCounterEvent();
		e.setCounter(Integer.MAX_VALUE);
		//Sending to all connectors
		this.notifyS2CEvent(e).to(aEvent.getConnector(), null);
	}

	/**
	 * Test the JavaCard support on the client by sending an arbitrary APDU command
	 * 
	 * @param aEvent
	 * @param aResponseEvent
	 */
	public void processEvent(JcTest aEvent, C2SResponseEvent aResponseEvent) throws Exception {
		if (mLog.isDebugEnabled()) {
			mLog.debug(">> Processing JcTest event notification...");
		}

		byte[] lApdu = {(byte) 0x00, (byte) 0xA4, (byte) 0x04, (byte) 0x00, (byte) 0x08,
			(byte) 0xA0, (byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0x03, (byte) 0x00, (byte) 0x00, (byte) 0x00};

		String lClient = aEvent.getConnector().getId();

		for (String lTerminal : getTerminals(lClient)) {
			if (mLog.isDebugEnabled()) {
				mLog.debug("Sending '" + lApdu.toString() + "' APDU to '" + lTerminal + "' terminal on '" + lClient + "' client ...");
			}
			transmit(lClient, lTerminal, new CommandAPDU(lApdu), new JcResponseCallback(null) {

				@Override
				public void success(ResponseAPDU response, String from) {
					DecimalFormat f = new DecimalFormat("0");

					System.out.println(">> success " + from + " " + response.getBytes());
					System.out.println(">> elapsed time " + f.format(getElapsedTime()));
				}

				@Override
				public void failure(FailureReason reason, String from) {
					System.out.println(">> failure " + from + " " + reason.name());
				}
			});
		}
	}
}
