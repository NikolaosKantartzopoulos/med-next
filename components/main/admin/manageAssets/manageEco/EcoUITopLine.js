import React from "react";

function EcoUITopLine({
	actionLoaded,
	dispatchEcoReducerAction,
	distinctDepartments,
	inputsState,
	saveAddItem,
	saveEditedItem,
	setActionLoaded,
	setActiveItem,
	setAddItem,
	setInfo,
}) {
	return (
		<div id="UITopLine" className={styles.UITopLine}>
			<ManageEcoUI
				actionLoaded={actionLoaded}
				setActionLoaded={setActionLoaded}
				setActiveItem={setActiveItem}
				setInfo={setInfo}
				setAddItem={setAddItem}
				saveAddItem={saveAddItem}
				saveEditedItem={saveEditedItem}
			/>
			<EcoTitleCost
				inputsState={inputsState}
				setInfo={setInfo}
				dispatchEcoReducerAction={dispatchEcoReducerAction}
			/>
			<EcoRadioButtons
				setInfo={setInfo}
				dispatchEcoReducerAction={dispatchEcoReducerAction}
				distinctDepartments={distinctDepartments}
			/>
		</div>
	);
}

export default EcoUITopLine;
