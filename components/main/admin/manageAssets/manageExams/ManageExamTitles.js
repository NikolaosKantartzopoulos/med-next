import React from "react";

import Input from "../../../../UI/Input";

import styles from "./ManageExamTitles.module.css";

function ManageExamTitles({ dispatchExamInputStateAction, examInputState }) {
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
