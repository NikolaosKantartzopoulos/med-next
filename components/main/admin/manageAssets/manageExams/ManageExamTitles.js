import React, { useContext } from "react";
import ExamContext from "../../../../../helper/store/contexts/exam-context";
import LanguageContext from "../../../../../helper/store/contexts/language-context";

import Input from "../../../../UI/Input";
import TinyInput from "../../../../UI/TinyInput";

import styles from "./ManageExamTitles.module.css";

function ManageExamTitles() {
	const { examInputState, dispatchExamInputStateAction } =
		useContext(ExamContext);
	const { lng } = useContext(LanguageContext);
	return (
		<div className={styles.manageExamTitlesSection}>
			<Input
				id="examName"
				label={lng("Name")}
				value={examInputState.name}
				onChange={(e) => {
					dispatchExamInputStateAction({
						type: "setName",
						newName: e.target.value,
					});
				}}
			/>
			<Input
				id="nhsTitle"
				label={lng("NHSTitle")}
				value={examInputState.nhsDescription}
				onChange={(e) =>
					dispatchExamInputStateAction({
						type: "setNhsDescription",
						newNhsDescription: e.target.value,
					})
				}
				customStyle={{ width: "100%" }}
			/>
			<div className={styles.results}>
				<h4 style={{ width: "50%" }}>{lng("Results")}</h4>
				<TinyInput
					value={examInputState.results}
					id="results"
					onChange={(e) =>
						dispatchExamInputStateAction({
							type: "setResults",
							newResults: e.target.value,
						})
					}
					customStyle={{
						width: "50%",
						height: "2rem",
						borderRight: "2px solid darkblue",
					}}
				/>
			</div>
		</div>
	);
}

export default ManageExamTitles;
