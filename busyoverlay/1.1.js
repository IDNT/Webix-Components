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
 */

if (typeof webix === 'undefined') 
    throw new Error('idntBusyOverlay requires webix');

webix.idntBusyOverlay = {
	showBusy:function(message){
		if (!this._busyOverlay){
			this._busyOverlay = webix.html.create("DIV",{ 'class':'webix_overlay', 'style':'position:fixed;display:block;height:100%;background-color:#fff;opacity:.9;color:#333;' },'');
			webix.html.insertBefore(this._busyOverlay, this._viewobj.firstChild, this._viewobj);
			this._viewobj.style.position = 'relative';
		} 
		this._busyOverlay.innerHTML = '<div style="position:absolute;display:block;top:25%;left:20%;margin-top:-50px;"><i class="fa fa-spinner fa-pulse fa-5x"></i><div class="idnt_busyoverlay_message" style="margin-top:25px;font-size:1.2em;">'+(message||'')+'</div></div>';
		return this;
	},
	hideBusy:function(){
		if (this._busyOverlay){
			webix.html.remove(this._busyOverlay);
			this._busyOverlay = null;
		}
		return this;
	}
}