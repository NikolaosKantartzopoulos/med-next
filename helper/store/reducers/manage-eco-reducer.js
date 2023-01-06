export function manageEcoReducer(state, action) {
	switch (action.type) {
		case "resetAll":
			return initialObject;
		case "setTitle":
			return { ...state, title: action.newTitle };
		case "setDepartment":
			return { ...state, department: action.newDepartment };
		case "setSubdepartment":
			return { ...state, subdepartment: action.newSubdepartment };
		case "setCost":
			return { ...state, cost: action.newCost };
		case "setDetails":
			return { ...state, details: action.newDetails };
		case "setEco":
			return { ...state, eco: action.newEco };
		case "loadItem":
			return action.item;
	}
}

export const initialObject = {
	_id: "",
	title: "",
	department: "",
	subdepartment: "",
	cost: "",
	details: "",
	eco: "",
};
