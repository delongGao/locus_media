Template.user.helpers({
	currUser: function(){
		return Meteor.users.findOne({_id: Meteor.userId()});
	},
	userEmail: function() {
		return this.emails[0].address;
	},
	ownedPosts: function() {
		return Posts.find({userId: Meteor.userId()})
	}
});