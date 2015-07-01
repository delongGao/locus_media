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

        // new structure
        var types_arr = Meteor.settings.public.TAG_TYPES;
        $.each(types_arr, function(key, tag_type) { 
            temp_obj = {};
            temp_obj["type"] = tag_type;
            temp_obj["tags"] = post_tags.filter(function(raw_tag){
                return raw_tag.type === tag_type;
            }).map(function(filtered_tag) {
                return {
                    tag_id  : filtered_tag._id,
                    type    : filtered_tag.type,
                    tag     : filtered_tag.content,
                    post_id : post_id,
                    owner_id: filtered_tag.userId
                };
            });
            tagsArray.push(temp_obj);
        });


        // =========== Comment out old implementation
    	// $.each(post_tags, function(key,value) {
    	// 	tagsArray.push({
     //            tag_id  : value._id,
     //            type    : value.type,
     //            tag     : value.content,
     //            post_id : post_id,
     //            owner_id: value.userId
     //        });
    	// });

        return tagsArray;
        // ============ comment out old return
    	// return tagsArray;
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
        // show input field based on tag type
        if (selected_type === "functional") {
            $(evt.target).parents(".tagselect").siblings("#normal_input").hide();
            $(evt.target).parents(".tagselect").siblings(".functional_input").show();
        } else {
            $(evt.target).parents(".tagselect").siblings(".functional_input").hide();
            $(evt.target).parents(".tagselect").siblings("#normal_input").show();
        }
	},
    'click .addComment': function (evt, tmpl) {
        var tagType = $(evt.target).siblings(".tagselect").find("#tag-type-selector").attr("data-tag-type");
        var value = tagType === "functional" ? {} : $(evt.target).siblings('#normal_input').val();

        if (tagType === "functional") {
            $(evt.target).siblings('.functional_input').each(function(key,item) {
                value[$(item).attr("id")] = $(item).val();
            });
        }

        // empty checks
        if (((value["code"] && value["english"]) || value.length) && tagType.length > 0) {
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

