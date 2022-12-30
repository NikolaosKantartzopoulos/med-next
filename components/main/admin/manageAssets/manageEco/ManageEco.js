import React, { useState, useReducer } from "react";

import ManageEcoUI from "./ManageEcoUI.js";
import EcoRadioButtons from "./EcoRadioButtons";
import EcoTitleCost from "./EcoTitleCost.js";

import {
	manageEcoReducer,
	initialObject,
} from "../../../../../helper/store/reducers/manage-eco-reducer.js";

import InfoPanel from "../../../../UI/InfoPanel";
import Textarea from "../../../../UI/Textarea.js";

import styles from "./ManageEco.module.css";

function ManageEco({ distinctDepartments, allInsuranceDocuments }) {
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

	return (
		<div id="ManageEcoComponent" className={styles.manageEcoComponent}>
			<InfoPanel info={info} />
			<EcoUITopLine
				actionLoaded={actionLoaded}
				dispatchEcoReducerAction={dispatchEcoReducerAction}
				distinctDepartments={distinctDepartments}
				inputsState={inputsState}
				saveAddItem={saveAddItem}
				saveEditedItem={saveEditedItem}
				setActionLoaded={setActionLoaded}
				setActiveItem={setActiveItem}
				setAddItem={setAddItem}
				setInfo={setInfo}
			/>
			<Textarea
				id="ecoDetails"
				label="Details"
				value={inputsState.details}
				rows={10}
				columns={40}
				onChange={(e) => {
					setInfo(null);
					dispatchPreparationsAction({
						type: "setDetails",
						newDetails: e.target.value,
					});
				}}
			/>
		</div>
	);
}

export default ManageEco;
