import React, { useContext, useEffect, useState } from "react";

import ExamContext from "../../../../../helper/store/contexts/exam-context";
import LanguageContext from "../../../../../helper/store/contexts/language-context";
import ToolsContext from "../../../../../helper/store/contexts/tools-context";

import ManageExamTitles from "./ManageExamTitles";
import ManageExamRadio from "./ManageExamRadio";
import ManageExamsEco from "./ManageExamsEco";
import ManageExamPreparation from "./ManageExamPreparation";
import ExamBuildingsManagement from "./ExamBuildingsManagement.js";
import ExamTags from "./ExamTags.js";

import Button from "../../../../UI/Button";
import TinyTabs from "./TinyTabs";

import styles from "./ManageExam.module.css";
import { useRouter } from "next/router";

function ManageExamForm({ insertExamToForm }) {
	const { examInputState, dispatchExamInputStateAction } =
		useContext(ExamContext);
	const { info, setInfo, infoMessage } = useContext(ToolsContext);

	const router = useRouter();

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
		const editRes = await fetch("/api/admin/edit-exam", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(examInputState),
		});
		if (editRes.ok) {
			const data = await editRes.json();
			console.log(data);
			infoMessage(data.type, data.text);
			setTimeout(
				() => router.replace("http://localhost:3000/admin/exams-table"),
				1500
			);
		}
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
