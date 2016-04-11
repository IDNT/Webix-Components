/*!
 * Dropin replacement for webix 'form' component that supports
 * html5 validation attributes if supported by the browser. 
 *
 * Provided under MIT License (MIT)
 * Copyright (C) 2016 IDNT Europe GmbH (www.idnt.net)
 */
 
if (typeof webix === 'undefined') 
    throw new Error('h5form requires webix');

webix.protoUI({
	name:'h5form',
	defaults: {
		autoLabelPositioning: true,
		defaultLabelWidth: 130,
		defaultLabelPosition: 'left',
		autoheight:true,
	},
	$init:function(config) {
		var oldobj = this._viewobj;	
		this._contentobj = this._viewobj = webix.html.create("FORM",{
				'class':'webix_view webix_form webix_custom_h5form',
				'action':'javascript:0;',
			});
		
		while(oldobj.childNodes.length > 0)
			this._viewobj.appendChild(oldobj.childNodes[0]);
		
		this.$view = this._viewobj;
		
		this.config = webix.extend(config, this.defaults, false);
		
		if (!this.$view.checkValidity)		
			return; // We are done if we have no validation API
		
		var self = this;
		
		config.elementsConfig = config.elementsConfig || {};
		config.elementsConfig.on = config.elementsConfig.on || {};
		if (config.autoLabelPositioning) {
			config.elementsConfig.labelPosition = config.elementsConfig.labelPosition || config.defaultLabelPosition;
			config.elementsConfig.labelWidth = config.elementsConfig.labelWidth || config.defaultLabelWidth;
		}
		var savedOnChange = config.elementsConfig.on.onChange;
		config.elementsConfig.on.onChange = function(newV, oldV) {
			if (this.config.name) {
				self.$view.checkValidity()
				var node = this.getInputNode();
				if (node && typeof node.willValidate !== 'undefined' && node.validity && !node.validity.valid) 
					self.markInvalid(this.config.name, node.validationMessage || 'Please check your input.');			
			}
			
			if (typeof savedOnChange === 'function')
				savedOnChange.call(this, newVm, oldV);
		}
		
		config.rules = config.rules || {};
		var savedObjRule = config.rules.$obj;
		config.rules.$obj = function() {
			var valid = true;	
			Object.keys(self.elements).forEach(function (fieldName) {
				var inputView = self.elements[fieldName];
				if (inputView) {
					var node = inputView.getInputNode();
					if (node && typeof node.willValidate !== 'undefined' && node.validity && !node.validity.valid) {
						self.markInvalid(fieldName, node.validationMessage || 'Please check your input.');
						valid = false;
					}
				}    
			});			
			return valid && (!savedObjRule !== 'function' || savedObjRule.call(this, arguments));
		}
		
		config.on = config.on || {};
		var savedHandler = config.on.onBeforeValidate;
		config.on.onBeforeValidate = function() {
			self.$view.checkValidity()
			if (savedHandler === 'function')
				savedHandler.call(this, arguments);	
		}
		
		this.$view.onsubmit = function(e) {
			self.clearValidation();
			self.validate();
			e.preventDefault();		
			return false;
		};
	},
	_initLabelPosition:function(adjust) {
		var pos = 'left';
		var width = this.getParentView().$width; 
		if (width < 500)
			pos='top';
			
		var chpos = chbp = false;
		if (this.config.elementsConfig.labelPosition != pos) {
			this.config.elementsConfig.labelPosition = pos;
			chpos = true;
		}
		
		for (var n in this.elements) {
			var e = this.elements[n];
			if (chpos) {
				if (pos == 'top') {
					e.config.labelPosition = 'top';
					e._settings.labelPosition = 'top';
					e._settings._savedLabelWidth = e._settings.labelWidth;
					e._settings._savedHeight = e._settings.height;
					e.config.height += 20;
					//console.log(n+': saving labelWidth='+e._settings._savedLabelWidth+' height='+e._settings._savedHeight);
					if (adjust)
						e.render();
				}
				else if (pos == 'left') {
					e.config.labelPosition = 'left';
					e._settings.labelPosition = e.config.labelPosition;
					e.config.labelWidth = e._settings._savedLabelWidth;
					e._settings.labelWidth = e.config.labelWidth;
					e.config.height = e._settings._savedHeight;
				}
			}
			
			// Adjust the bottom label if present
			if (typeof e.config.bottomLabel !== 'undefined' && e.config.bottomLabel.length) {
				var fWidth = e._input_width || (width - e.config.labelWidth);
				var lSize = webix.html.getTextSize(e.config.bottomLabel);
				var bp = Math.ceil(lSize.width / fWidth) * lSize.height;
				if (e.config.bottomPadding != bp) {
					e.config.bottomPadding = bp;
					chbp = true;
				}
			}
		}
		
		if (adjust && (chpos || chbp))
			this.adjust();
	},
	$setSize:function(x,y){
		var parentWidth = this.getParentView().$width;
		if (typeof parentWidth !== 'undefined')
			this._initLabelPosition(true);
		return webix.ui.form.prototype.$setSize.call(this,x,y);
	}
}, webix.ui.form);
