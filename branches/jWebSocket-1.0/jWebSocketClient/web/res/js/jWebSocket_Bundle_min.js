
//	---------------------------------------------------------------------------
//	jWebSocket Client (uses jWebSocket Server)
//	Copyright (c) 2010, 2011 Alexander Schulze, Innotrade GmbH, Herzogenrath
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
if(window.iA){window.WebSocket=window.iA;}var jws={VERSION:"1.0b6 (nightly build 20412)",NS_BASE:"org.jwebsocket",NS_SYSTEM:"org.jwebsocket.plugins.system",MSG_WS_NOT_SUPPORTED:"Unfortunately your browser does neither natively support WebSockets\n"+"nor you have the Adobe Flash-PlugIn 10+ installed.\n"+"Please download the last recent Adobe Flash Player at http://get.adobe.com/flashplayer.",CUR_TOKEN_ID:0,JWS_SERVER_SCHEMA:"ws",JWS_SERVER_SSL_SCHEMA:"wss",JWS_SERVER_HOST:(self.location.hostname?self.location.hostname:"127.0.0.1"),JWS_SERVER_PORT:8787,JWS_SERVER_SSL_PORT:9797,JWS_SERVER_CONTEXT:"/jWebSocket",JWS_SERVER_SERVLET:"/jWebSocket",JWS_SERVER_URL:"ws://"+(self.location.hostname?self.location.hostname:"127.0.0.1")+":8787/jWebSocket/jWebSocket",CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3,gf:1000,kX:1001,hZ:{fh:false,fY: -1,hK: -1,hg: -1,hp: -1},jR:{fh:true,fY:2000,hK:30000,hg:1000,hp:1024*1024*10},WS_SUBPROT_JSON:"org.jwebsocket.json",WS_SUBPROT_XML:"org.jwebsocket.xml",WS_SUBPROT_CSV:"org.jwebsocket.csv",WS_SUBPROT_CUSTOM:"org.jwebsocket.text",jP:"org.jwebsocket.text",lc:"org.jwebsocket.binary",SCOPE_PRIVATE:"private",SCOPE_PUBLIC:"public",DEF_RESP_TIMEOUT:30000,iD:0,gc:1,gY:2,hh:3,gW:4,hB:5,jl:6,fA:["Unknown","Firefox","Netscape","Opera","Internet Explorer","Safari","Chrome"],jZ:"guest",kK:"guest",kf:"root",ks:"root",$:function(aT){return document.getElementById(aT);},getServerURL:function(fm,bM,bv,dL,dc){var cW=fm+"://"+bM+(bv?":"+bv:"");if(dL&&dL.length>0){cW+=dL;if(dc&&dc.length>0){cW+=dc;}}return cW;},getDefaultServerURL:function(){return(this.getServerURL(jws.JWS_SERVER_SCHEMA,jws.JWS_SERVER_HOST,jws.JWS_SERVER_PORT,jws.JWS_SERVER_CONTEXT,jws.JWS_SERVER_SERVLET));},getDefaultSSLServerURL:function(){return(this.getServerURL(jws.JWS_SERVER_SSL_SCHEMA,jws.JWS_SERVER_HOST,jws.JWS_SERVER_SSL_PORT,jws.JWS_SERVER_CONTEXT,jws.JWS_SERVER_SERVLET));},browserSupportsWebSockets:function(){return(window.WebSocket!==null&&window.WebSocket!==undefined);},browserSupportsNativeWebSockets:(function(){return(window.WebSocket!==null&&window.WebSocket!==undefined);})(),browserSupportsJSON:function(){return(window.JSON!==null&&window.JSON!==undefined);},browserSupportsNativeJSON:(function(){return(window.JSON!==null&&window.JSON!==undefined);})(),browserSupportsWebWorkers:(function(){return(window.Worker!==null&&window.Worker!==undefined);})(),runAsThread:function(ax){if(!this.browserSupportsWebWorkers){return{code: -1,msg:"Browser does not (yet) support WebWorkers."};}if(!ax){ax={};}var dv=null;var dG=null;var dw=jws.SCRIPT_PATH+"jwsWorker.js";var bu=null;var bC=[];if(ax.OnMessage&&typeof ax.OnMessage=="function"){dv=ax.OnMessage;}if(ax.OnError&&typeof ax.OnError=="function"){dG=ax.OnError;}if(ax.file&&typeof ax.file=="String"){dw=ax.file;}if(ax.method&&typeof ax.method=="function"){bu=ax.method;}if(ax.args){bC=ax.args;}var dJ=this;if(!jws.worker){jws.worker=new Worker(dw);jws.worker.onmessage=function(cz){if(dv!=null){dv.call(dJ,{data:cz.data});}};jws.worker.onerror=function(cz){if(dG!=null){dG.call(dJ,{message:cz.message});}};}jws.worker.postMessage({method:bu.toString(),args:bC});return{code:0,msg:"ok",worker:jws.worker};},SCRIPT_PATH:(function(){var bf=document.getElementsByTagName("script");for(var db=0,dB=bf.length;db<dB;db++){var bi=bf[db];var ad=bi.src;if(!ad){ad=bi.getAttribute("src");}if(ad){var bg=ad.lastIndexOf("jWebSocket");if(bg>0){return ad.substr(0,bg);}}}return null;})(),isIE:(function(){var aS=navigator.userAgent;var bJ=aS.indexOf("MSIE");return(bJ>=0);})(),iU:function(){return this.eH;},hn:function(){return this.ft;},jw:function(){return this.fB;},isFirefox:function(){return this.gr;},iq:function(){return this.gG;},ku:function(){return this.hy;},hJ:function(){return this.gz;},jx:function(){return(this.hJ()&&this.hn()<7);},hO:function(){return(this.hJ()&&this.hn()<8);},kA:function(){return(this.hJ()&&this.hn()>=8);},ih:function(){return this.gS;},iQ:function(){return this.gJ;},jd:function(){return this.fS;},console:{fd:false,fG:2,ALL:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,FATAL:5,gn:function(){return(window.console&&jws.console.fd&&jws.console.fG<=jws.console.DEBUG);},iR:function(){return(window.console&&jws.console.fd&&jws.console.fG<=jws.console.INFO);},log:function(eU){if(window.console&&jws.console.fd){console.log(eU);}},fk:function(eU){if(window.console&&jws.console.fd&&jws.console.fG<=jws.console.DEBUG){if(console.fk){console.fk(eU);}else{console.log("[fk]: "+eU);}}},info:function(eU){if(window.console&&jws.console.fd&&jws.console.fG<=jws.console.INFO){if(console.info){console.info(eU);}else{console.log("[info]: "+eU);}}},hA:function(eU){if(window.console&&jws.console.fd&&jws.console.fG<=jws.console.WARN){if(console.hA){console.hA(eU);}else{console.log("[hA]: "+eU);}}},error:function(eU){if(window.console&&jws.console.fd&&jws.console.fG<=jws.console.ERROR){if(console.error){console.error(eU);}else{console.log("[error]: "+eU);}}},gK:function(eU){if(window.console&&jws.console.fd&&jws.console.fG<=jws.console.FATAL){if(console.gK){console.gK(eU);}else{console.log("[gK]: "+eU);}}},kk:function(){return jws.console.fG;},lu:function(fo){jws.console.fG=fo;},isActive:function(){return jws.console.fd;},setActive:function(eq){jws.console.fd=eq;}}};(function(){jws.eH="unknown";jws.dS=jws.iD;jws.ft=undefined;jws.gz=false;jws.gr=false;jws.gJ=false;jws.gG=false;jws.gS=false;jws.hy=false;var fi=navigator.userAgent;jws.hy=fi.indexOf("Chrome")>=0;if(jws.hy){jws.dS=jws.jl;}else{jws.gS=fi.indexOf("Safari")>=0;if(jws.gS){jws.dS=jws.hB;}else{jws.gJ=fi.indexOf("Netscape")>=0;if(jws.gJ){jws.dS=jws.gY;}else{jws.gr=navigator.appName=="Netscape";if(jws.gr){jws.dS=jws.gc;}else{jws.gG=navigator.appName=="Opera";if(jws.gG){jws.dS=jws.hh;}else{jws.gz=navigator.appName=="Microsoft Internet Explorer";if(jws.gz){jws.dS=jws.gW;}else{jws.fS=navigator.appName=="Microsoft Pocket Internet Explorer";if(jws.fS){jws.dS=jws.gW;}}}}}}}var p,i;var aK;var fg;var aJ;if(jws.gz){jws.eH=jws.fA[jws.gW];aJ=fi.match(/MSIE.*/i);if(aJ){aK=aJ[0].substr(5);p=aK.indexOf(";");jws.fB=p>0?aK.substr(0,p):aK;jws.ft=parseFloat(jws.fB);}}else if(jws.gr){jws.eH=jws.fA[jws.gc];aJ=fi.match(/Firefox\/.*/i);if(aJ){aK=aJ[0].substr(8);p=aK.indexOf(" ");if(p>0){jws.fB=aK.substring(0,p);}else{jws.fB=aK;}fg=0;i=0;while(i<aK.length){if(aK.charAt(i)=='.'){fg++;}if(fg>=2){break;}i++;}aK=aK.substring(0,i);jws.ft=parseFloat(aK);}}else if(jws.gJ){jws.eH=jws.fA[jws.gY];aJ=fi.match(/Netscape\/.*/i);if(aJ){aK=aJ[0].substr(9);p=aK.indexOf(" ");if(p>0){jws.fB=aK.substring(0,p);}else{jws.fB=aK;}fg=0;i=0;while(i<aK.length){if(aK.charAt(i)=='.'){fg++;}if(fg>=2){break;}i++;}aK=aK.substring(0,i);jws.ft=parseFloat(aK);}}else if(jws.gG){jws.eH=jws.fA[jws.hh];aJ=fi.match(/Opera\/.*/i);if(aJ){aK=aJ[0].substr(6);p=aK.indexOf(" ");jws.fB=p>0?aK.substr(0,p):aK;jws.ft=parseFloat(aK);aJ=fi.match(/Version\/.*/i);aK=aJ[0].substr(8);if(aJ){p=aK.indexOf(" ");jws.fB=(p>0?aK.substr(0,p):aK)+"/"+jws.fB;jws.ft=parseFloat(aK);}}}else if(jws.hy){jws.eH=jws.fA[jws.jl];aJ=fi.match(/Chrome\/.*/i);if(aJ){aK=aJ[0].substr(7);p=aK.indexOf(" ");jws.fB=p>0?aK.substr(0,p):aK;jws.ft=parseFloat(aK);}}else if(jws.gS){jws.eH=jws.fA[jws.hB];aJ=fi.match(/Version\/.*/i);if(aJ){aK=aJ[0].substr(8);p=aK.indexOf(" ");jws.fB=p>0?aK.substr(0,p):aK;fg=0;i=0;while(i<aK.length){if(aK.charAt(i)=='.'){fg++;}if(fg>=2){break;}i++;}aK=aK.substring(0,i);jws.ft=parseFloat(aK);aJ=fi.match(/Safari\/.*/i);if(aJ){aK="."+aJ[0].substr(7);p=aK.indexOf(" ");jws.fB+=p>0?aK.substr(0,p):aK;}}}}());jws.events={addEventListener:(jws.isIE?function(as,cz,aA){as.attachEvent("on"+cz,aA);}:function(as,cz,aA){as.addEventListener(cz,aA,false);}),removeEventListener:(jws.isIE?function(as,cz,aA){as.detachEvent("on"+cz,aA);}:function(as,cz,aA){as.removeEventListener(cz,aA,false);}),getTarget:(jws.isIE?function(cz){return cz.srcElement;}:function(cz){return cz.target;}),preventDefault:(jws.isIE?function(cz){cz=window.event;if(cz){cz.returnValue=false;}}:function(cz){return cz.preventDefault();})};
/* A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 * For full source please refer to: md5.js
 */
var hexcase=0;
var b64pad="";
function hex_md5(s){
	return rstr2hex(rstr_md5(str2rstr_utf8(s)));
};

function b64_md5(s){
	return rstr2b64(rstr_md5(str2rstr_utf8(s)));
};

function any_md5(s,e){
	return rstr2any(rstr_md5(str2rstr_utf8(s)),e);
};

function hex_hmac_md5(k,d){
	return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)));
};

function b64_hmac_md5(k,d){
	return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)));
};

function any_hmac_md5(k,d,e){
	return rstr2any(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)),e);
};

function md5_vm_test(){
	return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72";
};

function rstr_md5(s){
	return binl2rstr(binl_md5(rstr2binl(s),s.length*8));
};

function rstr_hmac_md5(key,data){
	var bkey=rstr2binl(key);
	if(bkey.length>16)bkey=binl_md5(bkey,key.length*8);
	var ipad=Array(16),opad=Array(16);
	for(var i=0;i<16;i++){
		ipad[i]=bkey[i]^0x36363636;
		opad[i]=bkey[i]^0x5C5C5C5C;
	}
	var hash=binl_md5(ipad.concat(rstr2binl(data)),512+data.length*8);
	return binl2rstr(binl_md5(opad.concat(hash),512+128));
};

function rstr2hex(input){
	try{
		hexcase
		}catch(e){
		hexcase=0;
	}
	var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";
	var output="";
	var x;
	for(var i=0;i<input.length;i++){
		x=input.charCodeAt(i);
		output+=hex_tab.charAt((x>>>4)&0x0F)+hex_tab.charAt(x&0x0F);
	}
	return output;
};

function rstr2b64(input){
	try{
		b64pad
		}catch(e){
		b64pad='';
	}
	var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var output="";
	var len=input.length;
	for(var i=0;i<len;i+=3){
		var triplet=(input.charCodeAt(i)<<16)|(i+1<len?input.charCodeAt(i+1)<<8:0)|(i+2<len?input.charCodeAt(i+2):0);
		for(var j=0;j<4;j++){
			if(i*8+j*6>input.length*8)output+=b64pad;else output+=tab.charAt((triplet>>>6*(3-j))&0x3F);
		}
		}
		return output;
};

function rstr2any(input,encoding){
	var divisor=encoding.length;
	var i,j,q,x,quotient;
	var dividend=Array(Math.ceil(input.length/2));
	for(i=0;i<dividend.length;i++){
		dividend[i]=(input.charCodeAt(i*2)<<8)|input.charCodeAt(i*2+1);
	}
	var full_length=Math.ceil(input.length*8/(Math.log(encoding.length)/Math.log(2)));
	var remainders=Array(full_length);
	for(j=0;j<full_length;j++){
		quotient=Array();
		x=0;
		for(i=0;i<dividend.length;i++){
			x=(x<<16)+dividend[i];
			q=Math.floor(x/divisor);
			x-=q*divisor;
			if(quotient.length>0||q>0)quotient[quotient.length]=q;
		}
		remainders[j]=x;
		dividend=quotient;
	}
	var output="";
	for(i=remainders.length-1;i>=0;i--)output+=encoding.charAt(remainders[i]);
	return output;
};

function str2rstr_utf8(input){
	var output="";
	var i= -1;
	var x,y;
	while(++i<input.length){
		x=input.charCodeAt(i);
		y=i+1<input.length?input.charCodeAt(i+1):0;
		if(0xD800<=x&&x<=0xDBFF&&0xDC00<=y&&y<=0xDFFF){
			x=0x10000+((x&0x03FF)<<10)+(y&0x03FF);
			i++;
		}
		if(x<=0x7F)output+=String.fromCharCode(x);
		else if(x<=0x7FF)output+=String.fromCharCode(0xC0|((x>>>6)&0x1F),0x80|(x&0x3F));
		else if(x<=0xFFFF)output+=String.fromCharCode(0xE0|((x>>>12)&0x0F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));
		else if(x<=0x1FFFFF)output+=String.fromCharCode(0xF0|((x>>>18)&0x07),0x80|((x>>>12)&0x3F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));
	}
	return output;
};

function str2rstr_utf16le(input){
	var output="";
	for(var i=0;i<input.length;i++)output+=String.fromCharCode(input.charCodeAt(i)&0xFF,(input.charCodeAt(i)>>>8)&0xFF);
	return output;
};

function str2rstr_utf16be(input){
	var output="";
	for(var i=0;i<input.length;i++)output+=String.fromCharCode((input.charCodeAt(i)>>>8)&0xFF,input.charCodeAt(i)&0xFF);
	return output;
};

function rstr2binl(input){
	var output=Array(input.length>>2);
	for(var i=0;i<output.length;i++)output[i]=0;
	for(var i=0;i<input.length*8;i+=8)output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<(i%32);
	return output;
};

function binl2rstr(input){
	var output="";
	for(var i=0;i<input.length*32;i+=8)output+=String.fromCharCode((input[i>>5]>>>(i%32))&0xFF);
	return output;
};

function binl_md5(x,len){
	x[len>>5]|=0x80<<((len)%32);
	x[(((len+64)>>>9)<<4)+14]=len;
	var a=1732584193;
	var b= -271733879;
	var c= -1732584194;
	var d=271733878;
	for(var i=0;i<x.length;i+=16){
		var olda=a;
		var oldb=b;
		var oldc=c;
		var oldd=d;
		a=md5_ff(a,b,c,d,x[i+0],7,-680876936);
		d=md5_ff(d,a,b,c,x[i+1],12,-389564586);
		c=md5_ff(c,d,a,b,x[i+2],17,606105819);
		b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);
		a=md5_ff(a,b,c,d,x[i+4],7,-176418897);
		d=md5_ff(d,a,b,c,x[i+5],12,1200080426);
		c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);
		b=md5_ff(b,c,d,a,x[i+7],22,-45705983);
		a=md5_ff(a,b,c,d,x[i+8],7,1770035416);
		d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);
		c=md5_ff(c,d,a,b,x[i+10],17,-42063);
		b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);
		a=md5_ff(a,b,c,d,x[i+12],7,1804603682);
		d=md5_ff(d,a,b,c,x[i+13],12,-40341101);
		c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);
		b=md5_ff(b,c,d,a,x[i+15],22,1236535329);
		a=md5_gg(a,b,c,d,x[i+1],5,-165796510);
		d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);
		c=md5_gg(c,d,a,b,x[i+11],14,643717713);
		b=md5_gg(b,c,d,a,x[i+0],20,-373897302);
		a=md5_gg(a,b,c,d,x[i+5],5,-701558691);
		d=md5_gg(d,a,b,c,x[i+10],9,38016083);
		c=md5_gg(c,d,a,b,x[i+15],14,-660478335);
		b=md5_gg(b,c,d,a,x[i+4],20,-405537848);
		a=md5_gg(a,b,c,d,x[i+9],5,568446438);
		d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);
		c=md5_gg(c,d,a,b,x[i+3],14,-187363961);
		b=md5_gg(b,c,d,a,x[i+8],20,1163531501);
		a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);
		d=md5_gg(d,a,b,c,x[i+2],9,-51403784);
		c=md5_gg(c,d,a,b,x[i+7],14,1735328473);
		b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);
		a=md5_hh(a,b,c,d,x[i+5],4,-378558);
		d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);
		c=md5_hh(c,d,a,b,x[i+11],16,1839030562);
		b=md5_hh(b,c,d,a,x[i+14],23,-35309556);
		a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);
		d=md5_hh(d,a,b,c,x[i+4],11,1272893353);
		c=md5_hh(c,d,a,b,x[i+7],16,-155497632);
		b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);
		a=md5_hh(a,b,c,d,x[i+13],4,681279174);
		d=md5_hh(d,a,b,c,x[i+0],11,-358537222);
		c=md5_hh(c,d,a,b,x[i+3],16,-722521979);
		b=md5_hh(b,c,d,a,x[i+6],23,76029189);
		a=md5_hh(a,b,c,d,x[i+9],4,-640364487);
		d=md5_hh(d,a,b,c,x[i+12],11,-421815835);
		c=md5_hh(c,d,a,b,x[i+15],16,530742520);
		b=md5_hh(b,c,d,a,x[i+2],23,-995338651);
		a=md5_ii(a,b,c,d,x[i+0],6,-198630844);
		d=md5_ii(d,a,b,c,x[i+7],10,1126891415);
		c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);
		b=md5_ii(b,c,d,a,x[i+5],21,-57434055);
		a=md5_ii(a,b,c,d,x[i+12],6,1700485571);
		d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);
		c=md5_ii(c,d,a,b,x[i+10],15,-1051523);
		b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);
		a=md5_ii(a,b,c,d,x[i+8],6,1873313359);
		d=md5_ii(d,a,b,c,x[i+15],10,-30611744);
		c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);
		b=md5_ii(b,c,d,a,x[i+13],21,1309151649);
		a=md5_ii(a,b,c,d,x[i+4],6,-145523070);
		d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);
		c=md5_ii(c,d,a,b,x[i+2],15,718787259);
		b=md5_ii(b,c,d,a,x[i+9],21,-343485551);
		a=safe_add(a,olda);
		b=safe_add(b,oldb);
		c=safe_add(c,oldc);
		d=safe_add(d,oldd);
	}
	return Array(a,b,c,d);
};

function md5_cmn(q,a,b,x,s,t){
	return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);
};

function md5_ff(a,b,c,d,x,s,t){
	return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);
};

function md5_gg(a,b,c,d,x,s,t){
	return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);
};

function md5_hh(a,b,c,d,x,s,t){
	return md5_cmn(b^c^d,a,b,x,s,t);
};

function md5_ii(a,b,c,d,x,s,t){
	return md5_cmn(c^(b|(~d)),a,b,x,s,t);
};

function safe_add(x,y){
	var lsw=(x&0xFFFF)+(y&0xFFFF);
	var msw=(x>>16)+(y>>16)+(lsw>>16);
	return(msw<<16)|(lsw&0xFFFF);
};

function bit_rol(num,cnt){
	return(num<<cnt)|(num>>>(32-cnt));
}
;jws.tools={zerofill:function(ay,am){var bj=ay.toFixed(0);if(bj.length>am){bj=bj.substring(bj.length-am);}else{while(bj.length<am){bj="0"+bj;}}return bj;},calcMD5:function(aUTF8){return(hex_md5(aUTF8));},iF:function(gb){if(gb&&typeof ck=="string"){}return gb;},date2ISO:function(du){var fJ= -du.getTimezoneOffset();var dE=Math.abs(fJ);var bj=du.getUTCFullYear()+"-"+this.zerofill(du.getUTCMonth()+1,2)+"-"+this.zerofill(du.getUTCDate(),2)+"T"+this.zerofill(du.getUTCHours(),2)+":"+this.zerofill(du.getUTCMinutes(),2)+":"+this.zerofill(du.getUTCSeconds(),2)+"."+this.zerofill(du.getUTCMilliseconds(),3)+"Z";return bj;},ISO2Date:function(bp,bd){var dK=new Date();dK.setUTCFullYear(bp.substr(0,4));dK.setUTCMonth(bp.substr(5,2)-1);dK.setUTCDate(bp.substr(8,2));dK.setUTCHours(bp.substr(11,2));dK.setUTCMinutes(bp.substr(14,2));dK.setUTCSeconds(bp.substr(17,2));dK.setUTCMilliseconds(bp.substr(20,3));return dK;},kV:function(du){var bj=du.getUTCFullYear()+this.zerofill(du.getUTCMonth()+1,2)+this.zerofill(du.getUTCDate(),2)+this.zerofill(du.getUTCHours(),2)+this.zerofill(du.getUTCMinutes(),2)+this.zerofill(du.getUTCSeconds(),2)+this.zerofill(du.getUTCMilliseconds(),2);return bj;},la:function(bp){var dK=new Date();dK.setUTCFullYear(bp.substr(0,4));dK.setUTCMonth(bp.substr(4,2)-1);dK.setUTCDate(bp.substr(6,2));dK.setUTCHours(bp.substr(8,2));dK.setUTCMinutes(bp.substr(10,2));dK.setUTCSeconds(bp.substr(12,2));dK.setUTCMilliseconds(bp.substr(14,3));return dK;},generateSharedUTID:function(aR){var string=JSON.stringify(aR);var chars=string.split('');chars.sort();return hex_md5("{"+chars.toString()+"}");},getType:function(ey){var dM=ey;var bj=typeof dM;if("number"==bj){if((parseFloat(dM)==parseInt(dM))){bj="integer";}else{bj="double";}}else if(Object.prototype.toString.call(dM)==="[object Array]"){bj="array";}else if(dM===null){bj="null";}return bj;},kc:function(ey,hf,ir){var jA=ir||"";var gw=null;var eo=null;for(eo in hf){gw="set"+eo.substr(0,1).toUpperCase()+eo.substr(1);if(typeof(ey[gw])=="function"){ey[gw](hf[eo]);}else{ey[jA+eo]=hf[eo];}}return ey;},gC:function(ey){if(null==ey||"object"!=typeof(cQ)){return ey;}if("function"==typeof(ey["gC"])){return ey.gC();}if(ey instanceof Date){return new Date(ey.getTime());}var iz=function(gP){var gg=gP.length;var gq=[];if(gg>0){for(var dO=0;dO<gg;dO++){gq[dO]=jws.tools.gC(gP[dO]);}}return gq;};var dH=new ey.constructor();for(var gh in ey){var dM=ey[gh];if(dM instanceof Array)dH[gh]=iz(dM);else{dH[gh]=jws.tools.gC(dM);}}return dH;}};if(!jws.browserSupportsNativeWebSockets){
	// --- swfobject.js ---
	// SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	// released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
	var swfobject=function(){
		var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){
			var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;
			if(typeof t.plugins!=D&&typeof t.plugins[S]==r){
				ab=t.plugins[S].description;
				if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){
					T=true;
					X=false;
					ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
					ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);
					ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);
					ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0
					}
				}else{
			if(typeof O.ActiveXObject!=D){
				try{
					var ad=new ActiveXObject(W);
					if(ad){
						ab=ad.GetVariable("$version");
						if(ab){
							X=true;
							ab=ab.split(" ")[1].split(",");
							ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]
							}
						}
				}catch(Z){}
	}
}
return{
	w3:aa,
	pv:ag,
	wk:af,
	ie:X,
	win:ae,
	mac:ac
}
}(),k=function(){
	if(!M.w3){
		return
	}
	if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){
		f()
		}
		if(!J){
		if(typeof j.addEventListener!=D){
			j.addEventListener("DOMContentLoaded",f,false)
			}
			if(M.ie&&M.win){
			j.attachEvent(x,function(){
				if(j.readyState=="complete"){
					j.detachEvent(x,arguments.callee);
					f()
					}
				});
		if(O==top){
			(function(){
				if(J){
					return
				}
				try{
					j.documentElement.doScroll("left")
					}catch(X){
					setTimeout(arguments.callee,0);
					return
				}
				f()
				})()
			}
		}
	if(M.wk){
	(function(){
		if(J){
			return
		}
		if(!/loaded|complete/.test(j.readyState)){
			setTimeout(arguments.callee,0);
			return
		}
		f()
		})()
	}
	s(f)
}
}();
function f(){
	if(J){
		return
	}
	try{
		var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));
		Z.parentNode.removeChild(Z)
		}catch(aa){
		return
	}
	J=true;
	var X=U.length;
	for(var Y=0;Y<X;Y++){
		U[Y]()
		}
	}
	function K(X){
	if(J){
		X()
		}else{
		U[U.length]=X
		}
	}
function s(Y){
	if(typeof O.addEventListener!=D){
		O.addEventListener("load",Y,false)
		}else{
		if(typeof j.addEventListener!=D){
			j.addEventListener("load",Y,false)
			}else{
			if(typeof O.attachEvent!=D){
				i(O,"onload",Y)
				}else{
				if(typeof O.onload=="function"){
					var X=O.onload;
					O.onload=function(){
						X();
						Y()
						}
					}else{
				O.onload=Y
				}
			}
	}
}
}
function h(){
	if(T){
		V()
		}else{
		H()
		}
	}
function V(){
	var X=j.getElementsByTagName("body")[0];
	var aa=C(r);
	aa.setAttribute("type",q);
	var Z=X.appendChild(aa);
	if(Z){
		var Y=0;
		(function(){
			if(typeof Z.GetVariable!=D){
				var ab=Z.GetVariable("$version");
				if(ab){
					ab=ab.split(" ")[1].split(",");
					M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]
					}
				}else{
			if(Y<10){
				Y++;
				setTimeout(arguments.callee,10);
				return
			}
		}
		X.removeChild(aa);
		Z=null;
		H()
		})()
}else{
	H()
	}
}
function H(){
	var ag=o.length;
	if(ag>0){
		for(var af=0;af<ag;af++){
			var Y=o[af].id;
			var ab=o[af].callbackFn;
			var aa={
				success:false,
				id:Y
			};
			
			if(M.pv[0]>0){
				var ae=c(Y);
				if(ae){
					if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){
						w(Y,true);
						if(ab){
							aa.success=true;
							aa.ref=z(Y);
							ab(aa)
							}
						}else{
					if(o[af].expressInstall&&A()){
						var ai={};
						
						ai.data=o[af].expressInstall;
						ai.width=ae.getAttribute("width")||"0";
						ai.height=ae.getAttribute("height")||"0";
						if(ae.getAttribute("class")){
							ai.styleclass=ae.getAttribute("class")
							}
							if(ae.getAttribute("align")){
							ai.align=ae.getAttribute("align")
							}
							var ah={};
						
						var X=ae.getElementsByTagName("param");
						var ac=X.length;
						for(var ad=0;ad<ac;ad++){
							if(X[ad].getAttribute("name").toLowerCase()!="movie"){
								ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")
								}
							}
						P(ai,ah,Y,ab)
					}else{
					p(ae);
					if(ab){
						ab(aa)
						}
					}
			}
		}
}else{
	w(Y,true);
	if(ab){
		var Z=z(Y);
		if(Z&&typeof Z.SetVariable!=D){
			aa.success=true;
			aa.ref=Z
			}
			ab(aa)
		}
	}
}
}
}
function z(aa){
	var X=null;
	var Y=c(aa);
	if(Y&&Y.nodeName=="OBJECT"){
		if(typeof Y.SetVariable!=D){
			X=Y
			}else{
			var Z=Y.getElementsByTagName(r)[0];
			if(Z){
				X=Z
				}
			}
	}
return X
}
function A(){
	return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)
	}
	function P(aa,ab,X,Z){
	a=true;
	E=Z||null;
	B={
		success:false,
		id:X
	};
	
	var ae=c(X);
	if(ae){
		if(ae.nodeName=="OBJECT"){
			l=g(ae);
			Q=null
			}else{
			l=ae;
			Q=X
			}
			aa.id=R;
		if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){
			aa.width="310"
			}
			if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){
			aa.height="137"
			}
			j.title=j.title.slice(0,47)+" - Flash Player Installation";
		var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;
		if(typeof ab.flashvars!=D){
			ab.flashvars+="&"+ac
			}else{
			ab.flashvars=ac
			}
			if(M.ie&&M.win&&ae.readyState!=4){
			var Y=C("div");
			X+="SWFObjectNew";
			Y.setAttribute("id",X);
			ae.parentNode.insertBefore(Y,ae);
			ae.style.display="none";
			(function(){
				if(ae.readyState==4){
					ae.parentNode.removeChild(ae)
					}else{
					setTimeout(arguments.callee,10)
					}
				})()
		}
		u(aa,ab,X)
	}
}
function p(Y){
	if(M.ie&&M.win&&Y.readyState!=4){
		var X=C("div");
		Y.parentNode.insertBefore(X,Y);
		X.parentNode.replaceChild(g(Y),X);
		Y.style.display="none";
		(function(){
			if(Y.readyState==4){
				Y.parentNode.removeChild(Y)
				}else{
				setTimeout(arguments.callee,10)
				}
			})()
	}else{
	Y.parentNode.replaceChild(g(Y),Y)
	}
}
function g(ab){
	var aa=C("div");
	if(M.win&&M.ie){
		aa.innerHTML=ab.innerHTML
		}else{
		var Y=ab.getElementsByTagName(r)[0];
		if(Y){
			var ad=Y.childNodes;
			if(ad){
				var X=ad.length;
				for(var Z=0;Z<X;Z++){
					if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){
						aa.appendChild(ad[Z].cloneNode(true))
						}
					}
				}
		}
}
return aa
}
function u(ai,ag,Y){
	var X,aa=c(Y);
	if(M.wk&&M.wk<312){
		return X
		}
		if(aa){
		if(typeof ai.id==D){
			ai.id=Y
			}
			if(M.ie&&M.win){
			var ah="";
			for(var ae in ai){
				if(ai[ae]!=Object.prototype[ae]){
					if(ae.toLowerCase()=="data"){
						ag.movie=ai[ae]
						}else{
						if(ae.toLowerCase()=="styleclass"){
							ah+=' class="'+ai[ae]+'"'
							}else{
							if(ae.toLowerCase()!="classid"){
								ah+=" "+ae+'="'+ai[ae]+'"'
								}
							}
					}
			}
			}
		var af="";
for(var ad in ag){
	if(ag[ad]!=Object.prototype[ad]){
		af+='<param name="'+ad+'" value="'+ag[ad]+'" />'
		}
	}
aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";
N[N.length]=ai.id;
X=c(ai.id)
}else{
	var Z=C(r);
	Z.setAttribute("type",q);
	for(var ac in ai){
		if(ai[ac]!=Object.prototype[ac]){
			if(ac.toLowerCase()=="styleclass"){
				Z.setAttribute("class",ai[ac])
				}else{
				if(ac.toLowerCase()!="classid"){
					Z.setAttribute(ac,ai[ac])
					}
				}
		}
	}
	for(var ab in ag){
	if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){
		e(Z,ab,ag[ab])
		}
	}
aa.parentNode.replaceChild(Z,aa);
X=Z
}
}
return X
}
function e(Z,X,Y){
	var aa=C("param");
	aa.setAttribute("name",X);
	aa.setAttribute("value",Y);
	Z.appendChild(aa)
	}
	function y(Y){
	var X=c(Y);
	if(X&&X.nodeName=="OBJECT"){
		if(M.ie&&M.win){
			X.style.display="none";
			(function(){
				if(X.readyState==4){
					b(Y)
					}else{
					setTimeout(arguments.callee,10)
					}
				})()
		}else{
		X.parentNode.removeChild(X)
		}
	}
}
function b(Z){
	var Y=c(Z);
	if(Y){
		for(var X in Y){
			if(typeof Y[X]=="function"){
				Y[X]=null
				}
			}
		Y.parentNode.removeChild(Y)
	}
}
function c(Z){
	var X=null;
	try{
		X=j.getElementById(Z)
		}catch(Y){}
	return X
	}
	function C(X){
	return j.createElement(X)
	}
	function i(Z,X,Y){
	Z.attachEvent(X,Y);
	I[I.length]=[Z,X,Y]
	}
	function F(Z){
	var Y=M.pv,X=Z.split(".");
	X[0]=parseInt(X[0],10);
	X[1]=parseInt(X[1],10)||0;
	X[2]=parseInt(X[2],10)||0;
	return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false
	}
	function v(ac,Y,ad,ab){
	if(M.ie&&M.mac){
		return
	}
	var aa=j.getElementsByTagName("head")[0];
	if(!aa){
		return
	}
	var X=(ad&&typeof ad=="string")?ad:"screen";
	if(ab){
		n=null;
		G=null
		}
		if(!n||G!=X){
		var Z=C("style");
		Z.setAttribute("type","text/css");
		Z.setAttribute("media",X);
		n=aa.appendChild(Z);
		if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){
			n=j.styleSheets[j.styleSheets.length-1]
			}
			G=X
		}
		if(M.ie&&M.win){
		if(n&&typeof n.addRule==r){
			n.addRule(ac,Y)
			}
		}else{
	if(n&&typeof j.createTextNode!=D){
		n.appendChild(j.createTextNode(ac+" {"+Y+"}"))
		}
	}
}
function w(Z,X){
	if(!m){
		return
	}
	var Y=X?"visible":"hidden";
	if(J&&c(Z)){
		c(Z).style.visibility=Y
		}else{
		v("#"+Z,"visibility:"+Y)
		}
	}
function L(Y){
	var Z=/[\\\"<>\.;]/;
	var X=Z.exec(Y)!=null;
	return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y
	}
	var d=function(){
	if(M.ie&&M.win){
		window.attachEvent("onunload",function(){
			var ac=I.length;
			for(var ab=0;ab<ac;ab++){
				I[ab][0].detachEvent(I[ab][1],I[ab][2])
				}
				var Z=N.length;
			for(var aa=0;aa<Z;aa++){
				y(N[aa])
				}
				for(var Y in M){
				M[Y]=null
				}
				M=null;
			for(var X in swfobject){
				swfobject[X]=null
				}
				swfobject=null
			})
		}
	}();
return{
	registerObject:function(ab,X,aa,Z){
		if(M.w3&&ab&&X){
			var Y={};
			
			Y.id=ab;
			Y.swfVersion=X;
			Y.expressInstall=aa;
			Y.callbackFn=Z;
			o[o.length]=Y;
			w(ab,false)
			}else{
			if(Z){
				Z({
					success:false,
					id:ab
				})
				}
			}
	},
getObjectById:function(X){
	if(M.w3){
		return z(X)
		}
	},
embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){
	var X={
		success:false,
		id:ah
	};
	
	if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){
		w(ah,false);
		K(function(){
			ae+="";
			ag+="";
			var aj={};
			
			if(af&&typeof af===r){
				for(var al in af){
					aj[al]=af[al]
					}
				}
				aj.data=ab;
		aj.width=ae;
		aj.height=ag;
		var am={};
		
		if(ad&&typeof ad===r){
			for(var ak in ad){
				am[ak]=ad[ak]
				}
			}
			if(Z&&typeof Z===r){
			for(var ai in Z){
				if(typeof am.flashvars!=D){
					am.flashvars+="&"+ai+"="+Z[ai]
					}else{
					am.flashvars=ai+"="+Z[ai]
					}
				}
			}
			if(F(Y)){
	var an=u(aj,am,ah);
	if(aj.id==ah){
		w(ah,true)
		}
		X.success=true;
	X.ref=an
	}else{
	if(aa&&A()){
		aj.data=aa;
		P(aj,am,ah,ac);
		return
	}else{
		w(ah,true)
		}
	}
if(ac){
	ac(X)
	}
})
}else{
	if(ac){
		ac(X)
		}
	}
},
switchOffAutoHideShow:function(){
	m=false
	},
ua:M,
getFlashPlayerVersion:function(){
	return{
		major:M.pv[0],
		minor:M.pv[1],
		release:M.pv[2]
		}
	},
hasFlashPlayerVersion:F,
createSWF:function(Z,Y,X){
	if(M.w3){
		return u(Z,Y,X)
		}else{
		return undefined
		}
	},
showExpressInstall:function(Z,aa,X,Y){
	if(M.w3&&A()){
		P(Z,aa,X,Y)
		}
	},
removeSWF:function(X){
	if(M.w3){
		y(X)
		}
	},
createCSS:function(aa,Z,Y,X){
	if(M.w3){
		v(aa,Z,Y,X)
		}
	},
addDomLoadEvent:K,
addLoadEvent:s,
getQueryParamValue:function(aa){
	var Z=j.location.search||j.location.hash;
	if(Z){
		if(/\?/.test(Z)){
			Z=Z.split("?")[1]
			}
			if(aa==null){
			return L(Z)
			}
			var Y=Z.split("&");
		for(var X=0;X<Y.length;X++){
			if(Y[X].substring(0,Y[X].indexOf("="))==aa){
				return L(Y[X].substring((Y[X].indexOf("=")+1)))
				}
			}
		}
	return""
},
expressInstallCallback:function(){
	if(a){
		var X=c(R);
		if(X&&l){
			X.parentNode.replaceChild(l,X);
			if(Q){
				w(Q,true);
				if(M.ie&&M.win){
					l.style.display="block"
					}
				}
			if(E){
			E(B)
			}
		}
	a=false
}
}
}
}();
if(swfobject.hasFlashPlayerVersion("10.0.0")){WEB_SOCKET_DEBUG=true;(function(){var bf=document.getElementsByTagName("script");for(var db=0,dB=bf.length;db<dB;db++){var bi=bf[db];var ad=bi.src;if(!ad){ad=bi.getAttribute("src");}if(ad){var bg=ad.lastIndexOf("jWebSocket_Bundle_min.js");if(bg<0){bg=ad.lastIndexOf("jWebSocket_Bundle.js");}if(bg<0){bg=ad.lastIndexOf("jWebSocket.js");}if(bg>0){window.WEB_SOCKET_SWF_LOCATION=ad.substr(0,bg)+"flash-bridge/WebSocketMain.swf";jws.JWS_FLASHBRIDGE=window.WEB_SOCKET_SWF_LOCATION;break;}}}})();if(window.WEB_SOCKET_SWF_LOCATION){
		// --- web_socket.js (minified) ---
		// Copyright: Hiroshi Ichikawa, http://gimite.net/en/, https://github.com/gimite/web-socket-js
		// License: New BSD License
		// Reference: http://dev.w3.org/html5/websockets/
		// Reference: http://tools.ietf.org/html/rfc6455
		// Full sources codes provided in web_socket.js
		(function(){
			if(window.WEB_SOCKET_FORCE_FLASH){}else if(window.WebSocket){
				return;
			}else if(window.MozWebSocket){
				window.WebSocket=MozWebSocket;
				return;
			}
			var logger;
			if(window.WEB_SOCKET_LOGGER){
				logger=WEB_SOCKET_LOGGER;
			}else if(window.console&&window.console.log&&window.console.error){
				logger=window.console;
			}else{
				logger={
					log:function(){},
					error:function(){}
				};
			
		}
		if(swfobject.getFlashPlayerVersion().major<10){
			logger.error("Flash Player >= 10.0.0 is required.");
			return;
		}
		if(location.protocol=="file:"){
			logger.error("WARNING: web-socket-js doesn't work in file:///... URL "+"unless you set Flash Security Settings properly. "+"Open the page via Web server i.e. http://...");
		}
		window.WebSocket=function(url,protocols,proxyHost,proxyPort,headers){
			var self=this;
			self.__id=WebSocket.__nextId++;
			WebSocket.__instances[self.__id]=self;
			self.readyState=WebSocket.CONNECTING;
			self.bufferedAmount=0;
			self.__events={};
			
			if(!protocols){
				protocols=[];
			}else if(typeof protocols=="string"){
				protocols=[protocols];
			}
			self.__createTask=setTimeout(function(){
				WebSocket.__addTask(function(){
					self.__createTask=null;
					WebSocket.__flash.create(self.__id,url,protocols,proxyHost||null,proxyPort||0,headers||null);
				});
			},0);
		};
		
		WebSocket.prototype.send=function(data){
			if(this.readyState==WebSocket.CONNECTING){
				throw "INVALID_STATE_ERR: Web Socket connection has not been established";
			}
			var result=WebSocket.__flash.send(this.__id,encodeURIComponent(data));
			if(result<0){
				return true;
			}else{
				this.bufferedAmount+=result;
				return false;
			}
		};
		
		WebSocket.prototype.close=function(){
			if(this.__createTask){
				clearTimeout(this.__createTask);
				this.__createTask=null;
				this.readyState=WebSocket.CLOSED;
				return;
			}
			if(this.readyState==WebSocket.CLOSED||this.readyState==WebSocket.CLOSING){
				return;
			}
			this.readyState=WebSocket.CLOSING;
			WebSocket.__flash.close(this.__id);
		};
		
		WebSocket.prototype.addEventListener=function(type,listener,useCapture){
			if(!(type in this.__events)){
				this.__events[type]=[];
			}
			this.__events[type].push(listener);
		};
		
		WebSocket.prototype.removeEventListener=function(type,listener,useCapture){
			if(!(type in this.__events))return;
			var events=this.__events[type];
			for(var i=events.length-1;i>=0;--i){
				if(events[i]===listener){
					events.splice(i,1);
					break;
				}
			}
			};
		
WebSocket.prototype.dispatchEvent=function(event){
	var events=this.__events[event.type]||[];
	for(var i=0;i<events.length;++i){
		events[i](event);
	}
	var handler=this["on"+event.type];
	if(handler)handler.apply(this,[event]);
};

WebSocket.prototype.__handleEvent=function(flashEvent){
	if("readyState"in flashEvent){
		this.readyState=flashEvent.readyState;
	}
	if("protocol"in flashEvent){
		this.protocol=flashEvent.protocol;
	}
	var jsEvent;
	if(flashEvent.type=="open"||flashEvent.type=="error"){
		jsEvent=this.__createSimpleEvent(flashEvent.type);
	}else if(flashEvent.type=="close"){
		jsEvent=this.__createSimpleEvent("close");
		jsEvent.wasClean=flashEvent.wasClean?true:false;
		jsEvent.code=flashEvent.code;
		jsEvent.reason=flashEvent.reason;
	}else if(flashEvent.type=="message"){
		var data=decodeURIComponent(flashEvent.message);
		jsEvent=this.__createMessageEvent("message",data);
	}else{
		throw "unknown event type: "+flashEvent.type;
	}
	this.dispatchEvent(jsEvent);
};

WebSocket.prototype.__createSimpleEvent=function(type){
	if(document.createEvent&&window.Event){
		var event=document.createEvent("Event");
		event.initEvent(type,false,false);
		return event;
	}else{
		return{
			type:type,
			bubbles:false,
			cancelable:false
		};
	
}
};

WebSocket.prototype.__createMessageEvent=function(type,data){
	if(document.createEvent&&window.MessageEvent&& !window.opera){
		var event=document.createEvent("MessageEvent");
		event.initMessageEvent("message",false,false,data,null,null,window,null);
		return event;
	}else{
		return{
			type:type,
			data:data,
			bubbles:false,
			cancelable:false
		};
	
}
};

WebSocket.CONNECTING=0;
WebSocket.OPEN=1;
WebSocket.CLOSING=2;
WebSocket.CLOSED=3;
WebSocket.__initialized=false;
WebSocket.__flash=null;
WebSocket.__instances={};

WebSocket.__tasks=[];
WebSocket.__nextId=0;
WebSocket.loadFlashPolicyFile=function(url){
	WebSocket.__addTask(function(){
		WebSocket.__flash.loadManualPolicyFile(url);
	});
};

WebSocket.__initialize=function(){
	if(WebSocket.__initialized)return;
	WebSocket.__initialized=true;
	if(WebSocket.__swfLocation){
		window.WEB_SOCKET_SWF_LOCATION=WebSocket.__swfLocation;
	}
	if(!window.WEB_SOCKET_SWF_LOCATION){
		logger.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
		return;
	}
	if(!window.WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR&& !WEB_SOCKET_SWF_LOCATION.match(/(^|\/)WebSocketMainInsecure\.swf(\?.*)?$/)&&WEB_SOCKET_SWF_LOCATION.match(/^\w+:\/\/([^\/]+)/)){
		var swfHost=RegExp.$1;
		if(location.host!=swfHost){
			logger.error("[WebSocket] You must host HTML and WebSocketMain.swf in the same host "+"('"+location.host+"' != '"+swfHost+"'). "+"See also 'How to host HTML file and SWF file in different domains' section "+"in README.md. If you use WebSocketMainInsecure.swf, you can suppress this message "+"by WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR = true;");
		}
	}
	var container=document.createElement("div");
container.id="webSocketContainer";
container.style.position="absolute";
if(WebSocket.__isFlashLite()){
	container.style.left="0px";
	container.style.top="0px";
}else{
	container.style.left="-100px";
	container.style.top="-100px";
}
var holder=document.createElement("div");
holder.id="webSocketFlash";
container.appendChild(holder);
document.body.appendChild(container);
swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION,"webSocketFlash","1","1","10.0.0",null,null,{
	hasPriority:true,
	swliveconnect:true,
	allowScriptAccess:"always"
},null,function(e){
	if(!e.success){
		logger.error("[WebSocket] swfobject.embedSWF failed");
	}
});
};

WebSocket.__onFlashInitialized=function(){
	setTimeout(function(){
		WebSocket.__flash=document.getElementById("webSocketFlash");
		WebSocket.__flash.setCallerUrl(location.href);
		WebSocket.__flash.setDebug(! !window.WEB_SOCKET_DEBUG);
		for(var i=0;i<WebSocket.__tasks.length;++i){
			WebSocket.__tasks[i]();
		}
		WebSocket.__tasks=[];
	},0);
};

WebSocket.__onFlashEvent=function(){
	setTimeout(function(){
		try{
			var events=WebSocket.__flash.receiveEvents();
			for(var i=0;i<events.length;++i){
				WebSocket.__instances[events[i].webSocketId].__handleEvent(events[i]);
			}
			}catch(e){
		logger.error(e);
	}
	},0);
return true;
};

WebSocket.__log=function(message){
	logger.log(decodeURIComponent(message));
};

WebSocket.__error=function(message){
	logger.error(decodeURIComponent(message));
};

WebSocket.__addTask=function(task){
	if(WebSocket.__flash){
		task();
	}else{
		WebSocket.__tasks.push(task);
	}
};

WebSocket.__isFlashLite=function(){
	if(!window.navigator|| !window.navigator.mimeTypes){
		return false;
	}
	var mimeType=window.navigator.mimeTypes["application/x-shockwave-flash"];
	if(!mimeType|| !mimeType.enabledPlugin|| !mimeType.enabledPlugin.filename){
		return false;
	}
	return mimeType.enabledPlugin.filename.match(/flashlite/i)?true:false;
};

if(!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION){
	swfobject.addDomLoadEvent(function(){
		WebSocket.__initialize();
	});
}
})(); 
}}else{WebSocket=null;}}jws.XHR={ASYNC:true,SYNC:false,METHOD_GET:"eO",METHOD_POST:"post",METHOD_HEAD:"head",getXHRInstance:function(){var fN=null;if(window.XMLHttpRequest){fN=new XMLHttpRequest();}else if(window.ActiveXObject){try{fN=new ActiveXObject("Msxml2.XMLHTTP");}catch(e1){try{fN=new ActiveXObject("Microsoft.XMLHTTP");}catch(e2){throw "f3.cfw.std.ex.xhr.NotAvail";}}}else{throw "f3.cfw.std.ex.xhr.NotAvail";}return fN;},isProtocolOk:function(dL){if(!dL){dL=self;}return(!(dL.location.protocol&&dL.location.protocol.toLowerCase()=="file:"));},fy:function(fn,bl){throw "f3.cfw.std.ex.xhr.NoSuccObs";},eP:function(fn,bl){throw "f3.cfw.std.ex.xhr.NoErrObs";},dZ:function(){var ax=arguments.callee.options;if(f3.ajax.Request!==undefined){if(ax.OnReadyStateChange){ax.OnReadyStateChange(ax.XHR,ax);}switch(ax.XHR.readyState){case 0:case 1:case 2:case 3:break;case 4:clearTimeout(ax.el);if(ax.XHR.status==200){f3.dom.Event.callObserver(ax.OnSuccess,ax.XHR,ax);}else{f3.dom.Event.callObserver(ax.OnError,ax.XHR,ax);}ax.XHR=null;ax=null;arguments.callee.self=null;arguments.callee.options=null;break;default:ax.OnError(ax.XHR,ax);ax.XHR=null;ax=null;arguments.callee.self=null;arguments.callee.options=null;break;}}},request:function(dr,ax){ax=f3.core.OOP.getDefaultOptions(ax,{method:"POST",asynchronous:f3.ajax.Common.ASYNC,postBody:null,timeout: -1,OnSuccess:f3.ajax.Request.fy,OnError:f3.ajax.Request.eP,contentType:"text/plain; charset=UTF-8",cacheControl:"must-revalidate"});if(!f3.ajax.Common.isProtocolOk()){throw new Error(0,f3.localeManager.getCurLocStr("f3.cfw.std.ex.xhr.file"));}ax.XHR=f3.ajax.Common.getXHRInstance();if(ax.XHR){ax.XHR.open(ax.method,dr,ax.asynchronous);if(ax.method.toLowerCase()=="post"){ax.XHR.setRequestHeader("Content-type",ax.contentType);}if(ax.cacheControl)ax.XHR.setRequestHeader("Cache-Control",ax.cacheControl);var dg=new $f3.$XHRResponse(ax);if(!f3.browser.Browser.isFirefox()||ax.asynchronous){ax.XHR.onreadystatechange=dg.dZ;}else{ax.XHR.onreadystatechange=null;}if(ax.timeout>0){ax.el=setTimeout(function(){ax.XHR.abort();if(f3.browser.Browser.isFirefox()&& !ax.asynchronous){dg.handler(ax);}},ax.timeout);}try{ax.XHR.send(ax.postBody);}catch(e){ax.OnError(ax.XHR,ax);}if(f3.browser.Browser.isFirefox()&& !ax.asynchronous){dg.dZ(ax);}}return ax.XHR;}};if(!jws.browserSupportsNativeJSON){
	// Please refer to http://json.org/js
	if(!this.JSON){
		this.JSON={};
		
}(function(){
	function f(n){
		return n<10?'0'+n:n;
	}
	if(typeof Date.prototype.toJSON!=='function'){
		Date.prototype.toJSON=function(key){
			return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;
		};
		
		String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){
			return this.valueOf();
		};
	
}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={
	'\b':'\\b',
	'\t':'\\t',
	'\n':'\\n',
	'\f':'\\f',
	'\r':'\\r',
	'"':'\\"',
	'\\':'\\\\'
},rep;
function quote(string){
	escapable.lastIndex=0;
	return escapable.test(string)?'"'+string.replace(escapable,function(a){
		var c=meta[a];
		return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);
	})+'"':'"'+string+'"';
}
function str(key,holder){
	var i,k,v,length,mind=gap,partial,value=holder[key];
	if(value&&typeof value==='object'&&typeof value.toJSON==='function'){
		value=value.toJSON(key);
	}
	if(typeof rep==='function'){
		value=rep.call(holder,key,value);
	}
	switch(typeof value){
		case'string':
			return quote(value);
		case'number':
			return isFinite(value)?String(value):'null';
		case'boolean':case'null':
			return String(value);
		case'object':
			if(!value){
			return'null';
		}
		gap+=indent;
		partial=[];
		if(Object.prototype.toString.apply(value)==='[object Array]'){
			length=value.length;
			for(i=0;i<length;i+=1){
				partial[i]=str(i,value)||'null';
			}
			v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';
			gap=mind;
			return v;
		}
		if(rep&&typeof rep==='object'){
			length=rep.length;
			for(i=0;i<length;i+=1){
				k=rep[i];
				if(typeof k==='string'){
					v=str(k,value);
					if(v){
						partial.push(quote(k)+(gap?': ':':')+v);
					}
				}
			}
		}else{
	for(k in value){
		if(Object.hasOwnProperty.call(value,k)){
			v=str(k,value);
			if(v){
				partial.push(quote(k)+(gap?': ':':')+v);
			}
		}
	}
	}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';
gap=mind;
return v;
}
}
if(typeof JSON.stringify!=='function'){
	JSON.stringify=function(value,replacer,space){
		var i;
		gap='';
		indent='';
		if(typeof space==='number'){
			for(i=0;i<space;i+=1){
				indent+=' ';
			}
			}else if(typeof space==='string'){
		indent=space;
	}
	rep=replacer;
	if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){
		throw new Error('JSON.stringify');
	}
	return str('',{
		'':value
	});
};

}
if(typeof JSON.parse!=='function'){
	JSON.parse=function(text,reviver){
		var j;
		function walk(holder,key){
			var k,v,value=holder[key];
			if(value&&typeof value==='object'){
				for(k in value){
					if(Object.hasOwnProperty.call(value,k)){
						v=walk(value,k);
						if(v!==undefined){
							value[k]=v;
						}else{
							delete value[k];
						}
					}
				}
				}
			return reviver.call(holder,key,value);
}
text=String(text);
cx.lastIndex=0;
if(cx.test(text)){
	text=text.replace(cx,function(a){
		return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);
	});
}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){
	j=eval('('+text+')');
	return typeof reviver==='function'?walk({
		'':j
	},''):j;
}
throw new SyntaxError('JSON.parse');
};

}
}());
}
//	Base64 encode / decode
//  http://www.webtoolkit.info/
var Base64={
	_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode:function(input){
		var output="";
		var chr1,chr2,chr3,enc1,enc2,enc3,enc4;
		var i=0;
		input=Base64._utf8_encode(input);
		while(i<input.length){
			chr1=input.charCodeAt(i++);
			chr2=input.charCodeAt(i++);
			chr3=input.charCodeAt(i++);
			enc1=chr1>>2;
			enc2=((chr1&3)<<4)|(chr2>>4);
			enc3=((chr2&15)<<2)|(chr3>>6);
			enc4=chr3&63;
			if(isNaN(chr2)){
				enc3=enc4=64;
			}else if(isNaN(chr3)){
				enc4=64;
			}
			output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);
		}
		return output;
	},
	decode:function(input){
		var output="";
		var chr1,chr2,chr3;
		var enc1,enc2,enc3,enc4;
		var i=0;
		input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");
		while(i<input.length){
			enc1=this._keyStr.indexOf(input.charAt(i++));
			enc2=this._keyStr.indexOf(input.charAt(i++));
			enc3=this._keyStr.indexOf(input.charAt(i++));
			enc4=this._keyStr.indexOf(input.charAt(i++));
			chr1=(enc1<<2)|(enc2>>4);
			chr2=((enc2&15)<<4)|(enc3>>2);
			chr3=((enc3&3)<<6)|enc4;
			output=output+String.fromCharCode(chr1);
			if(enc3!=64){
				output=output+String.fromCharCode(chr2);
			}
			if(enc4!=64){
				output=output+String.fromCharCode(chr3);
			}
		}
		output=Base64._utf8_decode(output);
	return output;
},
_utf8_encode:function(string){
	string=string.replace(/\r\n/g,"\n");
	var utftext="";
	for(var n=0;n<string.length;n++){
		var c=string.charCodeAt(n);
		if(c<128){
			utftext+=String.fromCharCode(c);
		}else if((c>127)&&(c<2048)){
			utftext+=String.fromCharCode((c>>6)|192);
			utftext+=String.fromCharCode((c&63)|128);
		}else{
			utftext+=String.fromCharCode((c>>12)|224);
			utftext+=String.fromCharCode(((c>>6)&63)|128);
			utftext+=String.fromCharCode((c&63)|128);
		}
	}
	return utftext;
},
_utf8_decode:function(utftext){
	var string="";
	var i=0;
	var c=c1=c2=0;
	while(i<utftext.length){
		c=utftext.charCodeAt(i);
		if(c<128){
			string+=String.fromCharCode(c);
			i++;
		}else if((c>191)&&(c<224)){
			c2=utftext.charCodeAt(i+1);
			string+=String.fromCharCode(((c&31)<<6)|(c2&63));
			i+=2;
		}else{
			c2=utftext.charCodeAt(i+1);
			c3=utftext.charCodeAt(i+2);
			string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));
			i+=3;
		}
	}
	return string;
}
}
;jws.oop={};jws.oop.declareClass=function(aI,aU,ab,aM){var aG=self[aI];if(!aG){self[aI]={};}var dH=function(){if(this.create){this.create.apply(this,arguments);}};aG[aU]=dH;var bc;for(bc in aM){dH.prototype[bc]=aM[bc];}if(ab!=null){if(!ab.descendants){ab.descendants=[];}ab.descendants.push(dH);for(bc in ab.prototype){var au=ab.prototype[bc];if(typeof au=="function"){if(dH.prototype[bc]){dH.prototype[bc].inherited=au;}else{dH.prototype[bc]=au;}dH.prototype[bc].superClass=ab;}}}};jws.oop.addPlugIn=function(dz,ap){if(!dz.cx){dz.cx=[];}dz.cx.push(ap);for(var bc in ap){if(!dz.prototype[bc]){dz.prototype[bc]=ap[bc];}}if(dz.descendants){for(var db=0,dB=dz.descendants.length;db<dB;db++){jws.oop.addPlugIn(dz.descendants[db],ap);}}};jws.oop.declareClass("jws","jWebSocketBaseClient",null,{create:function(ax){if(!this.cI){this.cI=jws.hZ;}},processOpened:function(cz){},processPacket:function(cz){},processClosed:function(cz){},open:function(dr,ax){if(!ax){ax={};}if(self.WebSocket){if(!this.dD){var dJ=this;var dM=null;var dI=jws.WS_SUBPROT_JSON;if(ax.subProtocol){dI=ax.subProtocol;}if(ax.iL){this.cI=ax.iL;}if(this.cI){this.cI.hb=false;}if(this.gT!=jws.gf){this.gT=jws.CONNECTING;}if(ax.gj&&typeof ax.gj=="function"&&ax.jp){this.hH=ax.jp;this.eu=setTimeout(function(){dJ.hH=null;var aR={};ax.gj(aR);},this.hH);}this.dD=new WebSocket(dr,dI);this.iG=dr;this.hV=dI;this.dD.onopen=function(cz){if(jws.console.gn()){jws.console.fk("[onopen]: "+JSON.stringify(cz));}if(dJ.eu){clearTimeout(dJ.eu);dJ.eu=null;}dJ.gT=jws.OPEN;dM=dJ.processOpened(cz);if(ax.OnOpen){ax.OnOpen(cz,dM,dJ);}dJ.processQueue();};this.dD.onmessage=function(cz){if(jws.console.gn()){jws.console.fk("[onmessage]: "+JSON.stringify(cz));}dM=dJ.processPacket(cz);if(ax.OnMessage){ax.OnMessage(cz,dM,dJ);}};this.dD.onclose=function(cz){if(jws.console.gn()){jws.console.fk("[onclose]: "+JSON.stringify(cz));}if(dJ.eu){clearTimeout(dJ.eu);dJ.eu=null;}dJ.gT=jws.CLOSED;if(dJ.az){clearTimeout(dJ.az);delete dJ.az;}dM=dJ.processClosed(cz);if(ax.OnClose){ax.OnClose(cz,dM,dJ);}dJ.dD=null;if(dJ.cI&&dJ.cI.fh&& !dJ.cI.hb){dJ.gT=jws.gf;dJ.hj=setTimeout(function(){if(ax.iI){ax.iI(cz,dM,dJ);}dJ.open(dJ.iG,ax);},dJ.cI.fY);}};}else{throw new Error("Already connected");}}else{throw new Error("WebSockets not supported by browser");}},connect:function(dr,ax){return this.open(dr,ax);},processQueue:function(){if(this.fE){var bj=this.checkConnected();if(bj.code==0){var cE;while(this.fE.length>0){cE=this.fE.shift();this.dD.send(cE.iP);}}}},queuePacket:function(iK,ax){if(!this.fE){this.fE=[];}this.fE.push({iP:iK,options:ax});},sendStream:function(aw){if(this.isOpened()){try{this.dD.send(aw);}catch(dQ){jws.console.error("[sendStream]: Exception on send: "+dQ.message);}}else{if(this.is()){this.queuePacket(aw,null);}else{throw new Error("Not connected");}}},fT:function(){if(this.hj){clearTimeout(this.hj);this.hj=null;return true;}return false;},ld:function(gE){if(gE&&typeof(eS)=="boolean"){this.cI.fh=gE;}else{this.cI.fh=false;}if(!(this.cI&&this.cI.fh)){fT();}},kB:function(eS){if(eS&&typeof(eS)=="number"&&eS>0){this.cI.hg=parseInt(eS);}else{this.cI.hg=0;}},kT:function(eS){if(eS&&typeof(eS)=="number"&&eS>0){this.cI.hp=parseInt(eS);}else{this.cI.hp=0;}},ke:function(ax){this.cI=ax;if(this.cI){if(this.cI.fh){}else{fT();}}},ln:function(){return this.cI;},lm:function(){return this.fE;},ll:function(){delete this.fE;},isOpened:function(){return(this.dD!=undefined&&this.dD!=null&&this.dD.readyState==jws.OPEN);},kv:function(){return this.iG;},lw:function(){return this.hV;},isConnected:function(){return(this.isOpened());},forceClose:function(ax){var aZ=false;if(this.cI){this.cI.hb=true;}if(ax){if(ax.fireClose&&this.dD.onclose){var aW={};this.dD.onclose(aW);}}if(this.dD){this.dD.onopen=null;this.dD.onmessage=null;this.dD.onclose=null;if(this.dD.readyState==jws.OPEN||this.dD.readyState==jws.CONNECTING){this.dD.close();}this.processClosed();}this.dD=null;},close:function(ax){var aj=0;if(ax){if(ax.timeout){aj=ax.timeout;}}if(this.dD){if(aj<=0){this.forceClose(ax);}else{var dJ=this;this.az=setTimeout(function(){dJ.forceClose(ax);},aj);}}else{this.dD=null;throw new Error("Not connected");}},disconnect:function(ax){return this.close(ax);},addListener:function(cX){if(!this.cO){this.cO=[];}this.cO.push(cX);},removeListener:function(cX){if(this.cO){for(var db=0,dB=this.cO;db<dB;db++){if(cX==this.cO[db]){this.cO.splice(db,1);}}}},addPlugIn:function(ap,aT){if(!this.cx){this.cx=[];}this.cx.push(ap);if(!aT){aT=ap.ID;}if(aT){ap.conn=this;}},ib:function(ae,ck){if(!this.fq){this.fq={};}var iB=this.hD(ae);this.fq[ae]=ck;return iB;},hD:function(ae){if(!this.fq){return null;}var bj=this.fq[ae];if(bj===undefined){return null;}return bj;},lp:function(hm,ae,ck){return this.ib(hm+"."+ae,ck);},lq:function(hm,ae){return this.hD(hm+"."+ae);},lf:function(){if(this.fq){delete this.fq;}}});jws.oop.declareClass("jws","jWebSocketTokenClient",jws.jWebSocketBaseClient,{create:function(ax){arguments.callee.inherited.call(this,ax);this.ao={};},getId:function(){return this.ai;},checkCallbacks:function(aR){var bc="utid"+aR.utid;var aH=this.ao[bc];if(aH){if(aH.hCleanUp){clearTimeout(aH.hCleanUp);}var bC=aH.args;var eb=aH.callback;if(eb.OnResponse){eb.OnResponse.call(this,aR,bC);}if(eb.OnSuccess&&aR.code===0){eb.OnSuccess.call(this,aR,bC);}if(eb.OnFailure&&aR.code!=undefined&&aR.code!=0){eb.OnFailure.call(this,aR,bC);}delete this.ao[bc];}},createDefaultResult:function(){return{code:0,msg:"Ok",localeKey:"jws.jsc.res.Ok",args:null,tid:jws.CUR_TOKEN_ID};},checkConnected:function(){var bj=this.createDefaultResult();if(!this.isOpened()){bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},is:function(){return(this.isOpened()||this.gT==jws.gf);},hv:function(){var bj=this.createDefaultResult();if(!this.is()){bj.code= -1;bj.localeKey="jws.jsc.res.notWriteable";bj.msg="Not writable.";}return bj;},checkLoggedIn:function(){var bj=this.checkConnected();if(bj.code==0&& !this.isLoggedIn()){bj.code= -1;bj.localeKey="jws.jsc.res.notLoggedIn";bj.msg="Not logged in.";}return bj;},resultToString:function(co){return((co&&typeof co=="object"&&co.msg?co.msg:"invalid response token"));},tokenToStream:function(aR){throw new Error("tokenToStream needs to be overwritten in descendant classes");},streamToToken:function(de){throw new Error("streamToToken needs to be overwritten in descendant classes");},notifyPlugInsOpened:function(){var cg={sourceId:this.ai};var di=jws.jWebSocketTokenClient.cx;if(di){for(var db=0,cF=di.length;db<cF;db++){var cS=di[db];if(cS.processOpened){cS.processOpened.call(this,cg);}}}},notifyPlugInsClosed:function(){var cg={sourceId:this.ai};var di=jws.jWebSocketTokenClient.cx;if(di){for(var db=0,cF=di.length;db<cF;db++){var cS=di[db];if(cS.processClosed){cS.processClosed.call(this,cg);}}}this.dD=null;this.ac=null;this.af=null;},processPacket:function(cz){var cg=this.streamToToken(cz.data);this.processToken(cg);return cg;},processToken:function(aR){var aG=aR.ns;if(aG!=null&&aG.indexOf("org.jWebSocket")==1){aR.ns="org.jwebsocket"+aG.substring(15);}else if(aG==null){aR.ns="org.jwebsocket.plugins.system";}if(jws.NS_SYSTEM==aR.ns){if(aR.type=="welcome"&&aR.usid){this.ac=aR.usid;this.ai=aR.sourceId;this.notifyPlugInsOpened();if(this.cC){this.cC(aR);}var hz="n/a";if(swfobject){var gy=swfobject.kq();hz=gy.jr+"."+gy.hP+"."+gy.iM;}this.sendToken({ns:jws.SystemClientPlugIn.NS,type:"header",jL:"browser",kt:jws.iU(),jI:jws.jw(),lg:navigator.userAgent,kS:"javascript",jN:jws.VERSION,kR:jws.browserSupportsNativeWebSockets?"native":"flash "+hz},{});}else if(aR.type=="goodBye"){if(this.fw){this.fw(aR);}this.ac=null;this.af=null;}else if(aR.type=="close"){this.close({timeout:0});}else if(aR.type=="response"){if(aR.reqType=="login"){this.af=aR.username;if(aR.usid){this.ac=aR.usid;}}if(aR.reqType=="logout"){this.af=null;}this.checkCallbacks(aR);}else if(aR.type=="event"){if(aR.name=="connect"){this.processConnected(aR);}if(aR.name=="disconnect"){this.processDisconnected(aR);}}}else{this.checkCallbacks(aR);}var db,cF,di,cS;di=jws.jWebSocketTokenClient.cx;if(di){for(db=0,cF=di.length;db<cF;db++){cS=di[db];if(cS.processToken){cS.processToken.call(this,aR);}}}di=this.cx;if(di){for(db=0,cF=di.length;db<cF;db++){cS=di[db];if(cS.processToken){cS.processToken(aR);}}}if(this.eF){this.eF(aR);}if(this.cO){for(db=0,cF=this.cO.length;db<cF;db++){this.cO[db](aR);}}},processClosed:function(cz){this.notifyPlugInsClosed();this.ai=null;},processConnected:function(aR){var di=jws.jWebSocketTokenClient.cx;if(di){for(var db=0,cF=di.length;db<cF;db++){var cS=di[db];if(cS.processConnected){cS.processConnected.call(this,aR);}}}},processDisconnected:function(aR){var di=jws.jWebSocketTokenClient.cx;if(di){for(var db=0,cF=di.length;db<cF;db++){var cS=di[db];if(cS.processDisconnected){cS.processDisconnected.call(this,aR);}}}},sendToken:function(aR,ax){var bj=this.hv();if(bj.code==0){var dA=false;var cB=0;var aj=jws.DEF_RESP_TIMEOUT;var hE=false;var bC=null;var df={OnResponse:null,OnSuccess:null,OnFailure:null,OnTimeout:null};var cU=false;if(ax){if(ax.OnResponse){df.OnResponse=ax.OnResponse;cU=true;}if(ax.OnFailure){df.OnFailure=ax.OnFailure;cU=true;}if(ax.OnSuccess){df.OnSuccess=ax.OnSuccess;cU=true;}if(ax.OnTimeout){df.OnTimeout=ax.OnTimeout;cU=true;}if(ax.args){bC=ax.args;}if(ax.timeout){aj=ax.timeout;}if(ax.spawnThread){dA=ax.spawnThread;}if(ax.fragmentSize){cB=ax.fragmentSize;}if(ax.kl){hE=true;}}jws.CUR_TOKEN_ID++;if(cU){var dU=jws.CUR_TOKEN_ID;var cl="utid"+dU;var dJ=this;var aH={request:new Date().getTime(),callback:df,args:bC,timeout:aj};if(hE){aH.request=aR;}this.ao[cl]=aH;aH.hCleanUp=setTimeout(function(){var df=aH.callback;delete dJ.ao[cl];if(df.OnTimeout){df.OnTimeout.call(this,aR,{utid:dU,timeout:aj});}},aj);}if(dA){aR.spawnThread=true;}var aQ=this.tokenToStream(aR);if(cB>0&&aQ.length>0){var cg,eC,ej=0,et=0,eT=aQ.length;while(aQ.length>0){cg={ns:jws.NS_SYSTEM,type:"fragment",utid:aR.utid,index:ej++,total:parseInt(eT/cB)+1,data:aQ.substr(0,cB)};et+=cB;aQ=aQ.substr(cB);eC=this.tokenToStream(cg);this.sendStream(eC);}}else{if(jws.console.gn()){jws.console.fk("[sendToken]: Sending stream "+aQ+"...");}this.sendStream(aQ);}}return bj;},getLastTokenId:function(){return jws.CUR_TOKEN_ID;},getNextTokenId:function(){return jws.CUR_TOKEN_ID+1;},sendText:function(bb,aB){var bj=this.checkLoggedIn();if(bj.code==0){this.sendToken({ns:jws.NS_SYSTEM,type:"send",targetId:bb,sourceId:this.ai,sender:this.af,data:aB});}return bj;},broadcastText:function(aP,aB,ax){var bj=this.checkLoggedIn();var aE=false;var aD=true;if(ax){if(ax.senderIncluded){aE=ax.senderIncluded;}if(ax.responseRequested){aD=ax.responseRequested;}}if(bj.code==0){this.sendToken({ns:jws.NS_SYSTEM,type:"broadcast",sourceId:this.ai,sender:this.af,pool:aP,data:aB,senderIncluded:aE,responseRequested:aD},ax);}return bj;},echo:function(aw){var bj=this.hv();if(bj.code==0){this.sendToken({ns:jws.NS_SYSTEM,type:"echo",data:aw});}return bj;},open:function(dr,ax){var bj=this.createDefaultResult();try{if(ax&&ax.OnToken&&typeof ax.OnToken=="function"){this.eF=ax.OnToken;}if(ax&&ax.OnWelcome&&typeof ax.OnWelcome=="function"){this.cC=ax.OnWelcome;}if(ax&&ax.OnGoodBye&&typeof ax.OnGoodBye=="function"){this.fw=ax.OnGoodBye;}arguments.callee.inherited.call(this,dr,ax);}catch(ex){bj.code= -1;bj.localeKey="jws.jsc.ex";bj.args=[ex.message];bj.msg="Exception on open: "+ex.message;}return bj;},connect:function(dr,ax){return this.open(dr,ax);},close:function(ax){var aj=0;var cD=false;var cZ=false;var cV=false;if(this.cI){this.cI.hb=true;}if(ax){if(ax.timeout){aj=ax.timeout;}if(ax.noGoodBye){cD=true;}if(ax.noLogoutBroadcast){cZ=true;}if(ax.noDisconnectBroadcast){cV=true;}}var bj=this.checkConnected();try{if(bj.code==0){if(aj>0){var cg={ns:jws.NS_SYSTEM,type:"close",timeout:aj};if(cD){cg.noGoodBye=true;}if(cZ){cg.noLogoutBroadcast=true;}if(cV){cg.noDisconnectBroadcast=true;}this.sendToken(cg);}arguments.callee.inherited.call(this,ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}}catch(ex){bj.code= -1;bj.localeKey="jws.jsc.ex";bj.args=[ex.message];bj.msg="Exception on close: "+ex.message;}return bj;},disconnect:function(ax){return this.close(ax);}});jws.SystemClientPlugIn={NS:jws.NS_SYSTEM,ALL_CLIENTS:0,AUTHENTICATED:1,NON_AUTHENTICATED:2,kE:null,hW:1,hN:2,processToken:function(aR){if(jws.NS_SYSTEM==aR.ns){if("login"==aR.reqType){if(aR.code==0){if(this.hk){this.hk(aR);}}else{if(this.ho){this.ho(aR);}}}else if("logout"==aR.reqType){if(aR.code==0){if(this.hu){this.hu(aR);}}else{if(this.gB){this.gB(aR);}}}}},login:function(an,aq,ax){var al=null;var bs=null;if(ax){if(ax.pool!==undefined){al=ax.pool;}if(ax.encoding!==undefined){bs=ax.encoding;if(jws.SystemClientPlugIn.hW==bs){if(aq){aq=jws.tools.calcMD5(aq);}bs="md5";}else if(jws.SystemClientPlugIn.hN==bs){bs="md5";}else{bs=null;}}}var bj=this.createDefaultResult();if(this.isOpened()){this.sendToken({ns:jws.SystemClientPlugIn.NS,type:"login",username:an,password:aq,encoding:bs,pool:al});}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},logon:function(dr,an,aq,ax){var bj=this.createDefaultResult();if(!ax){ax={};}if(this.isOpened()){this.login(an,aq,ax);}else{var il=ax.OnWelcome;var dJ=this;ax.OnWelcome=function(cz){if(il){il.call(dJ,cz);}dJ.login(an,aq,ax);};this.open(dr,ax);}return bj;},logout:function(){var bj=this.checkConnected();if(bj.code==0){this.sendToken({ns:jws.SystemClientPlugIn.NS,type:"logout"});}return bj;},kG:function(an,aq,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.SystemClientPlugIn.NS,type:"logon",username:an,password:aq};this.sendToken(cg,ax);}return bj;},jT:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.SystemClientPlugIn.NS,type:"logoff"};this.sendToken(cg,ax);}return bj;},jJ:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.SystemClientPlugIn.NS,type:"getAuthorities"};this.sendToken(cg,ax);}return bj;},isLoggedIn:function(){return(this.isOpened()&&this.af);},broadcastToken:function(aR,ax){aR.ns=jws.SystemClientPlugIn.NS;aR.type="broadcast";aR.sourceId=this.ai;aR.sender=this.af;return this.sendToken(aR,ax);},getUsername:function(){return(this.isLoggedIn()?this.af:null);},getClients:function(ax){var aF=jws.SystemClientPlugIn.ALL_CLIENTS;var al=null;if(ax){if(ax.mode==jws.SystemClientPlugIn.AUTHENTICATED||ax.mode==jws.SystemClientPlugIn.NON_AUTHENTICATED){aF=ax.mode;}if(ax.pool){al=ax.pool;}}var bj=this.createDefaultResult();if(this.isLoggedIn()){this.sendToken({ns:jws.SystemClientPlugIn.NS,type:"getClients",mode:aF,pool:al});}else{bj.code= -1;bj.localeKey="jws.jsc.res.notLoggedIn";bj.msg="Not logged in.";}return bj;},getNonAuthClients:function(ax){if(!ax){ax={};}ax.mode=jws.SystemClientPlugIn.NON_AUTHENTICATED;return this.getClients(ax);},getAuthClients:function(ax){if(!ax){ax={};}ax.mode=jws.SystemClientPlugIn.AUTHENTICATED;return this.getClients(ax);},getAllClients:function(ax){if(!ax){ax={};}ax.mode=jws.SystemClientPlugIn.ALL_CLIENTS;return this.getClients(ax);},ping:function(ax){var ah=false;if(ax){if(ax.echo){ah=true;}}var bj=this.createDefaultResult();if(this.isOpened()){this.sendToken({ns:jws.SystemClientPlugIn.NS,type:"ping",echo:ah},ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},wait:function(ez,ax){var bj=this.checkConnected();if(bj.code==0){var aD=true;if(ax){if(ax.responseRequested!=undefined){aD=ax.responseRequested;}}this.sendToken({ns:jws.SystemClientPlugIn.NS,type:"wait",duration:ez,responseRequested:aD},ax);}return bj;},startKeepAlive:function(ax){if(this.ar){stopKeepAlive();}if(!this.isOpened()){return;}var aO=10000;var ah=true;var aL=true;if(ax){if(ax.interval!=undefined){aO=ax.interval;}if(ax.echo!=undefined){ah=ax.echo;}if(ax.immediate!=undefined){aL=ax.immediate;}}if(aL){this.ping({echo:ah});}var dJ=this;this.ar=setInterval(function(){if(dJ.isOpened()){dJ.ping({echo:ah});}else{dJ.stopKeepAlive();}},aO);},stopKeepAlive:function(){if(this.ar){clearInterval(this.ar);this.ar=null;}},ka:function(ci){if(!ci){ci={};}if(ci.jb!==undefined){this.hk=ci.jb;}if(ci.ig!==undefined){this.ho=ci.ig;}if(ci.jE!==undefined){this.hu=ci.jE;}if(ci.jo!==undefined){this.gB=ci.jo;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.SystemClientPlugIn);jws.oop.declareClass("jws","jWebSocketJSONClient",jws.jWebSocketTokenClient,{tokenToStream:function(aR){aR.utid=jws.CUR_TOKEN_ID;var ak=JSON.stringify(aR);return(ak);},streamToToken:function(de){var bk=JSON.parse(de);return bk;}});jws.oop.declareClass("jws","jWebSocketCSVClient",jws.jWebSocketTokenClient,{tokenToStream:function(aR){var ag="utid="+jws.CUR_TOKEN_ID;for(var dR in aR){var cY=aR[dR];if(cY===null||cY===undefined){ag+=","+dR+"=";}else if(typeof cY=="string"){cY=cY.replace(/[,]/g,"\\x2C");cY=cY.replace(/["]/g,"\\x22");ag+=","+dR+"=\""+cY+"\"";}else{ag+=","+dR+"="+cY;}}return ag;},streamToToken:function(de){var cg={};var aN=de.split(",");for(var db=0,dB=aN.length;db<dB;db++){var at=aN[db].split("=");if(at.length==2){var dR=at[0];var cY=at[1];if(cY.length>=2&&cY.charAt(0)=="\""&&cY.charAt(cY.length-1)=="\""){cY=cY.replace(/\\x2C/g,"\x2C");cY=cY.replace(/\\x22/g,"\x22");cY=cY.substr(1,cY.length-2);}cg[dR]=cY;}}return cg;}});jws.oop.declareClass("jws","jWebSocketXMLClient",jws.jWebSocketTokenClient,{tokenToStream:function(aR){function obj2xml(ae,ck){var dF="";if(ck instanceof Array){dF+="<"+ae+" type=\""+"array"+"\">";for(var db=0,dB=ck.length;db<dB;db++){dF+=obj2xml("item",ck[db]);}dF+="</"+ae+">";}else if(typeof ck=="object"){dF+="<"+ae+" type=\""+"object"+"\">";for(var bc in ck){dF+=obj2xml(bc,ck[bc]);}dF+="</"+ae+">";}else{dF+="<"+ae+" type=\""+typeof ck+"\">"+ck.toString()+"</"+ae+">";}return dF;};var bs="windows-1252";var av="<?xml version=\"1.0\" encoding=\""+bs+"\"?>"+"<token>";for(var bc in aR){av+=obj2xml(bc,aR[bc]);}av+="</token>";return av;},streamToToken:function(de){var aC=null;try{var fv=new DOMParser();aC=fv.parseFromString(de,"text/xml");}catch(ex){}function node2obj(aV,cQ){var cu=aV.firstChild;while(cu!=null){if(cu.nodeType==1){var dp=cu.getAttribute("type");var dR=cu.nodeName;if(dp){var dM=cu.firstChild;if(dM&&dM.nodeType==3){dM=dM.nodeValue;if(dM){if(dp=="string"){}else if(dp=="number"){}else if(dp=="boolean"){}else if(dp=="date"){}else{dM=undefined;}if(dM){if(cQ instanceof Array){cQ.push(dM);}else{cQ[dR]=dM;}}}}else if(dM&&dM.nodeType==1){if(dp=="array"){cQ[dR]=[];node2obj(cu,cQ[dR]);}else if(dp=="object"){cQ[dR]={};node2obj(cu,cQ[dR]);}}}}cu=cu.nextSibling;}};var cg={};if(aC){node2obj(aC.firstChild,cg);}return cg;}});var CachePriority={'LOW':1,'NORMAL':2,'HIGH':4};function Cache(maxSize,fk,fQ){this.eK=maxSize|| -1;this.ix=fk||false;this.en=fQ||new Cache.fI();this.eg=0;this.hS=.75;this.fM={};this.fM['hits']=0;this.fM['misses']=0;this.fj('Initialized cache with size '+maxSize);};Cache.fI=function(){this.en={};};Cache.fI.prototype.eO=function(key){return this.en[key];};Cache.fI.prototype.set=function(key,value){this.en[key]=value;};Cache.fI.prototype.remove=function(key){var item=this.eO(key);delete this.en[key];return item;};Cache.fI.prototype.eW=function(){var fu=[],p;for(p in this.en)fu.push(p);return fu;};Cache.hd=function(namespace){this.gD='cache-fQ.'+(namespace||'default')+'.';var ju=this.gD.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");this.js=new RegExp('^'+ju)};Cache.hd.prototype.eO=function(key){var item=gL[this.gD+key];if(item)return JSON.parse(item);return null;};Cache.hd.prototype.set=function(key,value){gL[this.gD+key]=JSON.stringify(value);};Cache.hd.prototype.remove=function(key){var item=this.eO(key);delete gL[this.gD+key];return item;};Cache.hd.prototype.eW=function(){var fu=[],p;for(p in gL){if(p.match(this.js))fu.push(p.replace(this.gD,''));};return fu;};Cache.prototype.getItem=function(key){var item=this.en.eO(key);if(item!=null){if(!this.ik(item)){item.lastAccessed=new Date().getTime();}else{this.fL(key);item=null;}}var returnVal=item?item.value:null;if(returnVal){this.fM['hits']++;this.fj('Cache HIT for key '+key)}else{this.fM['misses']++;this.fj('Cache MISS for key '+key)}return returnVal;};Cache.hQ=function(k,v,o){if(!k){throw new Error("key cannot be null or empty");}this.key=k;this.value=v;o=o||{};if(o.expirationAbsolute){o.expirationAbsolute=o.expirationAbsolute.getTime();}if(!o.priority){o.priority=CachePriority.NORMAL;}this.options=o;this.lastAccessed=new Date().getTime();};Cache.prototype.setItem=function(key,value,options){if(this.en.eO(key)!=null){this.fL(key);}this.im(new Cache.hQ(key,value,options));this.fj("Setting key "+key);if((this.eK>0)&&(this.eg>this.eK)){var hR=this;setTimeout(function(){hR.he.call(hR);},0);}};Cache.prototype.clear=function(){var eW=this.en.eW();for(var i=0;i<eW.length;i++){this.fL(eW[i]);}this.fj('Cache cleared');};Cache.prototype.lx=function(){return this.fM;};Cache.prototype.toHtmlString=function(){var returnStr=this.eg+" item(s) in cache<br /><ul>";var eW=this.en.eW();for(var i=0;i<eW.length;i++){var item=this.en.eO(eW[i]);returnStr=returnStr+"<li>"+item.key.toString()+" = "+item.value.toString()+"</li>";}returnStr=returnStr+"</ul>";return returnStr;};Cache.prototype.resize=function(eJ){this.fj('Resizing Cache from '+this.eK+' to '+eJ);var ii=this.eK;this.eK=eJ;if(eJ>0&&(ii<0||eJ<ii)){if(this.eg>eJ){this.he();}}this.fj('Resizing done');};Cache.prototype.he=function(){var tmparray=new Array();var purgeSize=Math.round(this.eK*this.hS);if(this.eK<0)purgeSize=this.eg*this.hS;var eW=this.en.eW();for(var i=0;i<eW.length;i++){var key=eW[i];var item=this.en.eO(key);if(this.ik(item)){this.fL(key);}else{tmparray.push(item);}}if(tmparray.length>purgeSize){tmparray=tmparray.sort(function(a,b){if(a.options.priority!=b.options.priority){return b.options.priority-a.options.priority;}else{return b.lastAccessed-a.lastAccessed;}});while(tmparray.length>purgeSize){var ritem=tmparray.pop();this.fL(ritem.key);}}this.fj('Purged cached');};Cache.prototype.im=function(item,iZ){var cache=this;try{this.en.set(item.key,item);this.eg++;}catch(err){if(iZ){this.fj('Failed setting again, giving up: '+err.toString());throw(err);}this.fj('Error adding item, purging and trying again: '+err.toString());this.he();this.im(item,true);}};Cache.prototype.fL=function(key){var item=this.en.remove(key);this.eg--;this.fj("removed key "+key);if(item.options.callback!=null){setTimeout(function(){item.options.callback.call(null,item.key,item.value);},0);}};Cache.prototype.ik=function(item){var now=new Date().getTime();var expired=false;if(item.options.expirationAbsolute&&(item.options.expirationAbsolute<now)){expired=true;}if(!expired&&item.options.expirationSliding){var lastAccess=item.lastAccessed+(item.options.expirationSliding*1000);if(lastAccess<now){expired=true;}}return expired;};Cache.prototype.fj=function(msg){if(this.ix){console.log(msg);}};if(typeof it!=="undefined"){it.ic=Cache;}jws.APIPlugInClass={NS:jws.NS_BASE+".plugins.api",ID:"api",hasPlugIn:function(aT,ax){var cg={ns:jws.APIPlugInClass.NS,type:"hasPlugIn",plugin_id:aT};var ct={};if(ax){if(ax.OnResponse){ct.OnResponse=ax.OnResponse;}}this.conn.sendToken(cg,ct);},getPlugInAPI:function(aT,ax){var cg={ns:jws.APIPlugInClass.NS,type:"getPlugInAPI",plugin_id:aT};var ct={};if(ax){if(ax.OnResponse){ct.OnResponse=ax.OnResponse;}}this.conn.sendToken(cg,ct);},supportsToken:function(aT,ax){var cg={ns:jws.APIPlugInClass.NS,type:"supportsToken",token_type:aT};var ct={};if(ax){if(ax.OnResponse){ct.OnResponse=ax.OnResponse;}}this.conn.sendToken(cg,ct);},getServerAPI:function(ax){var cg={ns:jws.APIPlugInClass.NS,type:"getServerAPI"};var ct={};if(ax){if(ax.OnResponse){ct.OnResponse=ax.OnResponse;}}this.conn.sendToken(cg,ct);},getPlugInsIds:function(ax){var cg={ns:jws.APIPlugInClass.NS,type:"getPlugInIds"};var ct={};if(ax){if(ax.OnResponse){ct.OnResponse=ax.OnResponse;}}this.conn.sendToken(cg,ct);},createSpecFromAPI:function(eG,cT){var dB=cT.supportedTokens.length;var dx=[];for(var db=0;db<dB;db++){var cg=cT.supportedTokens[db];cg.ns=cT.namespace;var eN=function(){var cs=false;var cv={ns:cg.ns,type:cg.type};var ek=cg.inArguments;for(var dy=0,eI=ek.length;dy<eI;dy++){var fx=ek[dy];cv[fx.name]=fx.testValue;}console.log("Automatically sending "+JSON.stringify(cv));eG.sendToken(cv,{OnResponse:function(aR){console.log("Received auto response: "+JSON.stringify(aR));cs=true;}});waitsFor(function(){return cs==true;},"test",20000);runs(function(){expect(cs).toEqual(true);});};dx.push(eN);}return dx;}};jws.APIPlugIn=function(){};jws.APIPlugIn.prototype=jws.APIPlugInClass;jws.ChannelPlugIn={NS:jws.NS_BASE+".plugins.channels",SUBSCRIBE:"subscribe",UNSUBSCRIBE:"unsubscribe",GET_CHANNELS:"getChannels",CREATE_CHANNEL:"createChannel",REMOVE_CHANNEL:"removeChannel",GET_SUBSCRIBERS:"getSubscribers",GET_SUBSCRIPTIONS:"getSubscriptions",AUTHORIZE:"authorize",PUBLISH:"publish",STOP:"stop",processToken:function(aR){if(aR.ns==jws.ChannelPlugIn.NS){if("event"==aR.type){if("channelCreated"==aR.name){if(this.gm){this.gm(aR);}}else if("channelRemoved"==aR.name){if(this.gX){this.gX(aR);}}}else if("getChannels"==aR.reqType){if(this.gV){this.gV(aR);}}}},channelSubscribe:function(dC,dN,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.SUBSCRIBE,channel:dC,accessKey:dN},ax);}return bj;},channelUnsubscribe:function(dC,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.UNSUBSCRIBE,channel:dC},ax);}return bj;},channelAuth:function(dC,dN,fr,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.AUTHORIZE,channel:dC,accessKey:dN,secretKey:fr},ax);}return bj;},channelPublish:function(dC,aw,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.PUBLISH,channel:dC,data:aw},ax);}return bj;},channelCreate:function(aT,ev,ax){var bj=this.checkConnected();if(0==bj.code){var eV=false;var cL=false;var cd=null;var cP=null;var cG=null;var dP=null;if(ax){if(ax.isPrivate!=undefined){eV=ax.isPrivate;}if(ax.isSystem!=undefined){cL=ax.isSystem;}if(ax.accessKey!=undefined){cd=ax.accessKey;}if(ax.secretKey!=undefined){cP=ax.secretKey;}if(ax.owner!=undefined){cG=ax.owner;}if(ax.password!=undefined){dP=ax.password;}}this.sendToken({ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.CREATE_CHANNEL,channel:aT,name:ev,isPrivate:eV,isSystem:cL,accessKey:cd,secretKey:cP,owner:cG,password:dP},ax);}return bj;},channelRemove:function(aT,ax){var bj=this.checkConnected();if(0==bj.code){var cd=null;var cP=null;var cG=null;var dP=null;if(ax){if(ax.accessKey!=undefined){cd=ax.accessKey;}if(ax.secretKey!=undefined){cP=ax.secretKey;}if(ax.owner!=undefined){cG=ax.owner;}if(ax.password!=undefined){dP=ax.password;}}this.sendToken({ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.REMOVE_CHANNEL,channel:aT,accessKey:cd,secretKey:cP,owner:cG,password:dP},ax);}return bj;},channelGetSubscribers:function(dC,dN,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.GET_SUBSCRIBERS,channel:dC,accessKey:dN},ax);}return bj;},channelGetSubscriptions:function(ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.GET_SUBSCRIPTIONS},ax);}return bj;},channelGetIds:function(ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.GET_CHANNELS},ax);}return bj;},setChannelCallbacks:function(ci){if(!ci){ci={};}if(ci.OnChannelCreated!==undefined){this.gm=ci.OnChannelCreated;}if(ci.OnChannelsReceived!==undefined){this.gV=ci.OnChannelsReceived;}if(ci.OnChannelRemoved!==undefined){this.gX=ci.OnChannelRemoved;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.ChannelPlugIn);jws.CanvasPlugIn={NS:jws.NS_BASE+".plugins.canvas",processToken:function(aR){if(aR.reqNS==jws.CanvasPlugIn.NS){if("clear"==aR.reqType){this.doClear(aR.id);}else if("beginPath"==aR.reqType){this.doBeginPath(aR.id);}else if("moveTo"==aR.reqType){this.doMoveTo(aR.id,aR.x,aR.y);}else if("lineTo"==aR.reqType){this.doLineTo(aR.id,aR.x,aR.y);}else if("line"==aR.reqType){this.doLine(aR.id,aR.x1,aR.y1,aR.x2,aR.y2,{color:aR.color});}else if("closePath"==aR.reqType){this.doClosePath(aR.id);}}},bm:{},canvasOpen:function(aT,bL){var bG=jws.$(bL);this.bm[aT]={dj:bG,ctx:bG.getContext("2d")};},canvasClose:function(aT){this.bm[aT]=null;delete this.bm[aT];},doClear:function(aT){var bh=this.bm[aT];if(bh!=null){var lW=bh.dj.getAttribute("width");var lH=bh.dj.getAttribute("height");bh.ctx.clearRect(0,0,lW,lH);return true;}return false;},canvasClear:function(aT){if(this.doClear(aT)){var cg={reqNS:jws.CanvasPlugIn.NS,reqType:"clear",id:aT};this.broadcastToken(cg);}},canvasGetBase64:function(aT,eB){var bj={code: -1,msg:"Ok"};var bh=this.bm[aT];if(bh!=null){if(typeof bh.dj.toDataURL=="function"){bj.code=0;bj.encoding="base64";bj.data=bh.dj.toDataURL(eB);}else{bj.msg="Retrieving image data from canvas not (yet) supported by browser.";}}else{bj.msg="Canvas not found.";}return bj;},doBeginPath:function(aT){var bh=this.bm[aT];if(bh!=null){bh.ctx.beginPath();return true;}return false;},canvasBeginPath:function(aT){if(this.doBeginPath(aT)){var cg={reqNS:jws.CanvasPlugIn.NS,reqType:"beginPath",id:aT};this.broadcastToken(cg);}},doMoveTo:function(aT,cA,cj){var bh=this.bm[aT];if(bh!=null){bh.ctx.moveTo(cA,cj);return true;}return false;},canvasMoveTo:function(aT,cA,cj){if(this.doMoveTo(aT,cA,cj)){var cg={reqNS:jws.CanvasPlugIn.NS,reqType:"moveTo",id:aT,x:cA,y:cj};this.broadcastToken(cg);}},doLineTo:function(aT,cA,cj){var bh=this.bm[aT];if(bh!=null){bh.ctx.lineTo(cA,cj);bh.ctx.stroke();return true;}return false;},canvasLineTo:function(aT,cA,cj){if(this.doLineTo(aT,cA,cj)){var cg={reqNS:jws.CanvasPlugIn.NS,reqType:"lineTo",id:aT,x:cA,y:cj};this.broadcastToken(cg);}},doLine:function(aT,cn,dk,cy,dq,ax){if(undefined==ax){ax={};}var ce="black";if(ax.color){ce=ax.color;}var bh=this.bm[aT];if(bh!=null){bh.ctx.beginPath();bh.ctx.moveTo(cn,dk);bh.ctx.strokeStyle=ce;bh.ctx.lineTo(cy,dq);bh.ctx.stroke();bh.ctx.closePath();return true;}return false;},canvasLine:function(aT,cn,dk,cy,dq,ax){if(undefined==ax){ax={};}var ce="black";if(ax.color){ce=ax.color;}if(this.doLine(aT,cn,dk,cy,dq,ax)){var cg={reqNS:jws.CanvasPlugIn.NS,reqType:"line",id:aT,x1:cn,y1:dk,x2:cy,y2:dq,color:ce};this.broadcastToken(cg);}},doClosePath:function(aT){var bh=this.bm[aT];if(bh!=null){bh.ctx.closePath();return true;}return false;},canvasClosePath:function(aT){if(this.doClosePath(aT)){var cg={reqNS:jws.CanvasPlugIn.NS,reqType:"closePath",id:aT};this.broadcastToken(cg);}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.CanvasPlugIn);if(jws.isIE){
	//
	//	-------------------------------------------------------------------------------
	//	ExplorerCanvas
	//
	//	Google Open Source:
	//		<http://code.google.com>
	//		<opensource@google.com>
	//
	//	Developers:
	//		Emil A Eklund <emil@eae.net>
	//		Erik Arvidsson <erik@eae.net>
	//		Glen Murphy <glen@glenmurphy.com>
	//
	//	-------------------------------------------------------------------------------
	//	DESCRIPTION
	//
	//	Firefox, Safari and Opera 9 support the canvas tag to allow 2D command-based
	//	drawing operations. ExplorerCanvas brings the same functionality to Internet
	//	Explorer; web developers only need to include a single script tag in their
	//	existing canvas webpages to enable this support.
	//
	//	-------------------------------------------------------------------------------
	//	INSTALLATION
	//
	//	Include the ExplorerCanvas tag in the same directory as your HTML files, and
	//	add the following code to your page, preferably in the <head> tag.
	//
	//	<!--[if IE]><script type="text/javascript" src="excanvas.js"></script><![endif]-->
	//
	//	If you run into trouble, please look at the included example code to see how
	//	to best implement this
	//	
	//	Copyright 2006 Google Inc.
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
	//
	//	Fullsource code at: http://excanvas.sourceforge.net/
	//	and http://code.google.com/p/explorercanvas/
	//
	document.createElement("canvas").getContext||(function(){var s=Math,j=s.round,F=s.sin,G=s.cos,V=s.abs,W=s.sqrt,k=10,v=k/2;function X(){return this.context_||(this.context_=new H(this))}var L=Array.prototype.slice;function Y(b,a){var c=L.call(arguments,2);return function(){return b.apply(a,c.concat(L.call(arguments)))}}var M={init:function(b){if(/MSIE/.test(navigator.userAgent)&& !window.opera){var a=b||document;a.createElement("canvas");a.attachEvent("onreadystatechange",Y(this.init_,this,a))}},init_:function(b){b.namespaces.g_vml_||b.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML");b.namespaces.g_o_||b.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML");if(!b.styleSheets.ex_canvas_){var a=b.createStyleSheet();a.owningElement.id="ex_canvas_";a.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"}var c=b.getElementsByTagName("canvas"),d=0;for(;d<c.length;d++)this.initElement(c[d])},initElement:function(b){if(!b.getContext){b.getContext=X;b.innerHTML="";b.attachEvent("onpropertychange",Z);b.attachEvent("onresize",$);var a=b.attributes;if(a.width&&a.width.specified)b.style.width=a.width.nodeValue+"px";else b.width=b.clientWidth;if(a.height&&a.height.specified)b.style.height=a.height.nodeValue+"px";else b.height=b.clientHeight}return b}};function Z(b){var a=b.srcElement;switch(b.propertyName){case "width":a.style.width=a.attributes.width.nodeValue+"px";a.getContext().clearRect();break;case "height":a.style.height=a.attributes.height.nodeValue+"px";a.getContext().clearRect();break}}function $(b){var a=b.srcElement;if(a.firstChild){a.firstChild.style.width=a.clientWidth+"px";a.firstChild.style.height=a.clientHeight+"px"}}M.init();var N=[],B=0;for(;B<16;B++){var C=0;for(;C<16;C++)N[B*16+C]=B.toString(16)+C.toString(16)}function I(){return[[1,0,0],[0,1,0],[0,0,1]]}function y(b,a){var c=I(),d=0;for(;d<3;d++){var f=0;for(;f<3;f++){var h=0,g=0;for(;g<3;g++)h+=b[d][g]*a[g][f];c[d][f]=h}}return c}function O(b,a){a.fillStyle=b.fillStyle;a.lineCap=b.lineCap;a.lineJoin=b.lineJoin;a.lineWidth=b.lineWidth;a.miterLimit=b.miterLimit;a.shadowBlur=b.shadowBlur;a.shadowColor=b.shadowColor;a.shadowOffsetX=b.shadowOffsetX;a.shadowOffsetY=b.shadowOffsetY;a.strokeStyle=b.strokeStyle;a.globalAlpha=b.globalAlpha;a.arcScaleX_=b.arcScaleX_;a.arcScaleY_=b.arcScaleY_;a.lineScale_=b.lineScale_}function P(b){var a,c=1;b=String(b);if(b.substring(0,3)=="rgb"){var d=b.indexOf("(",3),f=b.indexOf(")",d+1),h=b.substring(d+1,f).split(",");a="#";var g=0;for(;g<3;g++)a+=N[Number(h[g])];if(h.length==4&&b.substr(3,1)=="a")c=h[3]}else a=b;return{color:a,alpha:c}}function aa(b){switch(b){case "butt":return "flat";case "round":return "round";case "square":default:return "square"}}function H(b){this.m_=I();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.fillStyle=this.strokeStyle="#000";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=k*1;this.globalAlpha=1;this.canvas=b;var a=b.ownerDocument.createElement("div");a.style.width=b.clientWidth+"px";a.style.height=b.clientHeight+"px";a.style.overflow="hidden";a.style.position="absolute";b.appendChild(a);this.element_=a;this.lineScale_=this.arcScaleY_=this.arcScaleX_=1}var i=H.prototype;i.clearRect=function(){this.element_.innerHTML=""};i.beginPath=function(){this.currentPath_=[]};i.moveTo=function(b,a){var c=this.getCoords_(b,a);this.currentPath_.push({type:"moveTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};i.lineTo=function(b,a){var c=this.getCoords_(b,a);this.currentPath_.push({type:"lineTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};i.bezierCurveTo=function(b,a,c,d,f,h){var g=this.getCoords_(f,h),l=this.getCoords_(b,a),e=this.getCoords_(c,d);Q(this,l,e,g)};function Q(b,a,c,d){b.currentPath_.push({type:"bezierCurveTo",cp1x:a.x,cp1y:a.y,cp2x:c.x,cp2y:c.y,x:d.x,y:d.y});b.currentX_=d.x;b.currentY_=d.y}i.quadraticCurveTo=function(b,a,c,d){var f=this.getCoords_(b,a),h=this.getCoords_(c,d),g={x:this.currentX_+0.6666666666666666*(f.x-this.currentX_),y:this.currentY_+0.6666666666666666*(f.y-this.currentY_)};Q(this,g,{x:g.x+(h.x-this.currentX_)/3,y:g.y+(h.y-this.currentY_)/3},h)};i.arc=function(b,a,c,d,f,h){c*=k;var g=h?"at":"wa",l=b+G(d)*c-v,e=a+F(d)*c-v,m=b+G(f)*c-v,r=a+F(f)*c-v;if(l==m&& !h)l+=0.125;var n=this.getCoords_(b,a),o=this.getCoords_(l,e),q=this.getCoords_(m,r);this.currentPath_.push({type:g,x:n.x,y:n.y,radius:c,xStart:o.x,yStart:o.y,xEnd:q.x,yEnd:q.y})};i.rect=function(b,a,c,d){this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath()};i.strokeRect=function(b,a,c,d){var f=this.currentPath_;this.beginPath();this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath();this.stroke();this.currentPath_=f};i.fillRect=function(b,a,c,d){var f=this.currentPath_;this.beginPath();this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath();this.fill();this.currentPath_=f};i.createLinearGradient=function(b,a,c,d){var f=new D("gradient");f.x0_=b;f.y0_=a;f.x1_=c;f.y1_=d;return f};i.createRadialGradient=function(b,a,c,d,f,h){var g=new D("gradientradial");g.x0_=b;g.y0_=a;g.r0_=c;g.x1_=d;g.y1_=f;g.r1_=h;return g};i.drawImage=function(b){var a,c,d,f,h,g,l,e,m=b.runtimeStyle.width,r=b.runtimeStyle.height;b.runtimeStyle.width="auto";b.runtimeStyle.height="auto";var n=b.width,o=b.height;b.runtimeStyle.width=m;b.runtimeStyle.height=r;if(arguments.length==3){a=arguments[1];c=arguments[2];h=g=0;l=d=n;e=f=o}else if(arguments.length==5){a=arguments[1];c=arguments[2];d=arguments[3];f=arguments[4];h=g=0;l=n;e=o}else if(arguments.length==9){h=arguments[1];g=arguments[2];l=arguments[3];e=arguments[4];a=arguments[5];c=arguments[6];d=arguments[7];f=arguments[8]}else throw Error("Invalid number of arguments");var q=this.getCoords_(a,c),t=[];t.push(" <g_vml_:group",' coordsize="',k*10,",",k*10,'"',' coordorigin="0,0"',' style="width:',10,"px;height:",10,"px;position:absolute;");if(this.m_[0][0]!=1||this.m_[0][1]){var E=[];E.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",j(q.x/k),",","Dy=",j(q.y/k),"");var p=q,z=this.getCoords_(a+d,c),w=this.getCoords_(a,c+f),x=this.getCoords_(a+d,c+f);p.x=s.max(p.x,z.x,w.x,x.x);p.y=s.max(p.y,z.y,w.y,x.y);t.push("padding:0 ",j(p.x/k),"px ",j(p.y/k),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",E.join(""),", sizingmethod='clip');")}else t.push("top:",j(q.y/k),"px;left:",j(q.x/k),"px;");t.push(' ">','<g_vml_:image src="',b.src,'"',' style="width:',k*d,"px;"," height:",k*f,'px;"',' cropleft="',h/n,'"',' croptop="',g/o,'"',' cropright="',(n-h-l)/n,'"',' cropbottom="',(o-g-e)/o,'"'," />","</g_vml_:group>");this.element_.insertAdjacentHTML("BeforeEnd",t.join(""))};i.stroke=function(b){var a=[],c=P(b?this.fillStyle:this.strokeStyle),d=c.color,f=c.alpha*this.globalAlpha;a.push("<g_vml_:shape",' filled="',! !b,'"',' style="position:absolute;width:',10,"px;height:",10,'px;"',' coordorigin="0 0" coordsize="',k*10," ",k*10,'"',' stroked="',!b,'"',' path="');var h={x:null,y:null},g={x:null,y:null},l=0;for(;l<this.currentPath_.length;l++){var e=this.currentPath_[l];switch(e.type){case "moveTo":a.push(" m ",j(e.x),",",j(e.y));break;case "lineTo":a.push(" l ",j(e.x),",",j(e.y));break;case "close":a.push(" x ");e=null;break;case "bezierCurveTo":a.push(" c ",j(e.cp1x),",",j(e.cp1y),",",j(e.cp2x),",",j(e.cp2y),",",j(e.x),",",j(e.y));break;case "at":case "wa":a.push(" ",e.type," ",j(e.x-this.arcScaleX_*e.radius),",",j(e.y-this.arcScaleY_*e.radius)," ",j(e.x+this.arcScaleX_*e.radius),",",j(e.y+this.arcScaleY_*e.radius)," ",j(e.xStart),",",j(e.yStart)," ",j(e.xEnd),",",j(e.yEnd));break}if(e){if(h.x==null||e.x<h.x)h.x=e.x;if(g.x==null||e.x>g.x)g.x=e.x;if(h.y==null||e.y<h.y)h.y=e.y;if(g.y==null||e.y>g.y)g.y=e.y}}a.push(' ">');if(b)if(typeof this.fillStyle=="object"){var m=this.fillStyle,r=0,n={x:0,y:0},o=0,q=1;if(m.type_=="gradient"){var t=m.x1_/this.arcScaleX_,E=m.y1_/this.arcScaleY_,p=this.getCoords_(m.x0_/this.arcScaleX_,m.y0_/this.arcScaleY_),z=this.getCoords_(t,E);r=Math.atan2(z.x-p.x,z.y-p.y)*180/Math.PI;if(r<0)r+=360;if(r<1.0E-6)r=0}else{var p=this.getCoords_(m.x0_,m.y0_),w=g.x-h.x,x=g.y-h.y;n={x:(p.x-h.x)/w,y:(p.y-h.y)/x};w/=this.arcScaleX_*k;x/=this.arcScaleY_*k;var R=s.max(w,x);o=2*m.r0_/R;q=2*m.r1_/R-o}var u=m.colors_;u.sort(function(ba,ca){return ba.offset-ca.offset});var J=u.length,da=u[0].color,ea=u[J-1].color,fa=u[0].alpha*this.globalAlpha,ga=u[J-1].alpha*this.globalAlpha,S=[],l=0;for(;l<J;l++){var T=u[l];S.push(T.offset*q+o+" "+T.color)}a.push('<g_vml_:fill type="',m.type_,'"',' method="none" focus="100%"',' color="',da,'"',' color2="',ea,'"',' colors="',S.join(","),'"',' opacity="',ga,'"',' g_o_:opacity2="',fa,'"',' angle="',r,'"',' focusposition="',n.x,",",n.y,'" />')}else a.push('<g_vml_:fill color="',d,'" opacity="',f,'" />');else{var K=this.lineScale_*this.lineWidth;if(K<1)f*=K;a.push("<g_vml_:stroke",' opacity="',f,'"',' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',aa(this.lineCap),'"',' weight="',K,'px"',' color="',d,'" />')}a.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",a.join(""))};i.fill=function(){this.stroke(true)};i.closePath=function(){this.currentPath_.push({type:"close"})};i.getCoords_=function(b,a){var c=this.m_;return{x:k*(b*c[0][0]+a*c[1][0]+c[2][0])-v,y:k*(b*c[0][1]+a*c[1][1]+c[2][1])-v}};i.save=function(){var b={};O(this,b);this.aStack_.push(b);this.mStack_.push(this.m_);this.m_=y(I(),this.m_)};i.restore=function(){O(this.aStack_.pop(),this);this.m_=this.mStack_.pop()};function ha(b){var a=0;for(;a<3;a++){var c=0;for(;c<2;c++)if(!isFinite(b[a][c])||isNaN(b[a][c]))return false}return true}function A(b,a,c){if(! !ha(a)){b.m_=a;if(c)b.lineScale_=W(V(a[0][0]*a[1][1]-a[0][1]*a[1][0]))}}i.translate=function(b,a){A(this,y([[1,0,0],[0,1,0],[b,a,1]],this.m_),false)};i.rotate=function(b){var a=G(b),c=F(b);A(this,y([[a,c,0],[-c,a,0],[0,0,1]],this.m_),false)};i.scale=function(b,a){this.arcScaleX_*=b;this.arcScaleY_*=a;A(this,y([[b,0,0],[0,a,0],[0,0,1]],this.m_),true)};i.transform=function(b,a,c,d,f,h){A(this,y([[b,a,0],[c,d,0],[f,h,1]],this.m_),true)};i.setTransform=function(b,a,c,d,f,h){A(this,[[b,a,0],[c,d,0],[f,h,1]],true)};i.clip=function(){};i.arcTo=function(){};i.createPattern=function(){return new U};function D(b){this.type_=b;this.r1_=this.y1_=this.x1_=this.r0_=this.y0_=this.x0_=0;this.colors_=[]}D.prototype.addColorStop=function(b,a){a=P(a);this.colors_.push({offset:b,color:a.color,alpha:a.alpha})};function U(){}G_vmlCanvasManager=M;CanvasRenderingContext2D=H;CanvasGradient=D;CanvasPattern=U})();}jws.ChatPlugIn={NS:jws.NS_BASE+".plugins.chat",processToken:function(aR){if(aR.ns==jws.ChatPlugIn.NS){if("login"==aR.reqType){if(this.onChatRequestToken){this.onChatRequestToken(aR);}}}},ChatLogin:function(an,aq,bZ,bv,by,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.ChatPlugIn.NS,type:"login",username:an,password:aq,server:bZ,port:bv,useSSL:by};this.sendToken(cg,ax);}return bj;},ChatLogout:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.ChatPlugIn.NS,type:"logout"};this.sendToken(cg,ax);}return bj;},setChatCallbacks:function(ci){if(!ci){ci={};}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.ChatPlugIn);jws.ClientGamingPlugIn={NS:jws.NS_BASE+".plugins.clientGaming",fz:false,setActive:function(eq){if(eq){}else{}jws.ClientGamingPlugIn.fz=eq;},isActive:function(){return jws.ClientGamingPlugIn.fz;},addPlayer:function(aT,an,bE){aT="player"+aT;var be=document.getElementById(aT);if(!be){be=document.createElement("div");}be.id=aT;be.style.position="absolute";be.style.overflow="hidden";be.style.opacity=0.85;be.style.left="100px";be.style.top="100px";be.style.width="75px";be.style.height="75px";be.style.border="1px solid black";be.style.background="url(img/player_"+bE+".png) 15px 18px no-repeat";be.style.backgroundColor=bE;be.style.color="white";be.innerHTML="<font style=\"font-size:8pt\">Player "+an+"</font>";document.body.appendChild(be);if(!this.cR){this.cR={};}this.cR[aT]=be;},removeAllPlayers:function(){if(this.cR){for(var ff in this.cR){document.body.removeChild(this.cR[ff]);}}delete this.cR;},removePlayer:function(aT){aT="player"+aT;var be=document.getElementById(aT);if(be){document.body.removeChild(be);if(this.cR){delete this.cR[aT];}}},movePlayer:function(aT,cA,cj){aT="player"+aT;var be=document.getElementById(aT);if(be){be.style.left=cA+"px";be.style.top=cj+"px";}},processOpened:function(aR){if(this.isActive()){this.addPlayer(aR.sourceId,aR.sourceId,"green");aR.ns=jws.SystemClientPlugIn.NS;aR.type="broadcast";aR.request="identify";this.sendToken(aR);}},processClosed:function(aR){if(this.isActive()){this.removeAllPlayers();}},processConnected:function(aR){if(this.isActive()){this.addPlayer(aR.sourceId,aR.sourceId,"red");}},processDisconnected:function(aR){if(this.isActive()){this.removePlayer(aR.sourceId);}},processToken:function(aR){if(aR.ns==jws.SystemClientPlugIn.NS){var lX,lY;if(aR.event=="move"){lX=aR.x;lY=aR.y;this.movePlayer(aR.sourceId,lX,lY);}else if(aR.event=="identification"){this.addPlayer(aR.sourceId,aR.sourceId,"red");lX=aR.x;lY=aR.y;this.movePlayer(aR.sourceId,lX,lY);}else if(aR.request=="identify"){var be=document.getElementById("player"+this.getId());lX=100;lY=100;if(be){lX=parseInt(be.style.left);lY=parseInt(be.style.top);}var cg={ns:jws.SystemClientPlugIn.NS,type:"broadcast",event:"identification",x:lX,y:lY,username:this.getUsername()};this.sendToken(cg);}}},broadcastGamingEvent:function(aR,ax){var bj=this.checkConnected();if(bj.code==0){aR.ns=jws.SystemClientPlugIn.NS;aR.type="broadcast";aR.event="move";aR.senderIncluded=true;aR.responseRequested=false;aR.username=this.getUsername();this.sendToken(aR,ax);}return bj;}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.ClientGamingPlugIn);jws.oop.declareClass("jws","iX",null,{OnTimeout:function(jB,bl){if(undefined!=bl.meta.OnTimeout){bl.meta.OnTimeout(jB);}},OnResponse:function(cf,bl){cf.jm=(new Date().getTime())-bl.fV;cf.ip=cf.gQ;delete(cf.gQ);if(undefined!=bl.meta.eventDefinition){var dO=bl.filterChain.length-1;while(dO> -1){try{bl.filterChain[dO].afterCall(bl.meta,cf);}catch(err){switch(err){case "stop_filter_chain":return;break;default:throw err;break;}}dO--;}}if(undefined!=bl.meta.OnResponse){bl.meta.OnResponse(cf);}if(cf.code===0){if(undefined!=bl.meta.OnSuccess)bl.meta.OnSuccess(cf);}else{if(undefined!=bl.meta.OnFailure)bl.meta.OnFailure(cf);}}});jws.oop.declareClass("jws","EventsNotifier",null,{ID:"",jwsClient:{},NS:"",filterChain:[],plugIns:[],initialize:function(){this.jwsClient.addPlugIn(this);for(var dO=0,fO=this.filterChain.length;dO<fO;dO++){if(this.filterChain[dO]["initialize"]){this.filterChain[dO].initialize(this);}}},notify:function(fH,ax){if(this.jwsClient.isConnected()){var cg={};if(ax.args){cg=ax.args;delete(ax.args);}cg.ns=this.NS;cg.type=fH;ax.hs=jws.tools.generateSharedUTID(cg);var fU;if(!ax['OnResponse']&& !ax['OnSuccess']&& !ax['OnFailure']&& !ax['OnTimeout']){fU={};}else{fU=new jws.iX();}fU.args={meta:ax,filterChain:this.filterChain,fV:new Date().getTime()};if(undefined!=ax.eventDefinition){for(var i=0;i<this.filterChain.length;i++){try{this.filterChain[i].beforeCall(cg,fU);}catch(err){switch(err){case "stop_filter_chain":return;break;default:throw err;break;}}}}this.jwsClient.sendToken(cg,fU);}else throw "client:not_connected";},processToken:function(aR){if(this.NS==aR.ns&&"s2c.en"==aR.type){var bu=aR.kC;var cS=aR.jG;if(undefined!=this.plugIns[cS]&&undefined!=this.plugIns[cS][bu]){var jf=new Date().getTime();var bj=this.plugIns[cS][bu](aR);var hL=(new Date().getTime())-jf;if(aR.kU){this.notify("s2c.r",{args:{je:aR.uid,jS:bj,gQ:hL}});}}else{this.notify("s2c.ens",{args:{je:aR.uid}});throw "s2c_event_support_not_found for: "+bu;}}}});jws.oop.declareClass("jws","EventsPlugInGenerator",null,{generate:function(ed,cq,OnReady){var cS=new jws.EventsPlugIn();cS.notifier=cq;cq.notify("plugin.getapi",{args:{plugin_id:ed},plugIn:cS,OnReady:OnReady,OnSuccess:function(cf){this.plugIn.id=cf.id;this.plugIn.plugInAPI=cf.api;for(method in cf.api){eval("this.plugIn."+method+"=function(aOptions){if (undefined == aOptions){aOptions = {};};var eventName=this.plugInAPI."+method+".type; aOptions.eventDefinition=this.plugInAPI."+method+"; ax.timeout = this.plugInAPI."+method+".timeout; this.notifier.notify(eventName, ax);}")}this.plugIn.notifier.plugIns[this.plugIn.id]=this.plugIn;this.OnReady(this.plugIn);},OnFailure:function(cf){throw cf.msg;}});return cS;}});jws.oop.declareClass("jws","EventsPlugIn",null,{id:"",notifier:{},plugInAPI:{}});jws.oop.declareClass("jws","iu",null,{fP:"",hi:"",roles:[],clear:function(){this.fP="";this.roles=[];this.hi="";},hY:function(){return(this.fP)?true:false},lz:function(iC){var fO=this.roles.length;for(var dO=0;dO<fO;dO++){if(iC==this.roles[dO])return true}return false;}});jws.oop.declareClass("jws","EventsBaseFilter",null,{id:"",initialize:function(cq){},beforeCall:function(aR,cr){},afterCall:function(cr,cf){}});jws.oop.declareClass("jws","SecurityFilter",jws.EventsBaseFilter,{id:"security",initialize:function(cq){jws.user=new jws.iu();},beforeCall:function(aR,cr){if(cr.args.meta.eventDefinition.isSecurityEnabled){var lR,fs;var er,ec=null;var eE=false;var gd=false;var gl=false;var fR=false;//@TODO:Support IP addresses restrictions checks on the JS client
;ec=cr.args.meta.eventDefinition.users;er=cr.args.meta.eventDefinition.roles;if(ec&&er&& !jws.user.hY()){if(cr.OnResponse){cr.OnResponse({code: -2,msg:"User is not authenticated yet. Login first!"},cr.args);}this.OnNotAuthorized(aR);throw "stop_filter_chain";}if(ec.length>0){var gv=false;for(var k=0;k<ec.length;k++){fs=ec[k];if("all"!=fs){eE=(fs.substring(0,1)=="!")?true:false;fs=(eE)?fs.substring(1):fs;if(fs==jws.user.fP){gv=true;if(!eE){gl=true;}break;}}else{gv=true;gl=true;break;}}if(!gl&&gv||0==er.length){cr.OnResponse({code: -2,msg:"Not autorized to notify this event. USER restrictions: "+ec.toString()},cr.args);this.OnNotAuthorized(aR);throw "stop_filter_chain";}}if(er.length>0){for(var i=0;i<er.length;i++){for(var j=0;j<jws.user.roles.length;j++){lR=er[i];if("all"!=lR){eE=(lR.substring(0,1)=="!")?true:false;lR=(eE)?lR.substring(1):lR;if(lR==jws.user.roles[j]){if(!eE){gd=true;}fR=true;break;}}else{gd=true;fR=true;break;}}if(fR){break;}}if(!gd){if(cr.OnResponse){cr.OnResponse({code: -2,msg:"Not autorized to notify this event. ROLE restrictions: "+er.toString()},cr.args);}this.OnNotAuthorized(aR);throw "stop_filter_chain";}}}},OnNotAuthorized:function(aR){throw "not_authorized";}});jws.oop.declareClass("jws","CacheFilter",jws.EventsBaseFilter,{id:"cache",cache:{},initialize:function(notifier){notifier.notify("clientcacheaspect.setstatus",{args:{enabled:true}});notifier.plugIns['__cache__']={cache:this.cache,jU:function(event){for(var i=0,end=event.iT.length;i<end;i++){this.cache.fL(jws.user.fP.toString()+event.ls+event.iT[i]);}}}},beforeCall:function(aR,cr){if(cr.args.meta.eventDefinition.isCacheEnabled){var dR=cr.args.meta.eventDefinition.type+cr.args.meta.hs;if(cr.args.meta.eventDefinition.iY&&jws.user.hY()){dR=jws.user.hi+dR;}var fX=this.cache.getItem(dR);if(null!=fX){fX.ip=0;cr.args.meta.jm=(new Date().getTime())-cr.fV;if(cr.OnResponse){cr.OnResponse(fX,cr.args);}throw "stop_filter_chain";}}},afterCall:function(cr,cf){if(cr.eventDefinition.isCacheEnabled){var dR=cr.eventDefinition.type+cr.hs;if(cr.eventDefinition.iY){dR=jws.user.hi+dR;}this.cache.setItem(dR,cf,{expirationAbsolute:null,expirationSliding:cr.eventDefinition.cacheTime,priority:CachePriority.High});}}});jws.oop.declareClass("jws","ValidatorFilter",jws.EventsBaseFilter,{id:"validator",beforeCall:function(aR,cr){var fF=cr.args.meta.eventDefinition.incomingArgsValidation;for(var i=0;i<fF.length;i++){if(undefined===aR[fF[i].name]&& !fF[i].optional){if(cr.OnResponse){cr.OnResponse({code: -4,msg:"Argument '"+fF[i].name+"' is required!"},cr.args);}throw "stop_filter_chain";}else if(aR.hasOwnProperty(fF[i].name)){var fW=fF[i].type;var gp=jws.tools.getType(aR[fF[i].name]);if("number"==fW&&("integer"==gp||"double"==gp)){return;}if("double"==fW&&("integer"==gp)){return;}if(fW!=gp){if(cr.OnResponse){cr.OnResponse({code: -4,msg:"Argument '"+fF[i].name+"' has invalid type. Required: '"+fW+"'"},cr.args);}throw "stop_filter_chain";}}}}});jws.FileSystemPlugIn={NS:jws.NS_BASE+".plugins.filesystem",NOT_FOUND_ERR:1,SECURITY_ERR:2,ABORT_ERR:3,NOT_READABLE_ERR:4,ENCODING_ERR:5,NO_MODIFICATION_ALLOWED_ERR:6,INVALID_STATE_ERR:7,SYNTAX_ERR:8,INVALID_MODIFICATION_ERR:9,QUOTA_EXCEEDED_ERR:10,TYPE_MISMATCH_ERR:11,PATH_EXISTS_ERR:12,processToken:function(aR){if(aR.ns==jws.FileSystemPlugIn.NS){if("load"==aR.reqType){if(aR.code==0){aR.data=Base64.decode(aR.data);if(this.OnFileLoaded){this.OnFileLoaded(aR);}}else{if(this.OnFileError){this.OnFileError(aR);}}}else if("event"==aR.type){if("filesaved"==aR.name){if(this.OnFileSaved){this.OnFileSaved(aR);}}else if("filesent"==aR.name){if(this.OnFileSent){this.OnFileSent(aR);}}}}},jH:function(jD,jj,ax){var bj=this.checkConnected();if(0==bj.code){var bt=jws.SCOPE_PRIVATE;var gH=false;if(ax){if(ax.scope!=undefined){bt=ax.scope;}if(ax.gi!=undefined){gH=ax.gi;}}var cg={ns:jws.FileSystemPlugIn.NS,type:"getFilelist",kL:jD,gi:gH,scope:bt,kH:jj};this.sendToken(cg,ax);}return bj;},fileLoad:function(bB,ax){var bj=this.createDefaultResult();var bt=jws.SCOPE_PRIVATE;if(ax){if(ax.scope!=undefined){bt=ax.scope;}}if(this.isConnected()){var cg={ns:jws.FileSystemPlugIn.NS,type:"load",scope:bt,filename:bB};this.sendToken(cg,ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},fileSave:function(bB,aw,ax){var bj=this.createDefaultResult();var bs="base64";var bD=false;var bt=jws.SCOPE_PRIVATE;if(ax){if(ax.scope!=undefined){bt=ax.scope;}if(ax.encoding!=undefined){bs=ax.encoding;}if(ax.suppressEncoder!=undefined){bD=ax.suppressEncoder;}}if(!bD){if(bs=="base64"){aw=Base64.encode(aw);}}if(this.isConnected()){var cg={ns:jws.FileSystemPlugIn.NS,type:"save",scope:bt,encoding:bs,notify:true,data:aw,filename:bB};this.sendToken(cg,ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},fileSend:function(dW,bB,aw,ax){var bs="base64";var dY=false;if(ax){if(ax.encoding!=undefined){bs=ax.encoding;}if(ax.isNode!=undefined){dY=ax.isNode;}}var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.FileSystemPlugIn.NS,type:"send",data:aw,encoding:bs,filename:bB};if(dY){cg.unid=dW;}else{cg.targetId=dW;}this.sendToken(cg);}return bj;},fileGetErrorMsg:function(eY){var dm="unkown";switch(eY){case jws.FileSystemPlugIn.NOT_FOUND_ERR:{dm="NOT_FOUND_ERR";break;}case jws.FileSystemPlugIn.SECURITY_ERR:{dm="SECURITY_ERR";break;}case jws.FileSystemPlugIn.ABORT_ERR:{dm="ABORT_ERR";break;}case jws.FileSystemPlugIn.NOT_READABLE_ERR:{dm="NOT_READABLE_ERR";break;}case jws.FileSystemPlugIn.ENCODING_ERR:{dm="ENCODING_ERR";break;}case jws.FileSystemPlugIn.NO_MODIFICATION_ALLOWED_ERR:{dm="NO_MODIFICATION_ALLOWED_ERR";break;}case jws.FileSystemPlugIn.INVALID_STATE_ERR:{dm="INVALID_STATE_ERR";break;}case jws.FileSystemPlugIn.SYNTAX_ERR:{dm="SYNTAX_ERR";break;}case jws.FileSystemPlugIn.INVALID_MODIFICATION_ERR:{dm="INVALID_MODIFICATION_ERR";break;}case jws.FileSystemPlugIn.QUOTA_EXCEEDED_ERR:{dm="QUOTA_EXCEEDED_ERR";break;}case jws.FileSystemPlugIn.TYPE_MISMATCH_ERR:{dm="TYPE_MISMATCH_ERR";break;}case jws.FileSystemPlugIn.PATH_EXISTS_ERR:{dm="PATH_EXISTS_ERR";break;}}return dm;},fileLoadLocal:function(ds,ax){var bj={code:0,msg:"ok"};if(!ds|| !ds.files){return{code: -1,msg:"No input file element passed."};}if(undefined==window.FileReader){return{code: -1,msg:"Your browser does not yet support the HTML5 File API."};}if(!ax){ax={};}if(!ax.encoding){ax.encoding="base64";}var cH=ds.files;if(!cH|| !cH.length){return{code: -1,msg:"No files selected."};}for(var db=0,dB=cH.length;db<dB;db++){var dw=cH[db];var dh=new FileReader();var dJ=this;dh.onload=(function(cw){return function(cz){if(dJ.OnLocalFileRead||ax.OnSuccess){var cg={encoding:ax.encoding,fileName:cw.fileName,fileSize:cw.fileSize,type:cw.type,lastModified:cw.lastModifiedDate,data:cz.target.result};if(ax.args){cg.args=ax.args;}if(ax.action){cg.action=ax.action;}}if(dJ.OnLocalFileRead){dJ.OnLocalFileRead(cg);}if(ax.OnSuccess){ax.OnSuccess(cg);}}})(dw);dh.onerror=(function(cw){return function(cz){if(dJ.OnLocalFileError||ax.OnFailure){var dn=cz.target.error.code;var cg={code:dn,msg:dJ.fileGetErrorMsg(dn)};if(ax.args){cg.args=ax.args;}if(ax.action){cg.action=ax.action;}}if(dJ.OnLocalFileError){dJ.OnLocalFileError(cg);}if(ax.OnFailure){ax.OnFailure(cg);}}})(dw);try{dh.readAsDataURL(dw);}catch(dQ){if(dJ.OnLocalFileError||ax.OnFailure){var cg={code: -1,msg:dQ.message};if(ax.args){cg.args=ax.args;}if(ax.action){cg.action=ax.action;}}if(dJ.OnLocalFileError){dJ.OnLocalFileError(cg);}if(ax.OnFailure){ax.OnFailure(cg);}}}return bj;},setFileSystemCallbacks:function(ci){if(!ci){ci={};}if(ci.OnFileLoaded!==undefined){this.OnFileLoaded=ci.OnFileLoaded;}if(ci.OnFileSaved!==undefined){this.OnFileSaved=ci.OnFileSaved;}if(ci.OnFileSent!==undefined){this.OnFileSent=ci.OnFileSent;}if(ci.OnFileError!==undefined){this.OnFileError=ci.OnFileError;}if(ci.OnLocalFileRead!==undefined){this.OnLocalFileRead=ci.OnLocalFileRead;}if(ci.OnLocalFileError!==undefined){this.OnLocalFileError=ci.OnLocalFileError;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.FileSystemPlugIn);jws.JDBCPlugIn={NS:jws.NS_BASE+".plugins.jdbc",processToken:function(aR){if(aR.ns==jws.JDBCPlugIn.NS){if("selectSQL"==aR.reqType){if(this.hC){this.hC(aR);}}}},kW:function(bn,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.JDBCPlugIn.NS,type:"querySQL",sql:bn};this.sendToken(cg,ax);}return bj;},kb:function(gu,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.JDBCPlugIn.NS,type:"querySQL",script:gu};this.sendToken(cg,ax);}return bj;},jQ:function(bn,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.JDBCPlugIn.NS,type:"updateSQL",sql:bn};this.sendToken(cg,ax);}return bj;},lj:function(gu,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.JDBCPlugIn.NS,type:"updateSQL",script:gu};this.sendToken(cg,ax);}return bj;},jt:function(bn,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.JDBCPlugIn.NS,type:"execSQL",sql:bn};this.sendToken(cg,ax);}return bj;},jdbcSelect:function(bn,ax){var bj=this.checkConnected();if(0==bj.code){var eQ=bn.io;if(eQ&& !eQ.length){eQ=[eQ];}var lFields=bn.fields;if(lFields&& !lFields.length){lFields=[lFields];}var gx=bn.ja;if(gx&& !gx.length){gx=[gx];}var gk=bn.iW;if(gk&& !gk.length){gk=[gk];}var cg={ns:jws.JDBCPlugIn.NS,type:"select",io:eQ,ja:gx,fields:lFields,iW:gk,where:bn.where,group:bn.group,having:bn.having};this.sendToken(cg,ax);}return bj;},ly:function(bn,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.JDBCPlugIn.NS,type:"update",table:bn.table,fields:bn.fields,values:bn.values,where:bn.where};this.sendToken(cg,ax);}return bj;},hT:function(bn,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.JDBCPlugIn.NS,type:"insert",table:bn.table,fields:bn.fields,values:bn.values};this.sendToken(cg,ax);}return bj;},jz:function(bn,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.JDBCPlugIn.NS,type:"delete",table:bn.table,where:bn.where};this.sendToken(cg,ax);}return bj;},ia:function(ij,ax){var bj=this.checkConnected();if(0==bj.code){var gR=1;if(ax){if(ax.count!=undefined){gR=ax.count;}}var cg={ns:jws.JDBCPlugIn.NS,type:"getNextSeqVal",sequence:ij,count:gR};this.sendToken(cg,ax);}return bj;},setJDBCCallbacks:function(ci){if(!ci){ci={};}if(ci.hC!==undefined){this.hC=ci.hC;}if(ci.OnJDBCResult!==undefined){this.OnJDBCResult=ci.OnJDBCResult;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.JDBCPlugIn);jws.fD={NS:jws.NS_BASE+".plugins.jms",ji:"iw",jq:"jh",jg:"iE",iS:"hU",iJ:"jc",iV:"jy",iH:"hX",jc:function(fC,eD,dX,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.fD.NS,type:jws.fD.iJ,dV:fC,ef:eD,ee:dX},ax);}return bj;},jy:function(fC,eD,dX,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.fD.NS,type:jws.fD.iV,dV:fC,ef:eD,ee:dX},ax);}return bj;},hX:function(fC,eD,dX,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.fD.NS,type:jws.fD.iH,dV:fC,ef:eD,ee:dX},ax);}return bj;},iw:function(fC,eD,dX,aB,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.fD.NS,type:jws.fD.ji,dV:fC,ef:eD,ee:dX,gO:aB},ax);}return bj;},jh:function(fC,eD,dX,aB,hl,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.fD.NS,type:jws.fD.jq,dV:fC,ef:eD,ee:dX,gO:aB,iy:hl},ax);}return bj;},iE:function(fC,eD,dX,gI,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.fD.NS,type:jws.fD.jg,dV:fC,ef:eD,ee:dX,gO:gI},ax);}return bj;},hU:function(fC,eD,dX,gI,hl,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.fD.NS,type:jws.fD.iS,dV:fC,ef:eD,ee:dX,gO:gI,iy:hl},ax);}return bj;},processToken:function(aR){if(aR.ns==jws.fD.NS){if("event"==aR.type){if("handleJmsText"==aR.name){if(this.gN){this.gN(aR);}}else if("handleJmsTextMessage"==aR.name){if(this.hq){this.hq(aR);}}else if("handleJmsMap"==aR.name){if(this.gU){this.gU(aR);}}else if("handleJmsMapMessage"==aR.name){if(this.hw){this.hw(aR);}}}}},lo:function(ci){if(!ci){ci={};}if(ci.gN!==undefined){this.gN=ci.gN;}if(ci.hq!==undefined){this.hq=ci.hq;}if(ci.gU!==undefined){this.gU=ci.gU;}if(ci.hw!==undefined){this.hw=ci.hw;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.fD);jws.LoggingPlugIn={NS:jws.NS_BASE+".plugins.logging",DEBUG:"fk",INFO:"info",WARN:"hA",ERROR:"error",FATAL:"gK",processToken:function(aR){if(aR.ns==jws.LoggingPlugIn.NS){if("log"==aR.reqType){if(this.OnLogged){this.OnLogged(aR);}}}},loggingLog:function(fo,eA,cJ,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.LoggingPlugIn.NS,type:"log",level:fo,info:eA,message:cJ};this.sendToken(cg,ax);}return bj;},loggingEvent:function(eR,aw,ax){var bj=this.checkConnected();if(0==bj.code){var ew=null;var fl=null;if(ax){if(ax.primaryKey){fl=ax.primaryKey;}if(ax.sequence){ew=ax.sequence;}}var lFields=[];var fe=[];for(var bc in aw){lFields.push(bc);fe.push(aw[bc]);}var cg={ns:jws.LoggingPlugIn.NS,type:"logEvent",table:eR,fields:lFields,values:fe};if(fl&&ew){cg.primaryKey=fl;cg.sequence=ew;}this.sendToken(cg,ax);}return bj;},loggingGetEvents:function(eR,ax){var bj=this.checkConnected();if(0==bj.code){var fl=null;var fK=null;var fc=null;if(ax){if(ax.primaryKey){fl=ax.primaryKey;}if(ax.fromKey){fK=ax.fromKey;}if(ax.toKey){fc=ax.toKey;}}var cg={ns:jws.LoggingPlugIn.NS,type:"getEvents",table:eR,primaryKey:fl,fromKey:fK,toKey:fc};this.sendToken(cg,ax);}return bj;},loggingSubscribe:function(eR,ax){},loggingUnsubscribe:function(eR,ax){},setLoggingCallbacks:function(ci){if(!ci){ci={};}if(ci.OnLogged!==undefined){this.OnLogged=ci.OnLogged;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.LoggingPlugIn);jws.MailPlugIn={NS:jws.NS_BASE+".plugins.mail",jM:true,lk:false,processToken:function(aR){if(aR.ns==jws.MailPlugIn.NS){if("sendMail"==aR.reqType){if(this.OnMailSent){this.OnMailSent(aR);}}}},sendMail:function(aT,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.MailPlugIn.NS,type:"sendMail",id:aT};this.sendToken(cg,ax);}return bj;},hM:function(bN,bV,bS,bQ,bW,bP,bY,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.MailPlugIn.NS,type:"hM",from:bN,to:bV,cc:bS,bcc:bQ,subject:bW,body:bP,isHTML:bY};this.sendToken(cg,ax);}return bj;},jk:function(aT,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.MailPlugIn.NS,type:"jk",id:aT};this.sendToken(cg,ax);}return bj;},jn:function(aT,bB,aw,ax){var bj=this.checkConnected();if(0==bj.code){var bs="base64";var bD=false;var bt=jws.SCOPE_PRIVATE;var fZ=null;var hF=null;if(ax){if(ax.scope!=undefined){bt=ax.scope;}if(ax.encoding!=undefined){bs=ax.encoding;}if(ax.suppressEncoder!=undefined){bD=ax.suppressEncoder;}if(ax.gs!=undefined){fZ=ax.gs;}if(ax.hx!=undefined){hF=ax.hx;}}if(!bD){if(bs=="base64"){aw=Base64.encode(aw);}}var cg={ns:jws.MailPlugIn.NS,type:"jn",encoding:bs,id:aT,data:aw,filename:bB};if(fZ){cg.gs=fZ;}if(hF){cg.hx=hF;}this.sendToken(cg,ax);}return bj;},jX:function(aT,ax){},km:function(aT,ax){},kJ:function(aT,ax){},setMailCallbacks:function(ci){if(!ci){ci={};}if(ci.OnMailSent!==undefined){this.OnMailSent=ci.OnMailSent;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.MailPlugIn);jws.hG={NS:jws.NS_BASE+".plugins.reporting",processToken:function(aR){if(aR.ns==jws.hG.NS){if("createReport"==aR.reqType){if(this.jC){this.jC(aR);}}else if("getReports"==aR.reqType){if(this.gZ){this.gZ(aR);}}else if("getReportParams"==aR.reqType){if(this.gM){this.gM(aR);}}}},ko:function(ht,jv,ax){var bj=this.checkConnected();if(0==bj.code){var gF="eh";if(ax){if(ax.gA){gF=ax.gA;}}var cg={ns:jws.hG.NS,type:"createReport",ie:ht,gA:gF,kM:jv};this.sendToken(cg,ax);}return bj;},jW:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.hG.NS,type:"getReports"};this.sendToken(cg,ax);}return bj;},kn:function(ht,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.hG.NS,type:"getReportParams",ie:ht};this.sendToken(cg,ax);}return bj;},jO:function(ci){if(!ci){ci={};}if(ci.ge!==undefined){this.ge=ci.ge;}if(ci.gZ!==undefined){this.gZ=ci.gZ;}if(ci.gM!==undefined){this.gM=ci.gM;}},kz:function(dT,dr,width,height){if(jws.hJ()){var jF='<object '+'classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" '+'width="'+width+'" '+'height="'+height+'" >'+'<param name="src" value="'+encodeURI(dr)+'">'+'<embed src="'+encodeURI(dr)+'" '+'width="'+width+'" '+'height="'+height+'" >'+'<noembed> Your browser does not support embedded PDF files. </noembed>'+'</embed>'+'</object>';if(dT.eh){dT.removeChild(dT.eh);}dT.eh=null;dT.innerHTML=jF;dT.eh=dT.firstChild;}else{var hI=((dT.eh===null)||(dT.eh===undefined)||(jws.isFirefox()&&jws.hn()<3));var eZ=(hI?document.createElement("embed"):dT.eh);eZ.setAttribute("id",dT.id+".embPdf");eZ.setAttribute("style","position:relative;padding:0px;margin:0px;border:0px;left:0px;top:0px;width:"+width+"px;height:"+height+"px");eZ.setAttribute("type","application/eh");eZ.setAttribute("width","\""+width+"\"");eZ.setAttribute("height","\""+height+"\"");eZ.setAttribute("src",dr);if(hI){if(dT.eh){dT.removeChild(dT.eh);}}dT.eh=eZ;dT.appendChild(dT.eh);}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.hG);jws.RPCClientPlugIn={grantedProcs:[],spawnThreadDefault:false,NS:jws.NS_BASE+".plugins.rpc",setSpawnThreadDefault:function(bR){this.spawnThreadDefault=bR;},addGrantedProcedure:function(bw){jws.RPCClientPlugIn.grantedProcs[jws.RPCClientPlugIn.grantedProcs.length]=bw;},removeGrantedProcedure:function(bw){var db=jws.RPCClientPlugIn.grantedProcs.indexOf(bw);if(db>=0){jws.RPCClientPlugIn.grantedProcs.splice(db,1);}},processToken:function(aR){if(aR.ns==jws.RPCClientPlugIn.NS){if(aR.type=="rrpc"){this.onRRPC(aR);}}},rpc:function(dz,cK,bl,ax){if(bl!=null&& !(bl instanceof Array)){bl=[bl];}ax=this.setDefaultOption(ax);var bj=this.createDefaultResult();if(this.isConnected()){this.sendToken({ns:jws.RPCClientPlugIn.NS,type:"rpc",classname:dz,method:cK,args:bl},ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},setDefaultOption:function(ax){if(ax===undefined){ax={};}if(ax.spawnThread===undefined){ax.spawnThread=this.spawnThreadDefault;}return ax;},rrpc:function(bb,dz,cK,bl,ax){if(bl!=null&& !(bl instanceof Array)){bl=[bl];}ax=this.setDefaultOption(ax);var bj=this.createDefaultResult();if(this.isConnected()){this.sendToken({ns:jws.RPCClientPlugIn.NS,type:"rrpc",targetId:bb,classname:dz,method:cK,args:bl},ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},onRRPC:function(aR){var bF=aR.classname;var bu=aR.method;var bC=aR.args;var ad=bF+"."+bu;if(jws.RPCClientPlugIn.grantedProcs.indexOf(ad)>=0){var bA=bF.split('.');var bI=bA.length;var bx=window[bA[0]];for(var j=1;j<bI;j++){bx=bx[bA[j]];}var bj;try{bj=bx[bu].apply(null,bC);}catch(ex){bj=ex+"\nProbably a typo error (method called="+bu+") or wrong number of arguments (args: "+JSON.stringify(bC)+")";}}else{bj= +"\nAcces not granted to the="+bu;}this.sendToken({type:"send",targetId:aR.sourceId,result:bj,reqType:"rrpc",code:0},null);}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.RPCClientPlugIn);jws.SamplesPlugIn={NS:jws.NS_BASE+".plugins.samples",processToken:function(aR){if(aR.ns==jws.SamplesPlugIn.NS){if("requestServerTime"==aR.reqType){if(this.OnSamplesServerTime){this.OnSamplesServerTime(aR);}}}},requestServerTime:function(ax){var bj=this.createDefaultResult();if(this.isConnected()){var cg={ns:jws.SamplesPlugIn.NS,type:"requestServerTime"};this.sendToken(cg,ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},setSamplesCallbacks:function(ci){if(!ci){ci={};}if(ci.OnSamplesServerTime!==undefined){this.OnSamplesServerTime=ci.OnSamplesServerTime;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.SamplesPlugIn);jws.SharedObjectsPlugIn={NS:jws.NS_BASE+".plugins.sharedObjs",DATA_TYPES:["number","string","boolean","object","set","list","map","table"],cb:{},processToken:function(aR){if(aR.ns==jws.SharedObjectsPlugIn.NS){if(aR.name=="created"){if(this.OnSharedObjectCreated){this.OnSharedObjectCreated(aR);}}else if(aR.name=="destroyed"){if(this.OnSharedObjectDestroyed){this.OnSharedObjectDestroyed(aR);}}else if(aR.name=="updated"){if(this.OnSharedObjectUpdated){this.OnSharedObjectUpdated(aR);}}else if(aR.name=="init"){if(this.OnSharedObjectsInit){var bk=JSON.parse(aR.value);this.OnSharedObjectsInit(aR,bk);}}}},createSharedObject:function(aT,bq,ck,ax){var bj=this.createDefaultResult();if(this.isConnected()){var cg={ns:jws.SharedObjectsPlugIn.NS,type:"create",id:aT,datatype:bq,value:ck};this.sendToken(cg,ax);if(this.OnSharedObjectCreated){this.OnSharedObjectCreated(cg);}}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},destroySharedObject:function(aT,bq,ax){var bj=this.createDefaultResult();if(this.isConnected()){var cg={ns:jws.SharedObjectsPlugIn.NS,type:"destroy",id:aT,datatype:bq};this.sendToken(cg,ax);if(this.OnSharedObjectDestroyed){this.OnSharedObjectDestroyed(cg);}}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},getSharedObject:function(aT,bq,ax){var bj=this.createDefaultResult();if(this.isConnected()){var cg={ns:jws.SharedObjectsPlugIn.NS,type:"eO",id:aT,datatype:bq};this.sendToken(cg,ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},updateSharedObject:function(aT,bq,ck,ax){var bj=this.createDefaultResult();if(this.isConnected()){var cg={ns:jws.SharedObjectsPlugIn.NS,type:"update",id:aT,datatype:bq,value:ck};this.sendToken(cg,ax);if(this.OnSharedObjectUpdated){this.OnSharedObjectUpdated(cg);}}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},setSharedObjectsCallbacks:function(ci){if(!ci){ci={};}if(ci.OnSharedObjectCreated!==undefined){this.OnSharedObjectCreated=ci.OnSharedObjectCreated;}if(ci.OnSharedObjectDestroyed!==undefined){this.OnSharedObjectDestroyed=ci.OnSharedObjectDestroyed;}if(ci.OnSharedObjectUpdated!==undefined){this.OnSharedObjectUpdated=ci.OnSharedObjectUpdated;}if(ci.OnSharedObjectsInit!==undefined){this.OnSharedObjectsInit=ci.OnSharedObjectsInit;}},initSharedObjects:function(ax){var bj=this.createDefaultResult();if(this.isConnected()){var cg={ns:jws.SharedObjectsPlugIn.NS,type:"init"};this.sendToken(cg,ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.SharedObjectsPlugIn);jws.StreamingPlugIn={NS:jws.NS_BASE+".plugins.streaming",registerStream:function(de,ax){var bj=this.createDefaultResult();if(this.isConnected()){this.sendToken({ns:jws.StreamingPlugIn.NS,type:"register",stream:de},ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},unregisterStream:function(de,ax){var bj=this.createDefaultResult();if(this.isConnected()){this.sendToken({ns:jws.StreamingPlugIn.NS,type:"unregister",stream:de},ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.StreamingPlugIn);jws.TestPlugIn={NS:jws.NS_BASE+".plugins.test",processToken:function(aR){if(aR.ns==jws.TestPlugIn.NS){if("event"==aR.type){if("testStarted"==aR.name&&this.OnTestStarted){this.OnTestStarted(aR);}else if("testStopped"==aR.name&&this.OnTestStopped){this.OnTestStopped(aR);}else if("startTest"==aR.name&&this.OnStartTest){this.OnStartTest(aR);}}}},kp:function(iO,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TestPlugIn.NS,type:"iv",iv:iO};this.sendToken(cg,ax);}return bj;},testS2CPerformance:function(ei,cJ,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TestPlugIn.NS,type:"testS2CPerformance",count:ei,message:cJ};this.sendToken(cg,ax);}return bj;},execTests:function(){setTimeout(function(){var es=new jasmine.TrivialReporter();jasmine.getEnv().addReporter(es);jasmine.getEnv().execute();},1000);},setTestCallbacks:function(ci){if(!ci){ci={};}if(ci.OnStartTest!==undefined){this.OnStartTest=ci.OnStartTest;}if(ci.OnTestStarted!==undefined){this.OnTestStarted=ci.OnTestStarted;}if(ci.OnTestStopped!==undefined){this.OnTestStopped=ci.OnTestStopped;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.TestPlugIn);jws.StopWatchPlugIn={NS:jws.NS_BASE+".plugins.stopwatch",eL:{},startWatch:function(aT,cp){var cE={spec:cp,started:new Date().getTime()};this.eL[aT]=cE;return cE;},stopWatch:function(aT){var cE=this.eL[aT];if(cE){cE.stopped=new Date().getTime();cE.millis=cE.stopped-cE.started;return cE;}else{return null;}},logWatch:function(aT,cp,ep){var cE={spec:cp,millis:ep};this.eL[aT]=cE;return cE;},resetWatches:function(){this.eL={};},printWatches:function(){for(var bc in this.eL){var cE=this.eL[bc];var cN=cE.spec+" ("+bc+"): "+cE.millis+"ms";if(window.console){console.log(cN);}else{document.write(cN+"<br>");}}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.StopWatchPlugIn);jws.TwitterPlugIn={NS:jws.NS_BASE+".plugins.twitter",processToken:function(aR){if(aR.ns==jws.TwitterPlugIn.NS){if("getTimeline"==aR.reqType){if(this.OnGotTwitterTimeline){this.OnGotTwitterTimeline(aR);}}else if("requestAccessToken"==aR.reqType){if(this.OnTwitterAccessToken){this.OnTwitterAccessToken(aR);}}else if("event"==aR.type){if("status"==aR.name&&this.OnTwitterStatus){this.OnTwitterStatus(aR);}}}},tweet:function(cJ,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"tweet",message:cJ};this.sendToken(cg,ax);}return bj;},twitterRequestAccessToken:function(bz,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"requestAccessToken",callbackURL:bz};this.sendToken(cg,ax);}return bj;},twitterSetVerifier:function(bH,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"setVerifier",verifier:bH};this.sendToken(cg,ax);}return bj;},twitterLogin:function(bz,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"login",callbackURL:bz};this.sendToken(cg,ax);}return bj;},twitterLogout:function(an,aq,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"logout"};this.sendToken(cg,ax);}return bj;},twitterTimeline:function(an,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"getTimeline",username:an};this.sendToken(cg,ax);}return bj;},twitterQuery:function(bn,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"query",query:bn};this.sendToken(cg,ax);}return bj;},twitterTrends:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"getTrends"};this.sendToken(cg,ax);}return bj;},twitterStatistics:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"getStatistics"};this.sendToken(cg,ax);}return bj;},twitterPublicTimeline:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"getPublicTimeline"};this.sendToken(cg,ax);}return bj;},twitterSetStream:function(bK,bX,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"setStream",keywords:bX,followers:bK};this.sendToken(cg,ax);}return bj;},twitterUserData:function(an,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"getUserData",username:an};this.sendToken(cg,ax);}return bj;},setTwitterCallbacks:function(ci){if(!ci){ci={};}if(ci.OnGotTwitterTimeline!==undefined){this.OnGotTwitterTimeline=ci.OnGotTwitterTimeline;}if(ci.OnTwitterStatus!==undefined){this.OnTwitterStatus=ci.OnTwitterStatus;}if(ci.OnTwitterAccessToken!==undefined){this.OnTwitterAccessToken=ci.OnTwitterAccessToken;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.TwitterPlugIn);jws.XMPPPlugIn={NS:jws.NS_BASE+".plugins.xmpp",MODE_AVAILABLE:"available",MODE_AWAY:"away",MODE_CHAT:"chat",MODE_DND:"dnd",MODE_XA:"xa",TYPE_AVAILABLE:"available",TYPE_UNAVAILABLE:"unavailable",TYPE_SUBSCRIBE:"subscribe",TYPE_SUBSCRIBED:"subscribed",TYPE_UNSUBSCRIBE:"unsubscribe",TYPE_UNSUBSCRIBED:"unsubscribed",TYPE_ERROR:"error",processToken:function(aR){if(aR.ns==jws.XMPPPlugIn.NS){if("event"==aR.type){if("chatMessage"==aR.name){if(this.OnXMPPChatMessage){this.OnXMPPChatMessage(aR);}}}else if("getRoster"==aR.reqType){if(this.OnXMPPRoster){this.OnXMPPRoster(aR);}}}},xmppConnect:function(bM,bv,bO,by,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,type:"connect",host:bM,port:bv,domain:bO,useSSL:by};this.sendToken(cg,ax);}return bj;},xmppDisconnect:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,type:"disconnect"};this.sendToken(cg,ax);}return bj;},xmppLogin:function(an,aq,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,type:"login",username:an,password:aq};this.sendToken(cg,ax);}return bj;},xmppLogout:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,type:"logout"};this.sendToken(cg,ax);}return bj;},xmppRoster:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,type:"getRoster"};this.sendToken(cg,ax);}return bj;},xmppSetPresence:function(fb,bU,bT,fp,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,type:"setPresence",pmode:fb,ptype:bU,ppriority:fp,pstatus:bT};this.sendToken(cg,ax);}return bj;},xmppOpenChat:function(bo,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,type:"openChat",userId:bo};this.sendToken(cg,ax);}return bj;},xmppSendChat:function(bo,cJ,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,type:"sendChat",userId:bo,message:cJ};this.sendToken(cg,ax);}return bj;},xmppCloseChat:function(bo,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,userId:bo,type:"closeChat"};this.sendToken(cg,ax);}return bj;},xmpp:function(bo,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,userId:bo,type:"closeChat"};this.sendToken(cg,ax);}return bj;},setXMPPCallbacks:function(ci){if(!ci){ci={};}if(ci.OnXMPPChatMessage!==undefined){this.OnXMPPChatMessage=ci.OnXMPPChatMessage;}if(ci.OnXMPPRoster!==undefined){this.OnXMPPRoster=ci.OnXMPPRoster;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.XMPPPlugIn);onmessage=function(cz){var bu;eval("lMethod="+cz.data.method);postMessage(bu(cz.data.args));}; 