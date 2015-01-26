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
});

// Router.route('/user/:_id', function () {
//   	this.render('User');
// });