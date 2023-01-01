import { createContext, useReducer, useState } from "react";
import { useRouter } from "next/router.js";
import uuid from "react-uuid";
import _ from "lodash";

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
	checkedInsurances: [],
	setCheckedInsurances: () => {},
	checkedDepartments: [],
	setCheckedDepartments: () => {},
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
	const [checkedInsurances, setCheckedInsurances] = useState(
		_.uniq(allActiveInsurances.map((ins) => ins.title))
	);
	const [checkedDepartments, setCheckedDepartments] = useState(
		allActiveInsurances.map((ins) => ins.department)
	);
	const [isLoading, setIsLoading] = useState(false);

	const [inputsState, dispatchEcoReducerAction] = useReducer(
		manageEcoReducer,
		initialObject
	);

	const router = useRouter();

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
		let problem = false;
		allActiveInsurances.forEach((ins) => {
			if (
				inputsState.title === ins.title &&
				inputsState.department === ins.department
			) {
				setInfo((info) => ({ ...info, type: "error", text: "Already exists" }));
				problem = true;
			}
		});
		if (problem) {
			return;
		}
		setAllActiveInsurances([
			...allActiveInsurances,
			{ ...inputsState, _id: uuid(), eco: "departmentWide" },
		]);

		//addedNow
		setCheckedInsurances([...checkedInsurances, inputsState.title]);
		setCheckedDepartments([...checkedDepartments, inputsState.department]);

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

	async function handleSubmit() {
		setIsLoading(true);
		const response = await fetch("/api/admin/manage-eco", {
			method: "POST",
			body: JSON.stringify(allActiveInsurances),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log(data);
		setIsLoading(false);
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
		isLoading,
		setIsLoading,
		handleSubmit,
		info,
		inputsState,
		manageEcoReducer,
		setActionLoaded,
		setActiveItem,
		setAllActiveInsurances,
		setInfo,
		distinctDepartments,
		checkedInsurances,
		setCheckedInsurances,
		checkedDepartments,
		setCheckedDepartments,
	};

	return (
		<EcoContext.Provider value={ecoContext}>{children}</EcoContext.Provider>
	);
}

export default EcoContext;
