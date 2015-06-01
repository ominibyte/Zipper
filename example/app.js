var zipper = require('me.richboy.module.zipper');
var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'files/setup.zip');//test file from resources folder

var tempDir = Ti.Filesystem.createTempDirectory();
var tempFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "dump.zip");
tempFile.write(file);

Ti.API.info("File Resolve: " + tempFile.resolve());

zipper.unzip({
	file: tempFile.resolve(),//source zip file
	target: tempDir.resolve(),//destination directory to extract to
	async: true,//default is false
	overwrite: true,//overwrite existing files, default is true
	success: function(e){
		Ti.API.info("process completed sucessfully");
		//access all extracted files via: e.files array
		for(var i = 0; i < e.files.length; i++){
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
	tempDir.deleteDirectory(true);
	tempFile.deleteFile();
}