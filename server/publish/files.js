
 Meteor.publish('Data', function(clientUserId) {
      if (this.userId === clientUserId) {
        return Files.find({
          'metadata._Resumable': {
            $exists: false
          },
          'metadata._auth.owner': this.userId
        });
      } else {
        return [];
      }
    });
