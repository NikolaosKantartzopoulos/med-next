export const initialNewsState = {
	dateCreated: new Date(),
	featured: false,
	tags: [],
	text: "",
	title: "",
	userID: "",
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
			return { ...state, tags: [...state.tags, action.newTag] };
		case "setAddNewsFields":
			return {
				dateCreated: new Date().toLocaleDateString("el-GR"),
				featured: false,
				tags: [],
				text: "",
				title: "",
				userID: action.user._id,
			};
	}
}
