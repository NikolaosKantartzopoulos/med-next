import React, { useContext } from "react";

import EcoContext from "../../../../../helper/store/eco-context.js";
import RadioButton from "../../../../UI/RadioButton.js";

function EcoRadioButtons() {
	const {
		dispatchEcoReducerAction,

		setInfo,
		distinctDepartments,
	} = useContext(EcoContext);
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
