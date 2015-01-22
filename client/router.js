Router.route('/', function () {
  	this.render('index', {
  		data: function () { return Posts.find(); }
  	});
});

Router.map(function () {
	this.route('user', {
	    path: '/user',
	    // onBeforeAction: function () {
		   //  this.userHandle = Meteor.subscribe('user', this.params._id);

		   //  if (this.ready()) {
		   //      // Handle for launch screen defined in app-body.js
		   //      dataReadyHold.release();
		   //  }
	    // },
	    data: function () {
	    	return Meteor.users.findOne(Meteor.userId());
	    },
	    action: function () {
	    	this.render();
	    }
	});
});

// Router.route('/user/:_id', function () {
//   	this.render('User');
// });