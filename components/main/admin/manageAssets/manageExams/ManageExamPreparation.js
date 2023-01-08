import React, { useContext, useState } from "react";
import ExamContext from "../../../../../helper/store/exam-context";
import LanguageContext from "../../../../../helper/store/language-context";
import ToolsContext from "../../../../../helper/store/tools-context";

import Textarea from "../../../../UI/Textarea";
import styles from "./ManageExam.module.css";

function ManageExamPreparation() {
	const { theme } = useContext(ToolsContext);
	const {
		examInputState,
		dispatchExamInputStateAction,
		allActivePreparations,
	} = useContext(ExamContext);
	const { lng } = useContext(LanguageContext);
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
			<legend style={{ color: theme == "dark" ? "white" : null }}>
				{lng("Preparations")}
			</legend>

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
				label={lng("General")}
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
				label={lng("Unique")}
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
