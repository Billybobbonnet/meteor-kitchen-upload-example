var pageSession = new ReactiveDict();

Template.uploader.events({
	'click .del-file': function(e, t) {
		return Files.remove({
			_id: this._id
		});
	},
	'click .del-error': function(e, t) {
		return Errors.remove({
			_id: this._id
		});
	},
	'click .fileDrop': function() {
		$("#file").click();
	},
	'change .fileBrowse':function(event){

	}
});

Template.uploader.helpers({
	uploadQueueItems: function() {
		var validatedFiles = Files.find().fetch();
		var errors = Errors.find().fetch();
		var queue = validatedFiles.concat(errors);
		return _.sortBy(queue, function(doc) {return doc.createdAt;});
	},
	isMultipleMode: function(w) {
		return (pageSession.get("mode")==="multiple")||(Files.length===0);
	},
	Filename: function(w) {
		return this.filename;
	},
	dataEntries: function() {
		return Files.find({});
	},
	shortFilename: function(w) {
		if (w == null) {
			w = 16;
		}
		return shorten(this.filename, w);
	},
	owner: function() {
		var _ref, _ref1;
		return (_ref = this.metadata) != null ? (_ref1 = _ref._auth) != null ? _ref1.owner : void 0 : void 0;
	},
	id: function() {
		return "" + this._id;
	},
	link: function() {
		return Files.baseURL + "/" + this.md5;
	},
	uploadStatus: function() {
		var percent;
		percent = pageSession.get("" + this._id);
		if (percent == null) {
			return "Processing...";
		} else {
			return "Uploading";
		}
	},
	isPlayableVideo: function(){
		return isFileTypeOk(this.contentType,"playablevideo");
	},
	isImage: function(){
		return isFileTypeOk(this.contentType,"image");
	},
	isImage: function(){
		return isFileTypeOk(this.contentType,"image");
	},
	isUploading: function(){
		return pageSession.get("" + this._id) != null;
	},
	formattedLength: function() {
		return numeral(this.length).format('0.0b');
	},
	uploadProgress: function() {
		var percent;
		return percent = pageSession.get("" + this._id);
	},

	loginToken: function() {
		Meteor.userId();
		return Accounts._storedLoginToken();
	},
	userId: function() {
		return Meteor.userId();
	},
	isError: function(){
		return this.hasOwnProperty("errorText");
	},
	errorText: function(){
		return this.errorText;
	}
});
Template.uploader.created = function() {
	Errors = new Meteor.Collection(null);
};
Template.uploader.rendered = function() {
	pageSession.set ("mode", this.data.mode);
	pageSession.set ("filter", this.data.filetypefilter);
	pageSession.set ("sizelimit", this.data.sizelimit);




	Tracker.autorun(function() {
		var userId;
		userId = Meteor.userId();
		Meteor.subscribe('Data', userId);
		return $.cookie('X-Auth-Token', Accounts._storedLoginToken());
	});

	// This assigns a drag& drop + browse action to a DOM node
	Files.resumable.assignBrowse($(".fileBrowse"));//hidden
	Files.resumable.assignDrop($(".fileDrop"));
	//if it is a single upload mode, we remove the multiple attribute from our file input
	if (this.mode!="multiple"){
		$(".fileBrowse")[0].removeAttribute("multiple")
	}
	//here we deal with the file(s) added
	Files.resumable.on('filesAdded', function(filesToUpload) {


		var filter = pageSession.get("filter") //default: none
		var mode = pageSession.get("mode")  //default: single
		var sizelimit = pageSession.get("sizelimit") //default: unlimited


		//if the single mode is set & we have more than one file, we have an error
		if (mode !="multiple" && filesToUpload.length > 1)  {
			Errors.insert({"errorText":"You can only upload one file."});

		}
		else
		{
			//else we deal with the to-be-uploaded file(s), whatever the number of files we have
			filesToUpload.forEach (function (fileProcessed){


				//if a filter is set and the file does not match
				if (filter && !isFileTypeOk(fileProcessed.file.type, filter)){
					Errors.insert({"errorText":fileProcessed.file.name + " has not been added: only " + filter + " files are accepted."});
					return
				}
				//if a size Limit is set and the file is too big (sizelimit is in Mb, the size attribute is in bytes.)
				if (sizelimit && fileProcessed.size > sizelimit*1000000){
					Errors.insert({"errorText":fileProcessed.file.name + " is is too big ("+ numeral(fileProcessed.size).format('0.0b') +"). Maximum file size allowed is " + sizelimit + " MB."});
					return
				}
				//if everything is ok, we effectively add the file
				pageSession.set(fileProcessed.uniqueIdentifier, 0);
				return Files.insert({
					_id: fileProcessed.uniqueIdentifier,
					filename: fileProcessed.fileName,
					contentType: fileProcessed.file.type
					//callback function
				}, function(err, _id) {
					if (err) {
						console.warn("File creation failed!", err);
						return;
					}
					return Files.resumable.upload();
				});

			});
		}
	});
	Files.resumable.on('fileProgress', function(file) {
		return pageSession.set(file.uniqueIdentifier, Math.floor(100 * file.progress()));
	});
	Files.resumable.on('fileSuccess', function(file) {
		return pageSession.set(file.uniqueIdentifier, void 0);
	});
	return Files.resumable.on('fileError', function(file) {
		console.warn("Error uploading", file.uniqueIdentifier);
		return pageSession.set(file.uniqueIdentifier, void 0);
	});


};
