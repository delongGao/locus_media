Template.menu.rendered = function(){
  this.$('#userUploadNew').click(function(){
  	$('#uploadDimmer').dimmer('show');
    $('#uploadDimmer #file_bag').click();
  });

  this.$('#goSearch').popup({
    popup: $('.custom.popup'),
    on: 'click'
  })
}

// Template.menu.events({
//   'click #goSearch': function () {
//     $('')
// });