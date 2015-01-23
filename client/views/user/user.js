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