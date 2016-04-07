/*!
 * Dropin replacement for webix 'form' component that supports
 * html5 validation attributes if supported by the browser. 
 *
 * Provided under MIT License (MIT)
 * Copyright (C) 2016 IDNT Europe GmbH (www.idnt.net)
 *
 * v1.0 Marcus Zoller - Initial version using jQuery
 * v1.1 Marcus Zoller - Removed jQuery dependency
 */
 
if (typeof webix === 'undefined') 
    throw new Error('h5form requires webix');

webix.protoUI({
	name:'h5form',
	$init:function(config) {
		var oldobj = this._viewobj;	
		this._contentobj = this._viewobj = webix.html.create("FORM",{
				'class':'webix_view webix_form webix_custom_h5form',
				'action':'javascript:0;',
			});
		
		while(oldobj.childNodes.length > 0)
			this._viewobj.appendChild(oldobj.childNodes[0]);
		
		this.$view = this._viewobj;
		
		if (!this.$view.checkValidity)		
			return; // We are done if we have no validation API
		
		var self = this;
		
		config.elementsConfig = config.elementsConfig || {};
		config.elementsConfig.on = config.elementsConfig.on || {};
		
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
}, webix.ui.form);
