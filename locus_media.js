// if (Meteor.isClient) {
//   	Template.form.events({
// 		"submit form": function(e, tmpl) {
// 			e.preventDefault();

// 			var fileInput = tmpl.find('input[type=file]');

// 			var form = e.currentTarget;

// 			var file;

// 			for (var i = 0; i < fileInput.files.length; i++) {
// 				file = fileInput.files[i];
// 				MeteorFile.read(file, function(err, meteorFile) {
// 					Meteor.call("uploadFile", meteorFile, function(err) {
// 						if (err) {
// 							throw err;
// 						} else {
// 							form.reset();
// 						}
// 					});
// 				});
// 			}
// 		}
//   	});

//   	
// }

// if (Meteor.isServer) {
//   	Meteor.methods({
//   		uploadFile: function(file) {
//   			file.save("/Users/delong-tyemill/Documents/Projects/meteor/locus_media/temp/");
//   		}
//   	});
// }
