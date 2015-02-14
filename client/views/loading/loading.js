Template.loading.rendered = function () {
	if ( ! Session.get('loadingSplash') ) {
	    this.loading = window.pleaseWait({
	    	logo: '/images/locus_spinner.gif',
	    	backgroundColor: '#fff',
	    	loadingHtml: message + spinner
	    });
    	Session.set('loadingSplash', true); // just show loading splash once
	}
};

Template.loading.destroyed = function () {
	if ( this.loading ) {
    	this.loading.finish();
	}
};

var message = '<p class="loading-message">Loading, please wait...</p>';
var spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';