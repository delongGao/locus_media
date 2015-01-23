Meteor.publish('posts', function() {
	return Posts.find();
});

Meteor.publish('likes', function() {
	return Likes.find();
});