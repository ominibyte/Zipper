//THIS EXAMPLE SHOWS TWO MODES OF ZIPPING - ZIPPING INDIVIDUAL FILES AND ZIPPING AN ENTIRE DIRECTORY

var zipper = require('me.richboy.module.zipper');

//ZIPPING INIDIVIDUAL FILES: 
//Note that files can be located at different directories but would be grouped together in the zip.
//All sub-directories would inherit from their parent positions within the root of the zip structure

var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "someFile.pdf");

Ti.API.info("File Resolve: " + file.resolve());//resolve allows you to see the full path of the file on the host platform

//NOTE: only add the resolved path from a Ti.Filesystem.File object
var added = zipper.addFile(file.resolve());//returns a boolean which tells you if the file was added or not. If the file does NOT exist, it would not be added
//you can also add a hard-coded path such as
zipper.addFile("/data/data/[Application id]/app_appdata/file.jpg");
//could also add a folder to the queue
zipper.addFile("file:////sdcard/folder_name");//works with the file:// URL protocol as well

//call the zip method to zip all queued files added via the addFile method
zipper.zip({
	target: someZipFile.resolve(),//[optional] the zip file which should be created. File may not exist but the parent directory MUST. If file already exists, it would be overwritten
	async: true,//default is false
	success: function(e){
		Ti.API.info("process completed sucessfully");
		
		//e.file returns the path to the zip. 
		//Same as target (if target was supplied) else it returns the zip file created in some temporary directory
		Ti.API.info(e.file);
	},
	error: function(e){
		alert(e.message);//you can get a stack trace for the error (if exists) via e.errorStack
	},
	progress: function(e){//e.progress returns a decimal value which is the result of (number processed / total)
		var percentage = Math.round(e.progress * 100);
		Ti.API.info("Percentage progress is " + percentage);
	}
});

//if at any time you wish to clear the queue, you can use
zipper.emptyQueue();


//ZIPPING A DIRECTORY
//if you wish to immediately zip a directory
//Note that any previous queue is deleted when this is called

zipper.zipDirectory({
	directory: someDir.resolve(),//The directory to Zip
	target: someZipFile.resolve(),//[optional] the zip file which should be created. File may not exist but the parent directory MUST. If file already exists, it would be overwritten
	inclusive: true,//Should the directory itself be inclusive in the zip or just the files inside. default is true
	async: true,//default is false
	success: function(e){
		Ti.API.info("process completed sucessfully");
		
		//e.file returns the path to the zip. 
		//Same as target (if target was supplied) else it returns the zip file created in some temporary directory
		Ti.API.info(e.file);
	},
	error: function(e){
		alert(e.message);//you can get a stack trace for the error (if exists) via e.errorStack
	},
	progress: function(e){//e.progress returns a decimal value which is the result of (number processed / total)
		var percentage = Math.round(e.progress * 100);
		Ti.API.info("Percentage progress is " + percentage);
	}
});



//NOTE: Both method empties the zip queue when they successfully finish. Queue is left untouched if an error occurred along the way
//You can explicitly clear the queue at anytime via zipper.emptyQueue();
