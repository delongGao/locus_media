Template.like.helpers({
	isLiked: function (postId) {
		var likeRecord = Likes.find({ userId: Meteor.userId(), postId: postId});
		if (likeRecord.count() > 0) {
			return "fa-heart";
		} else {
			return "fa-heart-o";
		}
	}, 
	printLikeId: function(postId) {
		var likeRecord = Likes.find({ userId: Meteor.userId(), postId: postId});
		if (likeRecord.count() > 0) {
			return likeRecord.fetch()[0]._id;
		} else {
			return "";
		}
	}
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
				createdAt: new Date().valueOf()
			}, function() {
				likeIcon.removeClass( "fa-heart-o" ).addClass( "fa-heart" );
			});
		}
	}
});