import React, { useContext } from "react";
import ExamContext from "../../../../../helper/store/exam-context";

import Input from "../../../../UI/Input";

import styles from "./ManageExamTitles.module.css";

function ManageExamTitles() {
	const { examInputState, dispatchExamInputStateAction } =
		useContext(ExamContext);
	return (
		<div className={styles.manageExamTitlesSection}>
			<Input
				id="examName"
				label="Name"
				value={examInputState.name}
				onChange={(e) =>
					dispatchExamInputStateAction({
						type: "setName",
						newName: e.target.value,
					})
				}
			/>
			<Input
				id="nhsTitle"
				label="NHS Title"
				value={examInputState.nhsDescription}
				onChange={(e) =>
					dispatchExamInputStateAction({
						type: "setNhsDescription",
						newNhsDescription: e.target.value,
					})
				}
				customStyle={{ width: "100%" }}
			/>
		</div>
	);
}

export default ManageExamTitles;
