var searchInstance = EasySearch.getComponentInstance(
	{ index : 'posts' }
);

Template.index.events({
	'click #show-search': function (evt, tmpl) {
		$(tmpl.find("#searchable-area")).show();
	},
	// 'keypress #search-input': function(evt,tmpl) {
	// 	var total = $('.post').length;
	// 	console.log(total);
	// 	$('#results-count').html(total);
	// }
});