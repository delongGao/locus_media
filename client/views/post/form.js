Template.form.events({
	'submit form': function (e,tmpl) {
		e.preventDefault();
		$(".error-message").empty();
		var titleField = $(tmpl.find("input[name=title]"));
		var textField = $(tmpl.find("textarea[name=text]"));
		var locus_tag = $(tmpl.find("input[name=locus_tag]"));
		var locus_literal_tag = $(tmpl.find("input[name=locus_literal_tag]"));

		var inputs = {
			"Title" : titleField.val(),
			"Text" : textField.val(),
			"Locus Tag" : locus_tag.val(),
			"Locus Literal Tag" : locus_literal_tag.val()
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
													locus_tag 			: locus_tag.val(),
													locus_literal_tag  	: locus_literal_tag.val(),
													general_tags		:[]
												},
					userId 					: Meteor.userId(),
					imageUrl				: r.secure_url
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
	}

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

