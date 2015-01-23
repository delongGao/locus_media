Posts = new Meteor.Collection("posts");
Posts.allow({
	insert: function () {
		return true;
	},
	update: function () {
		return true;
	},
	remove: function () {
		return true;
	}
});

Likes = new Meteor.Collection("likes");
Likes.allow({
	insert: function () {
		return true;
	},
	update: function () {
		return true;
	},
	remove: function () {
		return true;
	}
});

Posts.after.remove(function (userId, doc) {
	// TODO: right now, after removing a post, its like information will still be in the db, but it doesn't cause problems now
	// because all the like information is retrieved using both post and user information, if post is deleted, its like information 
	// can never be retrieved.
	
	// console.log(userId, doc);
	// Likes.remove({postId:doc._id});
});