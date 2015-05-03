
// Allow rules for security. Should look familiar!
 // Without these, no file writes would be allowed
 Files.allow({
   insert: function(userId, file) {
       var _ref;
       file.metadata = (_ref = file.metadata) != null ? _ref : {};
       file.metadata._auth = {
         owner: userId
       };
       return true;
     },
     remove: function(userId, file) {
       var _ref, _ref1;
       if (((_ref = file.metadata) != null ? (_ref1 = _ref._auth) != null ? _ref1.owner : void 0 : void 0) && userId !== file.metadata._auth.owner) {
         return false;
       }
       return true;
     },
     read: function(userId, file) {
       var _ref, _ref1;
       if (((_ref = file.metadata) != null ? (_ref1 = _ref._auth) != null ? _ref1.owner : void 0 : void 0) && userId !== file.metadata._auth.owner) {
         return false;
       }
       return true;
     },
     write: function(userId, file, fields) {
       var _ref, _ref1;
       if (((_ref = file.metadata) != null ? (_ref1 = _ref._auth) != null ? _ref1.owner : void 0 : void 0) && userId !== file.metadata._auth.owner) {
         return false;
       }
       return true;
     }
 });

