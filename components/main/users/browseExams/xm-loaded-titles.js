import React from "react";

import styles from "./xm-loaded-titles.module.css";

function ExamLoadedTitles({ xm }) {
	return (
		<>
			<h3 className={styles.titleHeader}>
				<span className={styles.depHeader}>
					{xm.department + " ( " + xm.subdepartment + " ) "}
				</span>
				<span className={styles.examName}>{xm.name}</span>
			</h3>

			{xm.nhsDescription && (
				<h6 className={styles.nhsDescr}>{xm.nhsDescription}</h6>
			)}
		</>
	);
}

export default ExamLoadedTitles;
