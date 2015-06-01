var zipper = require('me.richboy.module.zipper');
var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'files/setup.zip');//test file from resources folder

var tempDir = Ti.Filesystem.createTempDirectory();
//trying to read directly from the assets folder from the Java/Android end has been buggy. 
//Solution was to create some other file and copy the contents there...as is done next...
var tempFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "dump.zip");
tempFile.write(file);//write the contents of the setup.zip file to this temporary file

Ti.API.info("File Resolve: " + tempFile.resolve());//resolve allows you to see the full path of the file on the host platform

zipper.unzip({
	file: tempFile.resolve(),//source zip file
	target: tempDir.resolve(),//destination directory to extract to
	async: true,//default is false
	overwrite: true,//overwrite exisiting files, default true
	success: function(e){
		Ti.API.info("process completed sucessfully");
		//access all extracted files via: e.files array
		for(var i = 0; i < e.files.length; i++){//you can do anything with the files like moving them somewhere else or whatever...
			Ti.API.info(e.files[i].toString());
		}
		//delete temporary data
		cleanup();
	},
	error: function(e){
		alert(e.message);//you can get a stack trace for the error (if exists) via e.errorStack
		//delete temporary data
		cleanup();
	},
	progress: function(e){//e.progress returns a decimal value which is the result of (number processed / total)
		var percentage = Math.round(e.progress * 100);
		Ti.API.info("Percentage progress is " + percentage);
	}
});


function cleanup(){
	//perform cleanup...
	tempDir.deleteDirectory(true);//delete the temporary directory recursively
	tempFile.deleteFile();//delete the temporary file
}
