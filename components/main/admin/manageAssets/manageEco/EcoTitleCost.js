import React, { useContext } from "react";

import EcoContext from "../../../../../helper/store/eco-context.js";

import Input from "../../../../UI/Input.js";

import styles from "./EcoTitleCost.module.css";

function EcoTitleCost() {
	const { dispatchEcoReducerAction, inputsState, setInfo, actionLoaded } =
		useContext(EcoContext);
	return (
		<div id="ecoTitleCost" className={styles.ecoTitleCost}>
			{actionLoaded == "addEco" && (
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
			)}
			{actionLoaded == "editEco" && (
				<h4 style={{ width: "100%" }}>{inputsState.title}</h4>
			)}
			{actionLoaded && (
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
			)}
		</div>
	);
}

export default EcoTitleCost;
