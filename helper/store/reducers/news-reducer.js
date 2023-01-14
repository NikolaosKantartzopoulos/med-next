export const initialNewsState = {
	dateCreated: new Date(),
	featured: false,
	tags: [],
	text: "",
	title: "",
	userID: "",
	username: "",
};

export function newsReducer(state, action) {
	switch (action.type) {
		case "resetAll":
			return { ...initialNewsState };
		case "setTitle":
			return { ...state, title: action.newTitle };
		case "setText":
			return { ...state, text: action.newText };
		case "toggleFeatured":
			return { ...state, featured: action.newFeaturedValue };
		case "setDate":
			return { ...state, dateCreated: action.newDate };
		case "addTag":
			if (state.tags.length > 2 || state.tags.includes(action.newTag)) {
				return { ...state };
			}
			return { ...state, tags: [...state.tags, action.newTag] };
		case "deleteTag":
			if (state.tags.length == 0) {
				return { ...state };
			}
			return {
				...state,
				tags: [...state.tags.filter((t) => t != action.tagToDelete)],
			};
		case "setAddNewsFields":
			return {
				dateCreated: new Date().toISOString(),
				featured: false,
				tags: [],
				text: "",
				title: "",
				userID: action.user._id,
				username: action.user.username,
			};
		case "setFieldsForEdit":
			console.log("-----------------");
			console.log(action.itemToEdit);
			return {
				_id: action.itemToEdit._id,
				dateCreated: new Date().toISOString(),
				featured: action.itemToEdit.featured,
				tags: action.itemToEdit.tags,
				text: action.itemToEdit.text,
				title: action.itemToEdit.title,
				userID: action.user._id,
				username: action.user.username,
			};
	}
}
