# Zipper
A Zip/Unzip Module for Appcelerator Titanium

DESCRIPTION
------------
This module allows you to unzip files within titanium.
Zip support will be added soon.

Built to be the Android port of the iPhone module - https://github.com/mpociot/titanium-mobile-zip-module which was built by Marcel Pociot.
with same callback and properties. However, I Added a new property - async which allows for asynchronous operations (if set to true).
This allows for same set of codes when working on both platforms.

## Install

1. Download or build from source Zipper module.
2. If on Mac, Create a folder and subfolder “me.richboy.module.zipper/1.0.0” in /Library/Application Support/Titanium/modules/android and then drop the ‘zipper.jar’ file from the ‘dist’ directory inside the ‘1.0.0’ subfolder.

## How to use

Register the zipper module with your application by editing 'tiapp.xml' and adding the module:

	
	<modules>
		<module version=“1.0.0” platform=“android”>me.richboy.module.zipper</module>
	</modules>


Put this into your code : 

	var zipper = require("me.richboy.module.zipper");
	zipper.unzip({…});

USAGE
-------------
See example/app.js

ABOUT ME
-------
Learn more at http://richboy.me