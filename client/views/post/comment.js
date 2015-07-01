Template.comment.helpers({
  // get owner object for showing 
  owerObj: function() {
    // "this" is the tag object from post template
    return Users.findOne({ _id: this.owner_id });
  },

  isOwner: function() {
    return this.owner_id === Meteor.userId();
  },

  contentFormater: function(tag) {
    if (typeof tag === "object") {
      return tag["code"] + " | " + tag["english"];
    } else {
      return tag;
    }
  }
});