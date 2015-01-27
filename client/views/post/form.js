Template.form.events({
	'submit form': function (e,tmpl) {
		e.preventDefault();
		$(".error-message").empty();
		var titleField = $(tmpl.find("input[name=title]"));
		var textField = $(tmpl.find("input[name=text]"));
		var cfx = $(tmpl.find("input[name=cfx]"));
		var efx = $(tmpl.find("input[name=efx]"));
		// var t 	= $(tmpl.find("input[name=t]"));
		// var s 	= $(tmpl.find("input[name=s]"));
		// var c 	= $(tmpl.find("input[name=c]"));

		var inputs = {
			"Title" 								: titleField.val(),
			"Text"	 								: textField.val(),
			"Code Function Tag" 		: cfx.val(),
			"English Function Tag" 	: efx.val(),
			// "Temporal Tag" 					: t.val(),
			// "Spacial Tag"						: s.val(),
			// "Comment Tag"						: c.val()
		};

		var validated = FormValidator.validate_as_hash(inputs);
		if (validated["pass_or_not"]) {
			// upload image to S3
			var files = $("#file_bag")[0].files
	        S3.upload(files,"/" + Meteor.user().username,function(e,r){
	            // if upload successful, save post
	            // insert if validation passed
				Posts.insert({
					title 					: titleField.val(),
					text 					: textField.val(),
					tags					: 	{
													cfx 								: cfx.val(),
													efx  								: efx.val(),
													t 									: '',
													s 									: '',
													c 									: '',
													general_tags				:[]
												},
					userId 					: Meteor.userId(),
					imageUrl				: r.secure_url,
					createdAt				: new Date
				}, function(err) {
					if (err) {
						console.log("error happened");
					} else {
						console.log("passed");
						console.log(r);
						// reset form
						$(tmpl.find("form"))[0].reset();
					}
				});
	        });
		} else {
			$.each(validated["details"], function(key,value) {
				if (!value) {
					var err_item = $("<li>");
					err_item.append(key + " is required, please fix!");
					err_item.appendTo($(".error-message"));
				}
			});
			console.log("not pass");
		}
	}, 

	// 'change #tag-type-selector': function(evt, tmpl) {
	// 	// $('input.tags').hide();
	// 	var tag_target = $(evt.target).val();
	// 	var input_to_show = $("input[name=" + tag_target + "]");
	// 	input_to_show.show();
	// }

	// 'click #new-tag': function(e,tmpl) {
	// 	e.preventDefault();
	// 	var copy_input = $(tmpl.find(".new-general-tag")).clone();
	// 	$(".tags-section").append(copy_input);
	// 	$(tmpl.find(".new-general-tag"))[0].show();
	// }
});

Template.form.helpers({
	"files": function(){
    return S3.collection.find();
  }
});

