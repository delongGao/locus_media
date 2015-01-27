Template.posts.helpers({
	allPosts: function() {
		return Posts.find();
	}
	// posts: function () {
 //    return Posts.find({}, { sort: { title: 1 }, limit: Session.get('postLimit') });
 //  }
});

var getPosts = function (count) {
  // Set extra as the number of additional elements to load on each callback;
  var extra = 20;
  Session.set('postLimit', count + 20)

  // IMPORTANT: always call after you add any data to your scrollview
  Session.set('isLoading', false);
}