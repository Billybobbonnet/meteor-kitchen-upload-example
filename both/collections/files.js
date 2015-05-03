
this.Files = new FileCollection('Files',
  { resumable: true,   // Enable built-in resumable.js upload support
    http: [
      { method: 'get',
        path: '/:md5',  // this will be at route "/gridfs/myFiles/:md5"
        lookup: function (params, query) {  // uses express style url params
          return { md5: params.md5 };       // a query mapping url to myFiles
        }
      }
    ]
  }
);
this.Files.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["user"]);
}

this.Files.userCanUpdate = function(userId, doc) {
  return Users.isInRoles(userId, ["user"]);
}

this.Files.userCanRemove = function(userId, doc) {
	return Users.isInRoles(userId, ["admin"]);

}
