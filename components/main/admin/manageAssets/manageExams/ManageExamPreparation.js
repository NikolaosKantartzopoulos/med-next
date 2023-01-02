import React, { useContext } from "react";
import ExamContext from "../../../../../helper/store/exam-context";

import Textarea from "../../../../UI/Textarea";

import styles from "./ManageExam.module.css";

function ManageExamPreparation() {
	const { examInputState, dispatchExamInputStateAction } =
		useContext(ExamContext);
	return (
		<fieldset id="preparationsSection" className={styles.preparationsSection}>
			<legend>Preparations</legend>
			<Textarea
				id="generalPreparation"
				label="General"
				value={examInputState.generalPreparation}
				onChange={(e) =>
					dispatchExamInputStateAction({
						type: "setGeneralPreparation",
						newGeneralPreparation: e.target.value,
					})
				}
				rows={5}
				cols={200}
			/>
			<Textarea
				id="uniquePreparation"
				label="Unique"
				value={examInputState.uniquePreparation}
				onChange={(e) =>
					dispatchExamInputStateAction({
						type: "setUniquePreparation",
						newUniquePreparation: e.target.value,
					})
				}
				rows={5}
				cols={200}
			/>
		</fieldset>
	);
}

export default ManageExamPreparation;
