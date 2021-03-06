Template.post.helpers({
	selectedPost: function(){
		return Posts.findOne({_id: Session.get('selectedPostId')});
	},
	tagObjects: function () {
    	var post_id = this._id;
    	// var tmp_tags = this.tags;
    	// delete tmp_tags["general_tags"];
    	var special_tags = {};
    	for (var key in this.tags) {
    		if (key !== 'general_tags') {
    			special_tags[key] = this.tags[key]; 
    		};
    	};
    	var general_tags = this.tags.general_tags;

    	var tagsArray = $.map(special_tags, function(key,value) { return {type: value, tag: key, post_id: post_id}; } ); 
    	$.each(general_tags, function(key,value) {
    		tagsArray.push({type: 'general tag', tag: value, post_id: post_id});
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
    if (type === "cfx"){
      return "codetag";
    } else if (type === "efx"){
        return "engtag";
    } else if (type === "t"){
      return "temporaltag";
    } else if (type === "s"){
      return "geotag";
    } else if (type === "c"){
      return "comment";
    }
  }
});

Template.post.events({
	// add new tag

	// 'change #tag-type-selector': function(evt, tmpl) {
	// 	$(evt.target).siblings('#edittag-input').prop('disabled', false);
	// },
	'click .dropdown-control': function(evt, tmpl) {
		$(evt.target).parents(".teal").siblings("input").val('');
		var selected_type = $(evt.target).attr("value");
		$(evt.target).parent(".menu").siblings("#tag-type-selector").attr("data-tag-type",selected_type);
	},
    'click .addComment': function (evt, tmpl) {

    	// var value = $(evt.target).siblings("input").val();
    	var value = $(evt.target).siblings('input').val();
    	// var tagType = $(evt.target).siblings('#tag-type-selector').val();
    	var tagType = $(evt.target).siblings(".tagselect").find("#tag-type-selector").attr("data-tag-type");
      console.log(tagType);
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
    	var tagType = $(evt.target).parent(".tag").attr("data-tag-type");
    	if (tagType === "general tag") {
    		Posts.update({_id: this.post_id}, {$pull: {'tags.general_tags': this.tag}});	
    	} else {
    		var tmpTagObj = {};
    		tmpTagObj["tags." + tagType] = '';
    		Posts.update(this.post_id, {$set: tmpTagObj});	
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

