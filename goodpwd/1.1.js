/*!
 * Password strength indicator for webix forms 
 *
 * Provided under MIT License (MIT)
 * Copyright (C) 2016 IDNT Europe GmbH (www.idnt.net)
 *
 * v1.0 Marcus Zoller - Initial version
 */
 
if (typeof webix === 'undefined') 
    throw new Error('goodpwd requires webix');

webix.protoUI({
	name:'goodpwd',
	defaults: {
		height: 24,			// Component height,
		autowidth: false,	// We take the full width
		msgfail: 'Password does not match safety requirements.', // Validation message shown on failure
		minlength: 10,
		minstrength: 49, 	// 12 chars with Upper, Lower and Number
		maxstrength: 120, 	// 25 chars, all charsets
		reqdigit: true,		// Digit is required
		reqnumber: true,	// Number is required
		reqsymbol: true,	// Symbol is required
		requpper: true,		// Uppercase character required
		reqlower: true,		// Lowercase character is required
		pctbadmax: 25,		// Maximum percentage returned if password complexity fails
		steps: { 
			0: { valid: false, msg: 'Be creative...', css: 'bad' },
			20: { valid: false, msg: 'Go on...', css: 'warn' },
			50: { valid: false, msg: 'Okay... can you do better?', css: 'valid' },
			56: { valid: true, msg: 'This looks good to me!', css: 'good' },
			70: { valid: true, msg: 'This is perfect!', css: 'perfect' }
		},
		input: 'newpwd'		// Name of the input field
	},
	_charsets: [
		[ 0x0020, 0x0020 ], // Space
		[ 0x0030, 0x0039 ], // Numbers
		[ 0x0041, 0x005A ], // Uppercase
		[ 0x0061, 0x007A ], // Lowercase
		[ 0x0021, 0x002F ], // Punctuation
		[ 0x003A, 0x0040 ], // Punctuation
		[ 0x005B, 0x0060 ], // Punctuation
		[ 0x007B, 0x007E ], // Punctuation
		// Everything Else
		[ 0x0080, 0x00FF ], // Latin-1 Supplement
		[ 0x0100, 0x017F ], // Latin Extended-A
		[ 0x0180, 0x024F ], // Latin Extended-B
		[ 0x0250, 0x02AF ], // IPA Extensions
		[ 0x02B0, 0x02FF ], // Spacing Modifier Letters
		[ 0x0300, 0x036F ], // Combining Diacritical Marks
		[ 0x0370, 0x03FF ], // Greek
		[ 0x0400, 0x04FF ], // Cyrillic
		[ 0x0530, 0x058F ], // Armenian
		[ 0x0590, 0x05FF ], // Hebrew
		[ 0x0600, 0x06FF ], // Arabic
		[ 0x0700, 0x074F ], // Syriac
		[ 0x0780, 0x07BF ], // Thaana
		[ 0x0900, 0x097F ], // Devanagari
		[ 0x0980, 0x09FF ], // Bengali
		[ 0x0A00, 0x0A7F ], // Gurmukhi
		[ 0x0A80, 0x0AFF ], // Gujarati
		[ 0x0B00, 0x0B7F ], // Oriya
		[ 0x0B80, 0x0BFF ], // Tamil
		[ 0x0C00, 0x0C7F ], // Telugu
		[ 0x0C80, 0x0CFF ], // Kannada
		[ 0x0D00, 0x0D7F ], // Malayalam
		[ 0x0D80, 0x0DFF ], // Sinhala
		[ 0x0E00, 0x0E7F ], // Thai
		[ 0x0E80, 0x0EFF ], // Lao
		[ 0x0F00, 0x0FFF ], // Tibetan
		[ 0x1000, 0x109F ], // Myanmar
		[ 0x10A0, 0x10FF ], // Georgian
		[ 0x1100, 0x11FF ], // Hangul Jamo
		[ 0x1200, 0x137F ], // Ethiopic
		[ 0x13A0, 0x13FF ], // Cherokee
		[ 0x1400, 0x167F ], // Unified Canadian Aboriginal Syllabics
		[ 0x1680, 0x169F ], // Ogham
		[ 0x16A0, 0x16FF ], // Runic
		[ 0x1780, 0x17FF ], // Khmer
		[ 0x1800, 0x18AF ], // Mongolian
		[ 0x1E00, 0x1EFF ], // Latin Extended Additional
		[ 0x1F00, 0x1FFF ], // Greek Extended
		[ 0x2000, 0x206F ], // General Punctuation
		[ 0x2070, 0x209F ], // Superscripts and Subscripts
		[ 0x20A0, 0x20CF ], // Currency Symbols
		[ 0x20D0, 0x20FF ], // Combining Marks for Symbols
		[ 0x2100, 0x214F ], // Letterlike Symbols
		[ 0x2150, 0x218F ], // Number Forms
		[ 0x2190, 0x21FF ], // Arrows
		[ 0x2200, 0x22FF ], // Mathematical Operators
		[ 0x2300, 0x23FF ], // Miscellaneous Technical
		[ 0x2400, 0x243F ], // Control Pictures
		[ 0x2440, 0x245F ], // Optical Character Recognition
		[ 0x2460, 0x24FF ], // Enclosed Alphanumerics
		[ 0x2500, 0x257F ], // Box Drawing
		[ 0x2580, 0x259F ], // Block Elements
		[ 0x25A0, 0x25FF ], // Geometric Shapes
		[ 0x2600, 0x26FF ], // Miscellaneous Symbols
		[ 0x2700, 0x27BF ], // Dingbats
		[ 0x2800, 0x28FF ], // Braille Patterns
		[ 0x2E80, 0x2EFF ], // CJK Radicals Supplement
		[ 0x2F00, 0x2FDF ], // Kangxi Radicals
		[ 0x2FF0, 0x2FFF ], // Ideographic Description Characters
		[ 0x3000, 0x303F ], // CJK Symbols and Punctuation
		[ 0x3040, 0x309F ], // Hiragana
		[ 0x30A0, 0x30FF ], // Katakana
		[ 0x3100, 0x312F ], // Bopomofo
		[ 0x3130, 0x318F ], // Hangul Compatibility Jamo
		[ 0x3190, 0x319F ], // Kanbun
		[ 0x31A0, 0x31BF ], // Bopomofo Extended
		[ 0x3200, 0x32FF ], // Enclosed CJK Letters and Months
		[ 0x3300, 0x33FF ], // CJK Compatibility
		[ 0x3400, 0x4DB5 ], // CJK Unified Ideographs Extension A
		[ 0x4E00, 0x9FFF ], // CJK Unified Ideographs
		[ 0xA000, 0xA48F ], // Yi Syllables
		[ 0xA490, 0xA4CF ], // Yi Radicals
		[ 0xAC00, 0xD7A3 ], // Hangul Syllables
		[ 0xD800, 0xDB7F ], // High Surrogates
		[ 0xDB80, 0xDBFF ], // High Private Use Surrogates
		[ 0xDC00, 0xDFFF ], // Low Surrogates
		[ 0xE000, 0xF8FF ], // Private Use
		[ 0xF900, 0xFAFF ], // CJK Compatibility Ideographs
		[ 0xFB00, 0xFB4F ], // Alphabetic Presentation Forms
		[ 0xFB50, 0xFDFF ], // Arabic Presentation Forms-A
		[ 0xFE20, 0xFE2F ], // Combining Half Marks
		[ 0xFE30, 0xFE4F ], // CJK Compatibility Forms
		[ 0xFE50, 0xFE6F ], // Small Form Variants
		[ 0xFE70, 0xFEFE ], // Arabic Presentation Forms-B
		[ 0xFEFF, 0xFEFF ], // Specials
		[ 0xFF00, 0xFFEF ], // Halfwidth and Fullwidth Forms
		[ 0xFFF0, 0xFFFD ]  // Specials
	],
	isValid: false,
	/*****************************************************************
	 * Calculate a bonus for using different charsets
	 * @param {string} pwd - the password
	 * @param {int[]} charset - start and end of character set
	 * @returns {int} - the bonus
	 ****************************************************************/
	_getBonus:function(pwd, charset) {
		var bonus = 0;
		for (var i = pwd.length - 1; i >= 0; i--) {
			if (charset[0] <= pwd.charCodeAt(i) && pwd.charCodeAt(i) <= charset[1]) {
				bonus = charset[1] - charset[0] +1;
				break;
			}
		}
		return bonus;
	},
	/*****************************************************************
	 * Calculates a password strength indication
	 * @param {string} pwd - the password
	 * @returns {int} - strength as percentage (100%=best)
	 ****************************************************************/
	_getStrength:function(pwd) {
		if (typeof pwd !== 'string' || pwd.length == 0)
			return 0;
		
		var strength = 0;
		
		for (i=this._charsets.length - 1; i >= 0; i--)
			strength += this._getBonus(pwd, this._charsets[i]);

			var hasDigit = false;
		var hasUppercase = false;
		var hasLowercase = false;
		var hasSpecial = false;
		
		var isDigit = [true, true, true, true, true, true, true, true, true, true];
		
		for (i=1; i < pwd.length; i++) {
			if (pwd.charCodeAt(i-1) == (pwd.charCodeAt(i) + 1) || 	// abc
				pwd.charCodeAt(i-1) == (pwd.charCodeAt(i) - 1) || 	// cba
				pwd.charCodeAt(i-1) == pwd.charCodeAt(i))			// aaa
				strength -= 15; // Penalty points for sequence
			
			var c = pwd.charAt(i);
			
			if (!/[a-zA-Z0-9]+/.test(c))
				hasSpecial = true;
			else if (Boolean(isDigit[c]))
				hasDigit = true;
			else if (c == c.toLowerCase())
				hasLowercase = true;
			else if (c == c.toUpperCase())
				hasUppercase = true;
		}

		var c = pwd.charAt(0);
		
		if (!/[a-zA-Z0-9]+/.test(c))
			hasSpecial = true;
		else if (Boolean(isDigit[c]))
			hasDigit = true;
		else if (c == c.toLowerCase())
			hasLowercase = true;
		else if (c == c.toUpperCase())
			hasUppercase = true;
		
		// For every missing categry we substract 10
		if (!hasDigit)
			strength -= 10;
		if (!hasUppercase)
			strength -= 10;
		if (!hasLowercase)
			strength -= 10;
		if (!hasSpecial)
			strength -= 10;

		strength += (pwd.length*4);
		
		if (strength < 0)
			strength = 0;

		if (strength > 0)
			strength = ~~(Math.log(Math.pow(strength, pwd.length)) * (1 / 0.75));
		
		// Scale to a percentage
		var prct = strength * 100 / this.config.maxstrength;
		prct = (prct > 100) ? 100 : prct;

		var isValid = (strength > this.config.minstrength && pwd.length >= this.config.minlength) &&
			(
				(!this.config.reqdigit || hasDigit) &&
				(!this.config.reqlower || hasLowercase) &&
				(!this.config.requpper || hasUppercase) &&
				(!this.config.reqsymbol || hasSpecial)
			);

		if (!isValid && prct > this.config.pctbadmax)
			prct = this.config.pctbadmax;
			
		return prct;
	},
	$init:function(config) {
		
		this._viewobj.className += " webix_idnt_goodpwd";
		this._viewobj.innerHTML = '<div class="container">'
            +'<div class="strength" style="width:0%"></div>'
			+'<div class="message"></div>'
			+'</div>';
		
		this.config = webix.extend(config, this.defaults, false);
		this._steps = Object.keys(this.config.steps).map(function(x){return parseInt(x);}).sort().reverse();
		
		var self = this;
		this._form = this.getFormView();
		
		// We abuse onViewShow to detect that the form was initialized and shown. 
		this._form.attachEvent("onViewShow", function(){
			
			if (self._input)
				return;	// Already initialized
				
			self._input = this.elements[self.config.input];
			if (! self._input) {
				webix.message({type: 'error', text: 'goodpwd: The specified input field "'+self.config.input+'" could not be found.'});
				return;
			}
			
			self._input.attachEvent("onKeyPress", function(){
				var strength = self._getStrength(this.getValue());
				var status = { valid: false, msg: 'Be creative...', css: 'red' };
				for(i=0; i<self._steps.length; i++) {
					var score = self._steps[i];
					if (strength >= score) {
						status = self.config.steps[score];
						break;
					}
				}
				
				self.isValid = status.valid;
				self._viewobj.innerHTML = '<div class="container '+status.css+'">'
					+'<div class="strength" style="width:'+strength+'%"></div>'
					+'<div class="message">'+status.msg+'</div>'
					+'</div>';
				
			});			
		});
		
		// Add validation rule to for the input field
		this._form.config.rules = this._form.config.rules || {};
		var savedInputRule = this._form.config.rules[self.config.input];
		this._form.config.rules[this.config.input] = function() {
			if (!self.isValid) {
				self._form.markInvalid(self.config.input, self.config.msgfail);
				return false;
			}
			if (typeof savedInputRule === 'function')
				return savedInputRule.call(this, arguments);
			return true;
		};
	}
}, webix.ui.baseview);
