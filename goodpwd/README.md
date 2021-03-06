# Project Name

Configurable Webix UI form component to indicate the strength of a password input. This adds a 
validation rule for the password field too.

## Installation

Just include after loading webix. Tested with webix version 3.2.4 and current desktop and mobile browsers.
Take a look at the defautls:{} for available configuration options.

## Usage

Example:

	webix.ui({
	{
		view: 'form',
		rules:{
			'pwdrep':function(v) {
				if (!webix.rules.isNotEmpty(v)) {
					this.markInvalid('pwdrep', 'Please repeat the new password.');
					return false;
				}
				var d = this.getValues();
				if (d.newpwd != d.pwdrep){
					this.markInvalid('pwdrep', 'This does not match your new password.');
					return false;
				}
				return true;												
			}
		},
		elements: [
			{ name:'curpwd', view: 'text', label: 'Current', type: 'password', required:true },
			{ name: 'newpwd', view: 'text', label: 'New', type: 'password', required:true },
			{
				cols:[
					{ label:'', width: 130 },
					{ view:'goodpwd', input: 'newpwd', msgfail: 'Bad password!' },
				]
			},
			{ name: 'pwdrep', view: 'text', label: 'Repeat', type: 'password', required:true },
			{ 
				margin:10, 
				cols:[
					{},
					{ view:"button", value:"Submit" , width:160, type:"form", 
						click:function(){
							var form = this.getFormView();
							if (form.validate()){
								webix.alert("Validation reported success!")
							}
						}													
					},
				]
			},
			{}
		]	
	})

## Issues

webix Version 3.2.4 has issues with multiple validation handlers reporting an error on the same field. If one of them
reports an error and any other handler is reporting success, the field will be valid. The problem is known to the webix
team and should be fixed with the next build.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

1.0 IDNT <marc> - Initial version
1.1 IDNT <marc> - Now configurable

## Credits


## License

The MIT License (MIT)

Copyright (c) 2016 [IDNT Europe GmbH](https://www.idnt.net/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
