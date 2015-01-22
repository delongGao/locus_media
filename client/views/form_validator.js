FormValidator = (function() {
	return {
		validate_as_hash: function(inputs) {
			result = {
				"pass_or_not": true,
				"details": {}
			};

			$.each(inputs, function(key, value) {
				// right now, only validate presence
				if (!validatePresence(value) && result["pass_or_not"]) {
					result["pass_or_not"] = false
				}
				result["details"][key] = validatePresence(value);
			});
			return result;
		}
	};

	// Private: validation whether form input is empty
	// Input: input - should be a string type
	// Returns: true - value exists
	// 			false - value doesn't exist
	// Example: validatePresence(textField.val())

	function validatePresence(input) {
		return input.length > 0;
	};
})();