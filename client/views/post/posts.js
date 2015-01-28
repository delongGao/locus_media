// Template.posts.helpers({
// 	allPosts: function() {
// 		return Posts.find();
// 	}
// });

// var getPosts = function (count) {
//   // Set extra as the number of additional elements to load on each callback;
//   var extra = 20;
//   Session.set('postLimit', count + 20)

//   // IMPORTANT: always call after you add any data to your scrollview
//   Session.set('isLoading', false);
// }

Template.posts.helpers({
	allPosts: function() {
		return Posts.find();
	},
	moreResults: function() {
		// If, once the subscription is ready, we have less rows than we
	    // asked for, we've got all the rows in the collection.
	    return !(Posts.find().count() < Session.get("postsLimit"));
	}
});

// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
    var threshold, target = $("#showMoreResults");
    if (!target.length) return;
 
    threshold = $(window).scrollTop() + $(window).height() - target.height();
 
    if (target.offset().top < threshold) {
        if (!target.data("visible")) {
            // console.log("target became visible (inside viewable area)");
            target.data("visible", true);
            Session.set("postsLimit", Session.get("postsLimit") + Meteor.settings.public.ITEMS_INCREMENT);
        }
    } else {
        if (target.data("visible")) {
            // console.log("target became invisible (below viewable arae)");
            target.data("visible", false);
        }
    }        
}
 
// run the above func every time the user scrolls
$(window).scroll(showMoreVisible);