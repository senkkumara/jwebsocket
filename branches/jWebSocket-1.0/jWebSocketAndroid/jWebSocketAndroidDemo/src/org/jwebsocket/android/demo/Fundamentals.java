// ---------------------------------------------------------------------------
// jWebSocket - Copyright (c) 2010 Innotrade GmbH
// ---------------------------------------------------------------------------
// This program is free software; you can redistribute it and/or modify it
// under the terms of the GNU Lesser General Public License as published by the
// Free Software Foundation; either version 3 of the License, or (at your
// option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License
// for more details.
// You should have received a copy of the GNU Lesser General Public License
// along with this program; if not, see <http://www.gnu.org/licenses/lgpl.html>.
// ---------------------------------------------------------------------------
package org.jwebsocket.android.demo;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import org.jwebsocket.api.WebSocketClientEvent;
import org.jwebsocket.api.WebSocketClientTokenListener;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.WebSocketException;
import org.jwebsocket.token.Token;

/**
 *
 * @author aschulze
 */
public class Fundamentals extends Activity implements WebSocketClientTokenListener {

	private Button lBtnSend;
	private Button lBtnBroadcast;
	private Button lBtnClearLog;
	private EditText lMessage;
	private EditText lTarget;
	private TextView lLog;

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle icicle) {
		super.onCreate(icicle);
		setContentView(R.layout.fundamentals_hvga_p);
		lBtnSend = (Button) findViewById(R.id.btnFundSend);
		lBtnBroadcast = (Button) findViewById(R.id.btnFundBroadcast);
		lBtnClearLog = (Button) findViewById(R.id.btnFundClearLog);
		lMessage = (EditText) findViewById(R.id.txfFundMessage);
		lTarget = (EditText) findViewById(R.id.txfFundTarget);
		lLog = (EditText) findViewById(R.id.lblFundLog);

		lBtnSend.setOnClickListener(new OnClickListener() {

			public void onClick(View aView) {
				try {
					JWC.sendText(lTarget.getText().toString(), lMessage.getText().toString());
				} catch (WebSocketException ex) {
					// TODO: handle exception
				}
			}
		});

		lBtnBroadcast.setOnClickListener(new OnClickListener() {

			public void onClick(View aView) {
				try {
					JWC.broadcastText(lMessage.getText().toString());
				} catch (WebSocketException ex) {
					// TODO: handle exception
				}

			}
		});

		lBtnClearLog.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View aView) {
				lLog.setText("");
			}
		});
	}

	@Override
	protected void onResume() {
		super.onResume();
		log("* opening... ");
		try {
			JWC.addListener(this);
			JWC.open();
		} catch (WebSocketException ex) {
			log("* exception: " + ex.getMessage());
		}
	}

	@Override
	protected void onPause() {
		log("* closing... ");
		try {
			JWC.close();
			JWC.removeListener(this);
		} catch (WebSocketException ex) {
			log("* exception: " + ex.getMessage());
		}
		super.onPause();
	}

	private void log(CharSequence aString) {
		try {
			lLog.append(aString);
		} catch (Exception ex) {
			Toast.makeText(getApplicationContext(), ex.getClass().getSimpleName(),
					Toast.LENGTH_SHORT).show();
		}
	}

	public void processOpened(WebSocketClientEvent aEvent) {
		log("opened\n");
		ImageView lImgView = (ImageView) findViewById(R.id.fundImgStatus);
		if (lImgView != null) {
			// TODO: in fact it is only connected, not yet authenticated!
			lImgView.setImageResource(R.drawable.authenticated);
		}
	}

	public void processPacket(WebSocketClientEvent aEvent, WebSocketPacket aPacket) {
		log("> " + aPacket.getUTF8() + "\n");
	}

	public void processToken(WebSocketClientEvent aEvent, Token aToken) {
		// log("> " + aToken.toString() + "\n");
	}

	public void processClosed(WebSocketClientEvent aEvent) {
		log("closed\n");
		ImageView lImgView = (ImageView) findViewById(R.id.fundImgStatus);
		if (lImgView != null) {
			lImgView.setImageResource(R.drawable.disconnected);
		}
	}

	public void processOpening(WebSocketClientEvent aEvent) {
		log("* opening... ");
	}

	public void processReconnecting(WebSocketClientEvent aEvent) {
		log("* reconnecting... ");
	}
}
