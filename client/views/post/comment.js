Template.comment.helpers({
  // get owner object for showing 
  owerObj: function() {
    // "this" is the tag object from post template
    return Users.findOne({ _id: this.owner_id });
  },

  isOwner: function() {
    return this.owner_id === Meteor.userId();
  },

  isFunctionalTag: function(tag) {
    return tag["code"] && tag["english"];
  },

  contentFormater: function(tag, key) {
    if (key) {
      return tag[key];
    } else {
      return tag;
    }
  }
});