import React from "react";

import Input from "../../../../UI/Input.js";

// import styles from "./EcoTitleCost.module.css";

function EcoTitleCost({ inputsState, setInfo, dispatchEcoReducerAction }) {
	return (
		<div id="ecoTitleCost">
			<Input
				id="ecoTitle"
				label="Title"
				value={inputsState.title}
				onChange={(e) => {
					setInfo(null);
					dispatchEcoReducerAction({
						type: "setTitle",
						newTitle: e.target.value,
					});
				}}
				customStyle={{ width: "16rem" }}
			/>
			<Input
				id="ecoCost"
				label="€"
				value={inputsState.cost}
				onChange={(e) => {
					setInfo(null);
					dispatchEcoReducerAction({
						type: "setCost",
						newCost: e.target.value,
					});
				}}
				customStyle={{ width: "16rem" }}
			/>
		</div>
	);
}

export default EcoTitleCost;
