(function(){Posts = new Meteor.Collection("posts");
Posts.allow({
	insert: function () {
		return true;
	},
	update: function () {
		return true;
	},
	remove: function () {
		return true;
	}
});
// allow search on posts
Posts.initEasySearch(['title', 'tags.general_tags', 'tags.cfx', 'tags.efx', 'tags.t', 'tags.s', 'tags.c'], {
	'limit': 10,
	'query': function(searchString, opts) {
		// console.log(searchString, opts);
		var default_fields = opts.fields;
		// change to get from UI
		var customized_field = 'tags.cfx';
		var default_query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
		var customized_query = {
			"$or": []
		};
		if (customized_field) {
			var temp_fields = default_query.$or;
			$.each(temp_fields, function(index, item) {
				if (item[customized_field]) {
					customized_query.$or.push(item);
				}
			});
			return customized_query;
		};
		return default_query;
	}
});

Likes = new Meteor.Collection("likes");
Likes.allow({
	insert: function () {
		return true;
	},
	update: function () {
		return true;
	},
	remove: function () {
		return true;
	}
});

Posts.after.remove(function (userId, doc) {
	// TODO: right now, after removing a post, its like information will still be in the db, but it doesn't cause problems now
	// because all the like information is retrieved using both post and user information, if post is deleted, its like information 
	// can never be retrieved.
	
	console.log(userId, doc);
	// Likes.remove({postId:doc._id});
});

Users = Meteor.users;

})();
