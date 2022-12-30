import { createContext, useReducer, useState } from "react";

import {
	manageEcoReducer,
	initialObject,
} from "./reducers/manage-eco-reducer.js";

const EcoContext = createContext({
	actionLoaded: "",
	activeItem: {},
	aFieldIsEmpty: () => {},
	allActiveInsurances: [],
	deleteItem: () => {},
	dispatchEcoReducerAction: () => {},
	distinctDepartments: [],
	info: {},
	inputsState: {},
	manageEcoReducer: () => {},
	resetInputs: () => {},
	saveAddItem: () => {},
	saveEditedItem: () => {},
	setActionLoaded: () => {},
	setActiveItem: () => {},
	setAddItem: () => {},
	setAllActiveInsurances: () => {},
	setEditItem: () => {},
	setInfo: () => {},
});

export function EcoContextProvider({
	distinctDepartments,
	allInsuranceDocuments,
	children,
}) {
	const [allActiveInsurances, setAllActiveInsurances] = useState(
		allInsuranceDocuments
	);

	const [activeItem, setActiveItem] = useState(null);
	const [actionLoaded, setActionLoaded] = useState(null);
	const [info, setInfo] = useState(null);

	const [inputsState, dispatchEcoReducerAction] = useReducer(
		manageEcoReducer,
		initialObject
	);

	function aFieldIsEmpty() {
		console.log(inputsState);
		if (inputsState.title.trim() === "" || inputsState.cost.trim() === "") {
			return true;
		}
		return false;
	}
	function resetInputs() {
		dispatchEcoReducerAction({ type: "resetAll" });
		setInfo(null);
	}

	function setEditItem() {}
	function saveEditedItem() {}
	function setAddItem() {
		resetInputs();
		setActionLoaded("addEco");
	}
	function saveAddItem() {
		if (aFieldIsEmpty()) {
			setInfo({ type: "error", text: "A field is empty" });
			return;
		}
		console.log(inputsState);
	}
	function deleteItem() {
		console.log(allActiveInsurances);
	}

	const ecoContext = {
		aFieldIsEmpty,
		resetInputs,
		setEditItem,
		saveEditedItem,
		setAddItem,
		saveAddItem,
		deleteItem,
		actionLoaded,
		activeItem,
		allActiveInsurances,
		dispatchEcoReducerAction,
		info,
		inputsState,
		manageEcoReducer,
		setActionLoaded,
		setActiveItem,
		setAllActiveInsurances,
		setInfo,
		distinctDepartments,
	};

	return (
		<EcoContext.Provider value={ecoContext}>{children}</EcoContext.Provider>
	);
}

export default EcoContext;
