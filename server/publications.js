Meteor.publish('posts', function() {
	return Posts.find();
});

// Meteor.publish("posts", limit, function () {
//   return Posts.find({}, { sort: { title: 1 }, limit: limit });
// });

Meteor.publish('likes', function() {
	return Likes.find();
});

Meteor.publish('users', function() {
	return Users.find();
});