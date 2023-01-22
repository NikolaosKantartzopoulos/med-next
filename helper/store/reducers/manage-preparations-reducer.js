export function preparationsReducer(state, action) {
	switch (action.type) {
		case "resetAll":
			return preparationsSample;
		case "setTitle":
			return {
				...state,
				title: action.newTitleValue,
			};
		case "setDetails":
			return { ...state, details: action.newDetailsValue };
		case "setCommon":
			if (action.newValue == "true") {
				return { ...state, common: true };
			} else {
				return { ...state, common: false };
			}
		case "setItem":
			return {
				_id: action.item._id,
				title: action.item.title,
				details: action.item.details,
				common: action.item.common,
			};
	}
}

export const preparationsSample = {
	title: "",
	details: "",
	common: true,
};
