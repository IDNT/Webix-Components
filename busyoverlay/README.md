# Webix busy overlay

Webix UI extension to show a spinner overlay. 

## Installation

Just include after loading webix. 

## Usage

Example:

	webix.ui({
	{
		view: 'form',
		id: 'myform',
		elements: [
			{ name:'curpwd', view: 'text', label: 'Current', type: 'password' },
			{ 
				margin:10, 
				cols:[
					{},
					{ view:'button', value:'Submit' , width:160, type:'form' }
					},
				]
			},
			{}
		]	
	})

	webix.extend($$('myform'), webix.OverlayBox);
	$$('myform').showBusy('Loading...');
	$$('myform').hideBusy();
	
If you are using the IDNT h5form component, you don't need to use the webix.extend method and you can set the initial busy state:

	webix.ui({
	{
		view: 'h5form',
		id: 'myform',
		busy: 'Please wait...',
		elements: [
			{ name:'curpwd', view: 'text', label: 'Current', type: 'password' },
			{ 
				margin:10, 
				cols:[
					{},
					{ view:"button", value:"Submit" , width:160, type:"form" }
					},
				]
			},
			{}
		]	
	})

## Issues

Should be more configurable.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

1.0 IDNT <marc> created

## Credits


## License

The MIT License (MIT)
Copyright (c) 2016 [IDNT Europe GmbH](https://www.idnt.net/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
