import React, { useContext, useEffect, useState } from "react";

import ExamContext from "../../../../../helper/store/contexts/exam-context";
import LanguageContext from "../../../../../helper/store/contexts/language-context";

import ManageExamTitles from "./ManageExamTitles";
import ManageExamRadio from "./ManageExamRadio";
import ManageExamsEco from "./ManageExamsEco";
import ManageExamPreparation from "./ManageExamPreparation";
import ExamBuildingsManagement from "./ExamBuildingsManagement.js";
import ExamTags from "./ExamTags.js";

import Button from "../../../../UI/Button";
import TinyTabs from "./TinyTabs";

import styles from "./ManageExam.module.css";

function ManageExamForm({ insertExamToForm }) {
	const { examInputState, dispatchExamInputStateAction } =
		useContext(ExamContext);
	const { lng } = useContext(LanguageContext);
	const [isLoading, setIsLoading] = useState(false);

	const [editingExam, setEditingExam] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		if (insertExamToForm) {
			setEditingExam(true);
			dispatchExamInputStateAction({
				type: "setExamForEdit",
				exam: insertExamToForm.exam,
			});
			setIsLoading(false);
		}
	}, []);
	async function submitEditedExam() {
		setIsLoading(true);
		await fetch("/api/admin/edit-exam", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(examInputState),
		});
		setIsLoading(false);
	}
	return (
		<>
			{editingExam && <Button onClick={submitEditedExam}>{lng("Save")}</Button>}

			<section className={styles.ManageExamSection}>
				<ManageExamTitles />
				<div className={styles.RadioAndDoctors}>
					<ManageExamRadio />
					<TinyTabs />
				</div>
				<ManageExamsEco />
				<ExamTags />
				<ExamBuildingsManagement />
				<ManageExamPreparation />
			</section>
		</>
	);
}

export default ManageExamForm;
