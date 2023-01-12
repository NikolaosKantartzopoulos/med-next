import React, { useContext } from "react";
import PreparationsContext from "../../../../../helper/store/contexts/preparations-context";

import "../../../../UI/ResponsiveItem";

import PreparationsUI from "./PreparationsUI";
import ActivePreparationsList from "./ActivePreparationsList.js";

import styles from "./CommonPreparationsList.module.css";
import LoadingSpinner from "../../../../UI/LoadingSpinner";
import PrepTextarea from "./PrepTextarea";

function CommonPreparationsList() {
	const { isLoading } = useContext(PreparationsContext);
	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<section className={styles.managePreparationsSection}>
			<div className={styles.managePreparationsUI}>
				<PreparationsUI />
				<PrepTextarea />
			</div>

			<ActivePreparationsList />
		</section>
	);
}

export default CommonPreparationsList;
