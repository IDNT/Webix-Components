# Webix form component

Webix UI form drop in replacement using the HTML5 validation API in addition to the webix builtin validation support.

Additional features allow autosizing of a fields bottom description (bottomPadding), depending on the available screensize and automatical placement of a fields label (top or left) depending on the available width. See the "defaults" section on the source for available configuration options. 
You may combine this with our "busyoverlay" extension (see description of this component).

## Installation

Just include after loading webix. Tested with webix version 3.2.4 and current desktop and mobile browsers.

For plug and play usage include the latest and minimized version of this component from the IDNT CDN:

Optional:
    <script type="text/javascript" src="https://api.idnt.net/script/get/webix.ui.busyoverlay.js"></script>

Required:
    <script type="text/javascript" src="https://api.idnt.net/script/get/webix.ui.h5form.js"></script>

At the moment there is no additional CSS required for this component.

To delay your code until script initialization use the following code:

	<script type="text/javascript" charset="utf-8">
        var _webix_ui_h5form = _webix_ui_h5form || []; _webix_ui_h5form.push(function () {
			// Your code goes here...
            console.log('h5form loaded.');
        });
    </script>

## Usage

Example:

	webix.ui({
	{
		view: 'h5form',
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
			{ name:'curpwd', view: 'text', label: 'Current', type: 'password', required:true, 
				attributes:{ maxlength: 100, required:'required' } },
			{ name: 'newpwd', view: 'text', label: 'New', type: 'password', required:true, 
				attributes:{ pattern:'.{10,}', maxlength: 100, required:'required' } },
			{ name: 'pwdrep', view: 'text', label: 'Repeat', type: 'password', required:true,
				attributes:{ pattern:'.{10,}', minlength:10, maxlength: 100, required:'required' } },
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

1.0 IDNT <marc> created
1.1.5 IDNT <marc> Added support for busyoverlay extension

## Credits


## License

The MIT License (MIT)

Copyright (c) 2016 [IDNT Europe GmbH](https://www.idnt.net/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
