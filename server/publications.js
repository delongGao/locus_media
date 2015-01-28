// Meteor.publish('posts', function() {
// 	return Posts.find({deleted: false});
// });

Meteor.publish('posts', function(limit) {
  return Posts.find({deleted: false}, { limit: limit, sort: {createdAt: -1} });
});

Meteor.publish('likes', function() {
	return Likes.find();
});

Meteor.publish('users', function() {
	return Users.find();
});