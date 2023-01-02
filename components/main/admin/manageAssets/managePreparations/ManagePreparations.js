import React, { useContext } from "react";
import PreparationsContext from "../../../../../helper/store/preparations-context";

import "../../../../UI/ResponsiveItem";

import InfoPanel from "../../../../UI/InfoPanel";
import PreparationsUI from "./PreparationsUI";
import ActivePreparationsList from "./ActivePreparationsList.js";

import styles from "./CommonPreparationsList.module.css";
import Button from "../../../../UI/Button";
import LoadingSpinner from "../../../../UI/LoadingSpinner";
import PrepTextarea from "./PrepTextarea";

function CommonPreparationsList() {
	const { actionLoaded, handlePost, info, isLoading } =
		useContext(PreparationsContext);
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
			<Button
				onClick={handlePost}
				customStyle={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}
				disabled={actionLoaded ? true : false}
			>
				Submit
			</Button>
			<ActivePreparationsList />
		</section>
	);
}

export default CommonPreparationsList;