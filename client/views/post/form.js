Template.form.events({
	'submit form': function (e,tmpl) {
		e.preventDefault();
		$(".error-message").empty();
		var cfx = $(tmpl.find("input[name=code]"));
		var efx = $(tmpl.find("input[name=english]"));

		var inputs = {
			// "Title" 								: titleField.val(),
			// "Text"	 								: textField.val(),
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
					userId 					: Meteor.userId(),
					imageUrl				: r.secure_url,
					createdAt				: new Date,
					deleted					: false
				}, function(err, recordId) {
					if (err) {
						console.log("error happened for posts");
					} else {
						console.log("posts passed");

						var tags = $('input.tags');
						var tagSuccess = true;
						// $.each(tags, function(index, tag) {
							tagSuccess = insertFunctionalTags(tags, recordId, tagSuccess);
						// });

						console.log(r);
						// reset form
						$(tmpl.find("form"))[0].reset();
						// todo manually reload page
						location.reload();
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

// update tags
function insertFunctionalTags(tagParams, postId, successFlag) {
	var value_obj = {};
	$(tagParams).each(function(key, item) {
		value_obj[$(item).attr("name")] = $(item).val();
	})

	Tags.insert({
		type 		: "functional",
		content : value_obj,
		userId 	: Meteor.userId(),
		postId 	: postId,
		deleted : false
	}, function(err) {
		if (err) {
			console.log("Error occured for tags: " + err.toString());
			return false;
		} else {
			console.log("Tags passed");
			return true;
		}
	})
}

// function insertTags(tagParams, postId, successFlag) {
// 	var tagDom = $(tagParams);

// 	Tags.insert({
// 		type 		: tagDom.attr("name"),
// 		content : tagDom.val(),
// 		userId 	: Meteor.userId(),
// 		postId 	: postId,
// 		deleted : false
// 	}, function(err) {
// 		if (err) {
// 			console.log("Error occured for tags: " + err.toString());
// 			return false;
// 		} else {
// 			console.log("Tags passed");
// 			return true;
// 		}
// 	})
// }

