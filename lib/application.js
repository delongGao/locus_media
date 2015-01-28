Meteor.startup(function () {
    AccountsEntry.config({
    	signupCode: Meteor.settings.SIGNUP_CODE,
	    // logo: 'logo.png'                  // if set displays logo above sign-in options
	    // privacyUrl: '/privacy-policy'     // if set adds link to privacy policy and 'you agree to ...' on sign-up page
	    // termsUrl: '/terms-of-use'         // if set adds link to terms  'you agree to ...' on sign-up page
	    homeRoute: '/',                    // mandatory - path to redirect to after sign-out
	    dashboardRoute: '/',      // mandatory - path to redirect to after successful sign-in
	    // profileRoute: '/user/' + Meteor.userId(),
	    profileRoute: '/defaultUser',
	    passwordSignupFields: 'USERNAME_AND_EMAIL',
	    showSignupCode: true,
	    showOtherLoginServices: false,      // Set to false to hide oauth login buttons on the signin/signup pages. Useful if you are using something like accounts-meld or want to oauth for api access
	    extraSignUpFields: [
		    {             // Add extra signup fields on the signup page
	        field: "name",                           // The database property you want to store the data in
	        name: "Please enter you full name",  // An initial value for the field, if you want one
	        label: "Full Name",                      // The html lable for the field
	        placeholder: "John Doe",                 // A placeholder for the field
	        type: "text",                            // The type of field you want
	        required: true                           // Adds html 5 required property if true
		    },
		    {
		    	field: "intro",                           // The database property you want to store the data in
	        name: "Please enter a brief introduction",  // An initial value for the field, if you want one
	        label: "Introduction",                      // The html lable for the field
	        placeholder: "About yourself...",                 // A placeholder for the field
	        type: "text",                            // The type of field you want
	        required: true                           // Adds html 5 required property if true
		    }
		  ]
    });
});