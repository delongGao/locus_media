Template.like.helpers({
	isLiked: function (postId) {
		var likeRecord = userLikePost(Meteor.userId(), postId);
		if (likeRecord.like_or_not) {
			return "";
		} else {
			return "empty";
		}
	}, 
	printLikeId: function(postId) {
		var likeRecord = userLikePost(Meteor.userId(), postId);
		if (likeRecord.like_or_not) {
			return likeRecord.like_id;
		} else {
			return "";
		}
	},
	shownLiker: function(postId) {
		// display the default user for a post like
		var numLikes = Likes.find({postId:postId}).count();
		var likeRecord = userLikePost(Meteor.userId(), postId);
		if (numLikes == 0) {
			// no one likes the post
			return "0 people";
		} else if (likeRecord.like_or_not) {
			return "You and " + (numLikes - 1) + " others " ;
		} else {
			var lastLike = Likes.find({postId:postId},{sort: {createdAt: -1}, limit: 1}).fetch()[0];
			var lastLiker = Meteor.users.findOne({_id: lastLike.userId});
			return lastLiker.profile.name + " and " + (numLikes - 1) + " others " ;
		}
	}
	// numLikes: function(postId) {
	// 	return 
	// }
});

Template.like.events({
	'click .like-toggle': function (evt, tmpl) {

		var likeIcon = $(tmpl.find(".like-toggle"));

		var isLiked = likeIcon.hasClass("empty") ? false : true;

    console.log(isLiked);
		// based on whether is liked or not, remove or add record into the Likes collection
		if (isLiked) {
			var likeId = likeIcon.attr("data-likeId");
			Likes.remove({
				_id: likeId
			}, function() {
				likeIcon.toggleClass( "empty" );
				likeIcon.attr("data-likeId", "");
			});
		} else {
			Likes.insert({
				userId: Meteor.userId(), 
				postId: this.postId,
				createdAt: new Date()
			}, function() {
				likeIcon.toggleClass( "empty" );
			});
		}
	}
});

function userLikePost(userId, postId) {
	var likeRecord = Likes.find({ userId: userId, postId: postId});
	var result = {
		"like_or_not": likeRecord.count() > 0,
		"like_id" : likeRecord.count() > 0 ? likeRecord.fetch()[0]._id : null
	}
	return result;
}