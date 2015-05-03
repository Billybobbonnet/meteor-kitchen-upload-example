
//Client side filters based on mime types

this.isFileTypeOk = function(contentType, mode) {

	var types;
	switch (mode){
		//-----------------------------
		case "image":
		types = {
			'image/jpeg': true,
			'image/png': true,
			'image/gif': true,
			'image/tiff': true,
			'image/bmp': true,
			'image/icon': true,
			'image/vnd.microsoft.icon':true
		};
		return types[contentType] != null;
		//-----------------------------
		case "video":
		types = {
			'video/x-flv': true,
			'video/3gpp': true,
			'video/mp4': true,
			'video/webm': true,
			'video/ogg': true
		};
		return types[contentType] != null;
		//-----------------------------
		case "playablevideo":
		types = {
			'video/mp4': true,
			'video/webm': true,
			'video/ogg': true
		};
		return types[contentType] != null;
		//-----------------------------
		case  "audio":
		types = {
			'audio/mp3': true,
			'audio/wav': true,
			'audio/aac': true
		};
		return types[contentType] != null;
		//-----------------------------
		case "document":
		types = {
			'application/msword': true, //doc
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true, //docx
			'application/vnd.ms-excel': true, //xls
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': true, //xlsx
			'application/vnd.ms-powerpoint': true, //ppt
			'application/vnd.openxmlformats-officedocument.presentationml.presentation': true, //pptx
			'application/pdf': true,
			'application/rtf': true,
			'text/plain': true,
			'application/vnd.oasis.opendocument.text' : true, //odt
			'application/vnd.oasis.opendocument.spreadsheet' : true, //ods
			'application/vnd.oasis.opendocument.presentation' : true //odp
		};
		return types[contentType] != null;
		//-----------------------------
		case "subtitle":
		types = {
			'text/srt': true,
			'text/xml': true,
			'application.xml': true
		};
		return types[contentType] != null;
		//-----------------------------
		default:// if type is bad written, return true and a console alert
		return true
		console.log ("Warning: your filetype uploader argument does not exist");
	}
}
