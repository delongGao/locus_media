Template.post.helpers({
	selectedPost: function(){
		return Posts.findOne({_id: Session.get('selectedPostId')});
	},
	tagObjects: function () {
    	var post_id = this._id;
    	return _.map(this.tags.general_tags || [], function (tag) {
	        return {post_id: post_id, tag: tag};
	    });
	},
	isOwner: function() {
		if (this.userId == Meteor.userId()) {
			return "shown";
		} else {
			return "hidden";
		}
	},
	imageUrl: function() {
		return this.imageUrl;
	}
});

Template.post.events({
	// add new tag
    'click .fa-plus': function (evt, tmpl) {
    	var value = $(evt.target).siblings("input").val();
	    if (value.length > 0) {
	    	Posts.update(this._id, {$addToSet: {'tags.general_tags': value}});
	        $(evt.target).siblings("input").val("");
	    } else {
	    	console.log("Tag cannot be empty!");
	    }
    },
    // remove existing tag
    'click .tag-remove': function (evt) {
        Posts.update({_id: this.post_id}, {$pull: {'tags.general_tags': this.tag}});
    },
    // remove existing post
    'click .post-remove': function(evt, tmpl) {
    	Posts.remove({_id: this._id});
    } 
});