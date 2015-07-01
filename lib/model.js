(function(){
	Posts = new Meteor.Collection("posts");
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
	var ALLOWED_TAG_TYPES = ['general', 'functional_code', 'functional_english', 'temporal', 'spacial', 'comment'];
	// tag search init
	Tags.initEasySearch(['content', 'content.code', 'content.english'], {
		'limit': 10,
		'returnFields': ['_id', 'postId'],
		'query': function(searchString, opts) {
			var tagType = $('#search_tag_type').val();
			// default query will always has only one "or" field
			var default_query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
			var processed_query = {
				"$and": null
			};
			// if tagType is one of the specific types, do some scoping
			if (ALLOWED_TAG_TYPES.indexOf(tagType) > -1) {
				// for functional tags, use functional,
				// process default query to only use on the selected field of functional tag
				if (tagType.indexOf('functional') > -1) {
					var field = tagType.split('_')[1];
					tagType = 'functional';
					default_query.$or = default_query.$or.filter(function(query) {
						return query["content."+field];
					})
				} else {
				// for other queries use content instead
					default_query.$or = default_query.$or.filter(function(query) {
						return query["content"];
					})
				}

				// processed_query.$and = default_query.$or;
				processed_query.$and = [default_query];
				processed_query.$and.push({ type: { $options: "i", $regex: tagType }});
				return processed_query;
			} else {
				return default_query;
			}
		},
		'sort': function(searchString, opts) {
			return {createdAt:-1, 'cfx':1};
		},
		'changeResults': function(results) {
			// map tag to its post
			// remove duplicated ids
			var processed_post_ids = $.unique( $.map(results.results, function(tag) { return tag.postId; }) );
			results.results = $.map(processed_post_ids, function(post_id) { return Posts.findOne({_id: post_id}); });
			return results;
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
