Template.post.helpers({
	selectedPost: function(){
		return Posts.findOne({_id: Session.get('selectedPostId')});
	},
	tagObjects: function () {
    	var post_id = this._id;
        var tagsArray = [];
    	// var tmp_tags = this.tags;
    	// delete tmp_tags["general_tags"];
    	// var special_tags = {};
    	// for (var key in this.tags) {
    	// 	if (key !== 'general_tags') {
    	// 		special_tags[key] = this.tags[key]; 
    	// 	};
    	// };

    	var post_tags = Tags.find({postId: post_id}).fetch();

    	$.each(post_tags, function(key,value) {
    		tagsArray.push({
                tag_id  : value._id,
                type    : value.type,
                tag     : value.content,
                post_id : post_id,
                owner_id: value.userId
            });
    	});

    	return tagsArray;
    	// return _.map(this.tags.general_tags || [], function (tag) {
	    //     return {post_id: post_id, tag: tag};
	    // });
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
	},
	createrMetaInfo: function() {
		var result = {
			"createdBy": Meteor.users.findOne({_id: this.userId}).profile.name,
			// TODO: has some problem, not finished
			// "createdAt": this.createdAt,
			"creatorId": this.userId,
			"createdAt": this.createdAt ? this.createdAt.toDateString() : ''
		};
		return result;
	},
});

Template.post.events({
	// add new tag
	'click .dropdown-control': function(evt, tmpl) {
		$(evt.target).parents(".teal").siblings("input").val('');
		var selected_type = $(evt.target).attr("value");
		$(evt.target).parent(".menu").siblings("#tag-type-selector").attr("data-tag-type",selected_type);
	},
    'click .addComment': function (evt, tmpl) {
        var value = $(evt.target).siblings('input').val();
        var tagType = $(evt.target).siblings(".tagselect").find("#tag-type-selector").attr("data-tag-type");
        if (value.length > 0 && tagType.length > 0) {
            Tags.insert({
                type    : tagType,
                content : value,
                userId  : Meteor.userId(),
                postId  : this._id, 
                deleted : false 
            }, function(err) {
                if (err) {
                    console.log("Error occured for tags: " + err.toString());
                    return false;
                } else {
                    console.log("Tags passed");
                    return true;
                }
            });
            
            $(evt.target).siblings("input").val("");
        } else {
            alert("Tag cannot be empty!");
        }
    },
    // remove existing post
    'click .post-remove': function(evt, tmpl) {
        var confirmation = confirm('Are you sure you want to delete?');
        if (confirmation == true) {
            Posts.update(this._id, {$set: {deleted: true }});  
        }
    } 
});


Template.post.rendered = function(){
  this.$('.ui.dropdown')
	  .dropdown({
	    action: 'activate'
	  });
}

