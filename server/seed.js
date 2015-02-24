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

	for (var i = 0; i <= 20; i++) {
		Posts.insert({
					"createdAt" : new Date,
					"deleted" : false,
					"imageUrl" : "/images/default.png",
					"tags" : {
						"c" : "this is comment",
						"cfx" : "2.1.3.Bii",
						"efx" : "Information",
						"general_tags" : ['general 1','general 2'],
						"s" : "Mars",
						"t" : i + " month"
					},
					"userId" : user
				});
	};
}