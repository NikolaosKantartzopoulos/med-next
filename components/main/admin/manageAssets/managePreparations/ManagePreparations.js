import React, { useContext } from "react";
import PreparationsContext from "../../../../../helper/store/contexts/preparations-context";

import "../../../../UI/ResponsiveItem";

import InfoPanel from "../../../../UI/InfoPanel";
import PreparationsUI from "./PreparationsUI";
import ActivePreparationsList from "./ActivePreparationsList.js";

import styles from "./CommonPreparationsList.module.css";
import LoadingSpinner from "../../../../UI/LoadingSpinner";
import PrepTextarea from "./PrepTextarea";

function CommonPreparationsList() {
	const { info, isLoading } = useContext(PreparationsContext);
	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<section className={styles.managePreparationsSection}>
			<div className={styles.managePreparationsUI}>
				<PreparationsUI />
				<PrepTextarea />
			</div>
			{info && <InfoPanel info={info} />}

			<ActivePreparationsList />
		</section>
	);
}

export default CommonPreparationsList;
