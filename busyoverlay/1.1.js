/*!
 * Overlay extension displaying a spinner with custom message
 *
 * Provided under MIT License (MIT)
 * Copyright (C) 2016 IDNT Europe GmbH (www.idnt.net)
 *
 */
 /*
 * Version History:
 * v1.1.0 IDNT/Marcus Zoller - Initial version
 * v1.1.1 IDNT/Marcus Zoller - Fix for scrollY content
 */

if (typeof webix === 'undefined') 
    throw new Error('idntBusyOverlay requires webix');

webix.idntBusyOverlay = {
	showBusy:function(message){
		if (!this._busyOverlay){
			// Save Y-Overflow style
			this._busyOverflowY = this._viewobj.style.overflowY;
			this._busyScrollTop = this._viewobj.scrollTop;
			this._viewobj.scrollTop = 0;
			this._viewobj.style.overflowY = 'hidden';
			this._busyOverlay = webix.html.create("DIV",{ 'style':'position:absolute;top:0;bottom:0;left:0;width:100%;height:100%;background-color:#fff;opacity:1;color:#333;z-index:10;text-align:center;' },'');
			this._viewobj.firstChild.style.position = 'relative';
			webix.html.insertBefore(this._busyOverlay, this._viewobj.firstChild, this._viewobj);
		} 
		this._busyOverlay.innerHTML = '<i style="margin-top:30%" class="fa fa-spinner fa-pulse fa-5x"></i><div class="idnt_busyoverlay_message" style="margin-top:25px;font-size:1.2em;">'+(message||'')+'</div>';
		return this;
	},
	hideBusy:function(){
		if (this._busyOverlay){
			this._viewobj.style.overflowY = this._busyOverflowY;
			this._viewobj.scrollTop = this._busyScrollTop;
			webix.html.remove(this._busyOverlay);
			this._busyOverlay = null;
		}
		return this;
	}
}