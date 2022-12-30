import React, { useContext } from "react";

import EcoContext from "../../../../../helper/store/eco-context.js";
import RadioButton from "../../../../UI/RadioButton.js";

import styles from "./EcoRadioButtons.module.css";

function EcoRadioButtons() {
	const {
		dispatchEcoReducerAction,
		setInfo,
		distinctDepartments,
		inputsState,
		actionLoaded,
	} = useContext(EcoContext);
	return (
		<>
			{actionLoaded == "addEco" && (
				<div
					className={styles.EcoRadioButtonsSection}
					onChange={(e) => {
						setInfo(null);
						dispatchEcoReducerAction({
							type: "setDepartment",
							newDepartment: e.target.value,
						});
					}}
				>
					{distinctDepartments.map((dep) => (
						<RadioButton
							value={dep}
							key={dep}
							label={dep}
							name="departmentSelect"
							checked={inputsState.department === dep}
						/>
					))}
				</div>
			)}
			{actionLoaded == "editEco" && (
				<h4 style={{ width: "8rem" }}>{inputsState.department}</h4>
			)}
		</>
	);
}

export default EcoRadioButtons;
