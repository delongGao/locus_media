Template.user.helpers({
	currUser: function(){
		var uid = Router.current().params._id;
		return Meteor.users.findOne({_id: uid});
	},
	isCurrentUser: function() {
		return Meteor.userId() === this._id;
	},
	profiles: function() {
		var result = [
			{ "key": "full_name", "value" : this.profile.name },
			{ "key" : "username", "value" : this.username }
		];
		if (this._id === Meteor.userId()) {
			result.push({ "key": "email", "value" : this.emails[0].address });
		}

		return result;
	},
	ownedPosts: function() {
		return Posts.find({userId: this._id});
	},
	likedPosts: function() {
		// "join" with likes to get associated records 
		var userLikes = Likes.find({userId: this._id});
		var likedPostIds = userLikes.map(function(p) { return p.postId });
		return Posts.find({_id: {$in: likedPostIds}});
	}
});

Template.user.events({
	'click #change-profile-pic': function (evt, tmpl) {
		$(tmpl.find("#file_bag")).show();
	},
	'change #file_bag': function(evt, tmpl) {
		var files = $("#file_bag")[0].files
        var user = this;

		S3.upload(files,"/" + user.username,function(e,r){
        	console.log(r);
        	Meteor.users.update({_id: user._id},{"$set" : {"profile.imageUrl": r.secure_url}}, function() {
        		$(tmpl.find("#file_bag")).hide();
        	});
        });

        // S3.upload(files,"/" + Meteor.user().username,function(e,r){
        // 	console.log(r);
        // 	Meteor.users.update({_id: Meteor.userId()},{"$set" : {"profile.imageUrl": r.secure_url}}, function() {
        // 		$(tmpl.find("#file_bag")).hide();
        // 	});
        // });
	},
	'click .accordion': function(evt, tmpl) {
		$(evt.target).siblings('.accordion-body').toggle();
		$(evt.target).find('.fa-angle-double-down').toggle();
		$(evt.target).find('.fa-angle-double-up').toggle();
	}
});