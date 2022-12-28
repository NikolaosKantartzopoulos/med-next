import React, { useState } from "react";

import styles from "./TinyTabs.module.css";

function TinyTabs({
	allActiveDoctors,
	examDoctors,
	dispatchExamInputStateAction,
}) {
	const [activeExamDoctors, setActiveExamDoctors] = useState(examDoctors);
	console.log(examDoctors);

	function setDoctorsHandler(docUsername) {
		if (examDoctors.includes(docUsername)) {
			dispatchExamInputStateAction({
				type: "setDoctors",
				newDoctors: examDoctors.filter((doc) => doc != docUsername),
			});
		} else {
			dispatchExamInputStateAction({
				type: "setDoctors",
				newDoctors: [...examDoctors, docUsername],
			});
		}
	}

	return (
		<div className={styles.tinyTabsComponent}>
			{allActiveDoctors.map((doc) => (
				<span
					key={doc.username}
					style={{
						backgroundColor: examDoctors.includes(doc.username)
							? "green"
							: "darkred",
					}}
					onClick={() => setDoctorsHandler(`${doc.username}`)}
				>
					{doc.username}
				</span>
			))}
		</div>
	);
}

export default TinyTabs;
