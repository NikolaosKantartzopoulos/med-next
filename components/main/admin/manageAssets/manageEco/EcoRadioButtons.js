import React from "react";
import RadioButton from "../../../../UI/RadioButton.js";

function EcoRadioButtons({
	setInfo,
	dispatchEcoReducerAction,
	distinctDepartments,
}) {
	return (
		<div
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
				/>
			))}
		</div>
	);
}

export default EcoRadioButtons;
