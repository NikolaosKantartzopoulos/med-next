import React, { useContext } from "react";

import EcoUITopLine from "./EcoUITopLine.js";

import EcoContext from "../../../../../helper/store/eco-context.js";

import InfoPanel from "../../../../UI/InfoPanel";
import Textarea from "../../../../UI/Textarea.js";

import styles from "./ManageEco.module.css";

function ManageEco() {
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
		<div id="ManageEcoComponent" className={styles.manageEcoComponent}>
			<InfoPanel info={info} />
			<EcoUITopLine />
			<Textarea
				id="ecoDetails"
				label="Details"
				value={inputsState.details}
				rows={10}
				columns={40}
				onChange={(e) => {
					setInfo(null);
					dispatchEcoReducerAction({
						type: "setDetails",
						newDetails: e.target.value,
					});
				}}
			/>
		</div>
	);
}

export default ManageEco;
