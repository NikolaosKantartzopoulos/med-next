import React from "react";

import styles from "./xm-loaded-titles.module.css";

function ExamLoadedTitles({ xm }) {
	return (
		<div className={styles.loadedTitles}>
			<div className={styles.titleHeader}>
				<div className={styles.depHeader}>
					<p>{xm.department} </p>
					<p>{" ( " + xm.subdepartment + " ) "}</p>
				</div>
				<p className={styles.examName}>{xm.name}</p>
			</div>

			{xm.nhsDescription && (
				<h6 className={styles.nhsDescr}>{xm.nhsDescription}</h6>
			)}
		</div>
	);
}

export default ExamLoadedTitles;
