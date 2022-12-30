import React from "react";

import ManageEcoUI from "./ManageEcoUI.js";
import EcoRadioButtons from "./EcoRadioButtons";
import EcoTitleCost from "./EcoTitleCost.js";

import styles from "./EcoUITopLine.module.css";

function EcoUITopLine() {
	return (
		<div id="UITopLine" className={styles.UITopLine}>
			<ManageEcoUI />
			<EcoTitleCost />
			<EcoRadioButtons />
		</div>
	);
}

export default EcoUITopLine;
