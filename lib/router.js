Router.route('/', function () {
  	this.render('index', {
  		data: function () { return Posts.find(); }
  	});
});

Router.map(function () {
	this.route('user', {
	    path: '/user/:_id',
	    data: function () {
	    	var uid = this.params._id;
	    	return Meteor.users.findOne(uid);
	    },
	    action: function () {
	    	this.render();
	    }
	});

	// TODO: this is a work-around for the account-entry package, 
	// should have a better way of handling this
	this.route('defaultUser', {
	    path: '/defaultUser',
	    data: function () {
	    	return Meteor.user();
	    },
	    action: function () {
	    	this.render();
	    }
	});

});
