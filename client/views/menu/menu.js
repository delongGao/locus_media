Template.menu.rendered = function(){
  this.$('#userUploadNew').click(function(){
  	$('#uploadDimmer').dimmer('show');
  });

  this.$('#goSearch')
  .popup({
    inline   : true,
    position : 'bottom left',
  });
}