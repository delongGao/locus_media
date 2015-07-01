if (Posts.find().count() === 0 && Users.find().count() === 0) {
	// seed user
	var user = Users.insert({
		"createdAt" : new Date,
		"emails" : [
			{
				"address" : "test@locus.co",
				"verified" : false
			}
		],
		"profile" : {
			"name" : "Test User",
			"intro" : "Default User"
		},
		"services" : {
			"password" : {
				"bcrypt" : "$2a$10$XKgl/Zx1G7VA8zu30kuKj.y7204dMis9NxJ3w3opNBpoik4asIGtS"
			},
			"resume" : {
				"loginTokens" : [ ]
			}
		},
		"username" : "testUser"
	});

	for (var i = 0; i <= 5; i++) {
		var post_id = Posts.insert({
					"createdAt" : new Date,
					"deleted" : false,
					"imageUrl" : "/images/default.png",
					"userId" : user
				});

		// create tags for this post
		// $.each(['cfx','efx'], function(index,type) {
		// var seed_tag_types = ['cfx','efx'];
		var seed_tag_type = 'functional';
		Tags.insert({
			"type"		: seed_tag_type,
			// "content" 	: type === 'cfx' ? '2.1.3.Bii' : 'Information',
			"content" : {"code": '2.1.3.Bii', "english": 'Information'}, 
			"userId"	: user,
			"postId"	: post_id,
			deleted 	: false 
		})
		// for (var j = 0; j < seed_tag_types.length; j++) {
		// 	var type = seed_tag_types[j];
		// 	Tags.insert({
		// 		"type"		: type,
		// 		// "content" 	: type === 'cfx' ? '2.1.3.Bii' : 'Information',
		// 		"content" : {"code": '2.1.3.Bii', "english": 'Information'}, 
		// 		"userId"	: user,
		// 		"postId"	: post_id,
		// 		deleted 	: false 
		// 	})
		// };
	};
}