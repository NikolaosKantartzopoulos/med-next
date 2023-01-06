import React, { useContext, useEffect, useState } from "react";
import ExamContext from "../../../../../helper/store/exam-context";

import ManageExamTitles from "./ManageExamTitles";
import ManageExamRadio from "./ManageExamRadio";
import ManageExamsEco from "./ManageExamsEco";
import ManageExamPreparation from "./ManageExamPreparation";
import ExamBuildingsManagement from "./ExamBuildingsManagement.js";
import ExamTags from "./ExamTags.js";

import Button from "../../../../UI/Button";
import TinyTabs from "./TinyTabs";

import styles from "./ManageExam.module.css";
import InfoPanel from "../../../../UI/InfoPanel";

function ManageExamForm({ insertExamToForm }) {
	const {
		examInputState,
		dispatchExamInputStateAction,
		allActiveDepartments,
		allActiveDoctors,
	} = useContext(ExamContext);

	const [info, setInfo] = useState(null);

	const [editingExam, setEditingExam] = useState(false);
	useEffect(() => {
		if (insertExamToForm) {
			setEditingExam(true);
			dispatchExamInputStateAction({
				type: "setExamForEdit",
				exam: insertExamToForm.exam,
			});
		}
	}, []);
	async function submitEditedExam() {
		await fetch("/api/admin/edit-exam", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(examInputState),
		});
	}
	return (
		<>
			<InfoPanel info={info} />
			{editingExam && (
				<Button onClick={submitEditedExam}>Save edited exam</Button>
			)}

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
