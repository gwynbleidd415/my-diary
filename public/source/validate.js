jQuery.validator.setDefaults({
	errorElement: "span",
	errorPlacement: function (error, element) {
		error.addClass("invalid-feedback");
		element.closest(".form-groupp").append(error);
	},
	highlight: function (element, errorClass, validClass) {
		$(element).addClass("is-invalid");
	},
	unhighlight: function (element, errorClass, validClass) {
		$(element).removeClass("is-invalid");
		$(element).addClass("is-valid");
	},
});
$.validator.addMethod(
	"regexPass",
	function (value, element, regexpr) {
		return regexpr.test(value);
	},
	"Please enter a valid pasword."
);

$(document).ready(function () {
	$("form[name='regform']").validate({
		rules: {
			username: {
				required: true,
				minlength: 6,
				maxlength: 24,
			},
			email: {
				required: true,
				email: true,
			},
			inputPassword: {
				required: true,
				minlength: 8,
				maxlength: 24,
				regexPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!\s)(?=.{8,24})/,
			},
		},
		messages: {
			username: {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 6 characters",
				maxlength: "Your username must consist of at most 24 characters",
			},
			email: "Please enter a valid email address",
			inputPassword: {
				required: "Please provide a password",
				minlength: "Your password must be at least 8 characters long",
				maxlength: "Your password must consist of at most 24 characters",
				regexPass:
					"Password must contain each of lowercase & uppercase characters and numbers",
			},
		},
	});
});
