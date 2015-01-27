Template.post.helpers({
	selectedPost: function(){
		return Posts.findOne({_id: Session.get('selectedPostId')});
	},
	tagObjects: function () {
    	// var post_id = this._id;
    	// var tmp_tags = this.tags;
    	// delete tmp_tags["general_tags"];
    	var special_tags = {};
    	for (var key in this.tags) {
    		if (key !== 'general_tags') {
    			special_tags[key] = this.tags[key]; 
    		};
    	};
    	var general_tags = this.tags.general_tags;

    	var tagsArray = $.map(special_tags, function(key,value) { return {type: value, tag: key}; } ); 
    	// $.each(general_tags, function(key,value) {
    	// 	tagsArray.push({type: 'general tag', tag: value});
    	// });

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
			"creatorId": this.userId
		};
		return result;
	}
});

Template.post.events({
	// add new tag
	'change #tag-type-selector': function(evt, tmpl) {
		$(evt.target).siblings('#edittag-input').prop('disabled', false);
	},
    'click .fa-plus': function (evt, tmpl) {
    	var value = $(evt.target).siblings("input").val();
    	var tagType = $(evt.target).siblings('#tag-type-selector').val();
	    if (value.length > 0 && tagType.length > 0) {
	    	// add general tags
	    	if (tagType === 'general') {
	    		Posts.update(this._id, {$addToSet: {'tags.general_tags': value}});	
	    	} 
	    	// add t,s,c tags
	    	else {
	    		var temp_tag_obj = {};
	    		temp_tag_obj['tags.' + tagType] = value;
	    		Posts.update(this._id, {$set: temp_tag_obj});		
	    	}
	    	
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