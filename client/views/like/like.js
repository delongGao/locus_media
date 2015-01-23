Template.like.helpers({
	isLiked: function (postId) {
		var likeRecord = userLikePost(Meteor.userId(), postId);
		if (likeRecord.like_or_not) {
			return "fa-heart";
		} else {
			return "fa-heart-o";
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
			return "";
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

		var isLiked = likeIcon.hasClass("fa-heart") ? true : false;
		// based on whether is liked or not, remove or add record into the Likes collection
		if (isLiked) {
			var likeId = likeIcon.attr("data-likeId");
			Likes.remove({
				_id: likeId
			}, function() {
				likeIcon.removeClass( "fa-heart" ).addClass( "fa-heart-o" );
				likeIcon.attr("data-likeId", "");
			});
		} else {
			Likes.insert({
				userId: Meteor.userId(), 
				postId: this.postId,
				createdAt: new Date()
			}, function() {
				likeIcon.removeClass( "fa-heart-o" ).addClass( "fa-heart" );
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