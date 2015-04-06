// Meteor.subscribe('posts');
Session.setDefault('postsLimit', Meteor.settings.public.ITEMS_INCREMENT);
Deps.autorun(function() {
		Meteor.subscribe('posts', Session.get('postsLimit'));
});

Meteor.subscribe('likes');
Meteor.subscribe('users');
Meteor.subscribe('tags');