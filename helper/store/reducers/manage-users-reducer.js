export default function manageUsersReducer(state, action) {
	switch (action.type) {
		case "resetAll":
			return {
				userEmail: "",
				userEmaiLBuffer: "",
				userName: "",
				userNameBuffer: "",
				userId: "",
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
		case "setUsernameBuffer":
			return {
				...state,
				userName: action.newUsernameBufferValue,
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
			return {
				...state,
				userPosition: action.newUserPositionValue,
				userPosition2: null,
			};
		case "setUserPosition2":
			return {
				...state,
				userPosition2: action.newUserPosition2Value,
			};
		case "setThisUserForEdit":
			return {
				...state,
				userId: action._id,
				userEmail: action.email,
				userName: action.username,
				userNameBuffer: action.userNameBuffer,
				userPassword: action.password,
				userPosition: action.position,
				userPosition2: action.position2,
			};
	}
}
