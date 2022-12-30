import React, { useContext } from "react";

import EcoContext from "../../../../../helper/store/eco-context.js";

import ManageEcoUI from "./ManageEcoUI.js";
import EcoRadioButtons from "./EcoRadioButtons";
import EcoTitleCost from "./EcoTitleCost.js";

import styles from "./EcoUITopLine.module.css";

function EcoUITopLine() {
	const {
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
	} = useContext(EcoContext);
	return (
		<div id="UITopLine" className={styles.UITopLine}>
			<ManageEcoUI />
			<EcoTitleCost />
			<EcoRadioButtons />
		</div>
	);
}

export default EcoUITopLine;
