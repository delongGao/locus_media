Template.user.helpers({
	currUser: function(){
		return Meteor.users.findOne({_id: Meteor.userId()});
	},
	// userEmail: function() {
	// 	return this.emails[0].address;
	// },
	profiles: function() {
		var result = [
			{ "key": "email", "value" : this.emails[0].address },
			{ "key": "full_name", "value" : this.profile.name },
			{ "key" : "username", "value" : this.username }
		];
		return result;
	},
	ownedPosts: function() {
		return Posts.find({userId: Meteor.userId()});
	},
	likedPosts: function() {
		// "join" with likes to get associated records 
		var userLikes = Likes.find({userId: Meteor.userId()});
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
        S3.upload(files,"/" + Meteor.user().username,function(e,r){
        	console.log(r);
        	Meteor.users.update({_id: Meteor.userId()},{"$set" : {"profile.imageUrl": r.secure_url}}, function() {
        		$(tmpl.find("#file_bag")).hide();
        	});
        });
	}
});