import React, { useContext, useState } from "react";
import ExamContext from "../../../../../helper/store/contexts/exam-context";
import ToolsContext from "../../../../../helper/store/contexts/tools-context";

import styles from "./TinyTabs.module.css";

function TinyTabs() {
	const toolsCtx = useContext(ToolsContext);
	const { allActiveDoctors, examInputState, dispatchExamInputStateAction } =
		useContext(ExamContext);
	const [examDoctors, setExamDoctors] = useState(examInputState.doctors);

	function setDoctorsHandler(docUsername) {
		if (examDoctors.includes(docUsername)) {
			setExamDoctors(examDoctors.filter((doc) => doc != docUsername));
			dispatchExamInputStateAction({
				type: "setDoctors",
				newDoctors: examDoctors.filter((doc) => doc != docUsername),
			});
		} else {
			setExamDoctors([...examDoctors, docUsername]);
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
						color: examInputState.doctors.includes(doc.username)
							? "darkblue"
							: "white",
						backgroundColor: examInputState.doctors.includes(doc.username)
							? "white"
							: "darkred",
					}}
					onClick={() => {
						setDoctorsHandler(`${doc.username}`);
					}}
				>
					{doc.username}
				</span>
			))}
		</div>
	);
}

export default TinyTabs;
