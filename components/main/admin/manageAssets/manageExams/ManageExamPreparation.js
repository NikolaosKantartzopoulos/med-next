import React, { useContext, useState } from "react";
import ExamContext from "../../../../../helper/store/exam-context";

import Textarea from "../../../../UI/Textarea";
import Select from "../../../../UI/Select.js";
import styles from "./ManageExam.module.css";

function ManageExamPreparation() {
	const {
		examInputState,
		dispatchExamInputStateAction,
		allActivePreparations,
	} = useContext(ExamContext);

	const [activeGeneralPrep, setActiveGeneralPrep] = useState(
		allActivePreparations[0].title
	);

	function handleGeneralPrep(e) {
		setActiveGeneralPrep(e.target.value);
		dispatchExamInputStateAction({
			type: "setGeneralPreparation",
			generalPrepTitle: e.target.value,
		});
	}
	return (
		<fieldset id="preparationsSection" className={styles.preparationsSection}>
			<legend>Preparations</legend>
			{/* <Textarea
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
			/> */}
			<select onChange={(e) => handleGeneralPrep(e)}>
				{allActivePreparations
					.sort((a, b) => (a.title > b.title ? 1 : -1))
					.map((a) => (
						<option key={a.title} value={a.title}>
							{a.title}
						</option>
					))}
			</select>
			<Textarea
				id="generalPreparation"
				label="General"
				value={
					allActivePreparations.find((prep) => prep.title === activeGeneralPrep)
						.details
				}
				onChange={() => {}}
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
