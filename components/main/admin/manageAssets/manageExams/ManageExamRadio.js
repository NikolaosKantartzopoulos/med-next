import React, { useContext, useEffect } from "react";
import ExamContext from "../../../../../helper/store/contexts/exam-context";
import LanguageContext from "../../../../../helper/store/contexts/language-context";
import LoadingSpinner from "../../../../UI/LoadingSpinner";

import RadioButton from "../../../../UI/RadioButton";

import styles from "./ManageExam.module.css";

function ManageExamRadio() {
	const { dispatchExamInputStateAction, allActiveDepartments, examInputState } =
		useContext(ExamContext);
	const { lng } = useContext(LanguageContext);

	if (!allActiveDepartments) {
		return <LoadingSpinner />;
	}

	return (
		<div className={styles.ManageExamRadio}>
			<div className={styles.radioButtons}>
				<div>
					<h4>{lng("Department")}</h4>
					<div
						onChange={(e) =>
							dispatchExamInputStateAction({
								type: "setDepartment",
								newDepartment: e.target.value,
							})
						}
						className={styles.radioButtonsDiv}
					>
						{allActiveDepartments.map((dep) => (
							<RadioButton
								key={dep.department}
								id={dep.department}
								label={dep.department}
								name={"departments"}
								disabled={false}
								value={dep.department}
								checked={dep.department === examInputState.department}
							/>
						))}
					</div>
				</div>
				<div>
					<h4>{lng("Subdepartment")}</h4>
					<div
						onChange={(e) =>
							dispatchExamInputStateAction({
								type: "setSubepartment",
								newSubdepartment: e.target.value,
							})
						}
						className={styles.radioButtonsDiv}
					>
						{examInputState.department &&
							allActiveDepartments
								.find((d) => d.department === examInputState.department)
								.sub.map((sub) => (
									<RadioButton
										key={sub}
										id={sub}
										label={sub}
										name={"sub"}
										disabled={false}
										value={sub}
										checked={sub === examInputState.subdepartment}
									/>
								))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ManageExamRadio;
