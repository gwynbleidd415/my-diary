// $(".nav .nav-link").on("click", function () {
// 	$(".nav").find(".active").removeClass("active");
// 	$(this).addClass("active");
// });

// document.getElementById("home").classList.add("active");
$(".switchsigres").on("click", () => {
	$(".form-register").toggle();
	$(".form-signin").toggle();
});

// $(document).ready(function () {
// 	$("form[name='regform']").validate({
// 		rules: {
// 			username: {
// 				minlength: 6,
// 				maxlength: 26,
// 			},
// 			// email: {
// 			// 	required: true,
// 			// 	// Specify that email should be validated
// 			// 	// by the built-in "email" rule
// 			// 	email: true,
// 			// },
// 			password: {
// 				minlength: 8,
// 				maxlength: 24,
// 			},
// 		},
// 		messages: {
// 			username: {
// 				minlength: "Your username must be at least 6 characters long",
// 				maxlength: "Your username must be at most 26 characters long",
// 			},
// 			password: {
// 				minlength: "Your password must be at least 5 characters long",
// 				maxlength: "Your password must be at most 26 characters long",
// 			},
// 			email: "Please enter a valid email address",
// 		},
// 		submitHandler: function (form) {
// 			form.submit();
// 		},
// 	});
// });

// $(document).ready(function () {
// 	$("form[name='regform']").bootstrapValidator({
// 		container: "#messages",
// 		feedbackIcons: {
// 			valid: "glyphicon glyphicon-ok",
// 			invalid: "glyphicon glyphicon-remove",
// 			validating: "glyphicon glyphicon-refresh",
// 		},
// 		fields: {
// 			username: {
// 				validators: {
// 					notEmpty: {
// 						message: "The UserName is required and cannot be empty",
// 					},
// 					stringLength: {
// 						max: 24,
// 						min: 6,
// 						message: "The username must be between 6 to 24 letters",
// 					},
// 				},
// 			},
// 			email: {
// 				validators: {
// 					notEmpty: {
// 						message: "The email address is required and cannot be empty",
// 					},
// 					emailAddress: {
// 						message: "The email address is not valid",
// 					},
// 				},
// 			},
// 			password: {
// 				validators: {
// 					notEmpty: {
// 						message: "The password is required and cannot be empty",
// 					},
// 					stringLength: {
// 						min: 8,
// 						max: 24,
// 						message: "The username must be between 6 to 24 letters",
// 					},
// 				},
// 			},
// 		},
// 	});
// });
