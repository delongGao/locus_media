Template.tag.helpers({
    colorCode: function(type){
        if (type === "cfx"){
            return "blue";
        } else if (type === "efx"){
            return "red";
        } else if (type === "t"){
            return "teal";
        } else if (type === "s"){
            return "purple";
        } else if (type === "c"){
            return "green";
        }
    },

    tagtype: function(type){
        if (type === "cfx") {
            return "codetag";
        } else if (type === "efx") {
            return "engtag";
        } else if (type === "t") {
            return "temporaltag";
        } else if (type === "s") {
            return "geotag";
        } else if (type === "c") {
            return "comment";
        } else if (type === "general") {
            return "gentag";
        }
    },

    // get owner object for showing 
    owerObj: function() {
        // "this" is the tag object from post template
        return Users.findOne({ _id: this.owner_id });
    },

    isOwner: function() {
        return this.owner_id === Meteor.userId();
    }
});

Template.tag.events({
    // remove existing tag
    'click .tag-remove': function (evt) {
        var confirmation = confirm('Are you sure you want to delete?');
        if (confirmation === true) {
            Tags.update(this.tag_id, {$set: {deleted: true }});
        }
    },
});