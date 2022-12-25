export default function manageUsersReducer(state, action) {
	switch (action.type) {
		case "resetAll":
			return {
				userEmail: "",
				userEmaiLBuffer: "",
				userName: "",
				userPassword: "",
				userPasswordBuffer: "",
				userPosition: "",
				userPosition2: "",
			};
		case "setUsername":
			return {
				...state,
				userName: action.newUsernameValue,
			};
		case "setEmail":
			return {
				...state,
				userEmail: action.newEmailValue,
			};
		case "setPassword":
			return {
				...state,
				userPassword: action.newPasswordValue,
			};
		case "setUserPosition":
			console.log(action.newUserPositionValue);
			return {
				...state,
				userPosition: action.newUserPositionValue,
			};
	}
}
