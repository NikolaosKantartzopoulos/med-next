export function manageEcoReducer(state, action) {
	switch (action.type) {
		case "resetAll":
			return initialObject;
		case "setTitle":
			return { ...state, title: action.newTitle };
		case "setDepartment":
			return { ...state, department: action.newDepartment };
		case "setCost":
			return { ...state, cost: action.newCost };
		case "setDetails":
			return { ...state, details: action.newDetails };
		case "setEco":
			return { ...state, eco: action.newEco };
	}
}

export const initialObject = {
	_id: "63ada03aae2b68a6d515dde0",
	title: "Free",
	department: "CT",
	cost: "50",
	details: "asdf",
	eco: "departmentWide",
};
