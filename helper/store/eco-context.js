import { createContext, useReducer, useState } from "react";
import uuid from "react-uuid";

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
	handleSubmit: () => {},
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
		if (
			inputsState.title.trim() === "" ||
			inputsState.cost.trim() === "" ||
			inputsState.cost.trim() === "" ||
			inputsState.department === ""
		) {
			return true;
		}
		return false;
	}
	function resetInputs() {
		dispatchEcoReducerAction({ type: "resetAll" });
		setInfo(null);
	}

	function setEditItem(e, item) {
		console.log(item);
		setActionLoaded("editEco");
		dispatchEcoReducerAction({ type: "loadItem", item: item });
	}
	function saveEditedItem() {
		const filteredArray = allActiveInsurances.filter((ins) => {
			return (
				ins.title != inputsState.title ||
				ins.department != inputsState.department
			);
		});
		const newArray = [...filteredArray, inputsState];
		setActionLoaded(null);
		setActiveItem(null);
		setAllActiveInsurances(newArray);
	}
	function setAddItem() {
		resetInputs();
		setActionLoaded("addEco");
	}
	function saveAddItem() {
		if (aFieldIsEmpty()) {
			setInfo({ type: "error", text: "A field is empty" });
			return;
		}
		allActiveInsurances.forEach((ins) => {
			if (
				inputsState.title === ins.title &&
				inputsState.department === ins.department
			) {
				setInfo({ type: "error", text: "Already exists" });
			}
		});
		setAllActiveInsurances([
			...allActiveInsurances,
			{ ...inputsState, _id: uuid() },
		]);
		dispatchEcoReducerAction({ type: "resetAll" });
		setActionLoaded(null);
		setActiveItem(null);
	}
	function deleteItem(e, item) {
		setAllActiveInsurances([
			...allActiveInsurances.filter((ins) => {
				return ins.title != item.title || ins.department != item.department;
			}),
		]);
	}

	function handleSubmit() {
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
		handleSubmit,
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
