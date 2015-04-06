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
Posts.initEasySearch(['tags.general_tags', 'tags.cfx', 'tags.efx', 'tags.t', 'tags.s', 'tags.c'], {
	'limit': 10,
	'query': function(searchString, opts) {
		// console.log(searchString, opts);
		var default_fields = opts.fields;
		// change to get from UI
		var customized_field = $('#search_tag_type').val();
		var default_query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
		var customized_query = {
			"$or": []
		};
		if (customized_field !== 'all') {
			var temp_fields = default_query.$or;
			$.each(temp_fields, function(index, item) {
				if (item[customized_field]) {
					customized_query.$or.push(item);
				}
			});
			return customized_query;
		};
		return default_query;
	},
	'sort': function(searchString, opts) {
		return {createdAt:-1, 'tags.cfx':1};
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


// make tags it's own document
Tags = new Meteor.Collection("tags");
Tags.allow({
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

})();
