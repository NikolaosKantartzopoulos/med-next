import React, { useContext, useEffect, useState } from "react";
import ExamContext from "../../../../../helper/store/exam-context";
import ButtonAdd from "../../../../UI/ButtonAdd";
import ButtonSave from "../../../../UI/ButtonSave";
import ButtonClose from "../../../../UI/ButtonClose";
import Button from "../../../../UI/Button";
import ManageExamForm from "./ManageExamForm";
import { useRouter } from "next/router";
import styles from "./ManageExam.module.css";
import ExamsTable from "./ExamsTable";

function ManageExam() {
	const router = useRouter();
	const {
		examInputState,
		dispatchExamInputStateAction,
		allActiveDepartments,
		allActiveDoctors,
	} = useContext(ExamContext);
	const [actionLoaded, setActionLoaded] = useState(null);

	function setFieldsForNewExamEntry() {
		setActionLoaded("addNewExam");
		dispatchExamInputStateAction({ type: "resetAll" });
	}
	async function handleSubmitNewExam() {
		setActionLoaded(null);
		const response = await fetch("/api/admin/add-exam", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(examInputState),
		});
		const data = await response.json();
	}

	function buttonCloseClicked() {
		dispatchExamInputStateAction({ type: "resetAll" });
		setActionLoaded(null);
	}
	function manageExamsClicked() {
		setActionLoaded("manageExams");
		router.push("/admin/exams-table");
	}
	return (
		<>
			<div className={styles.ExamsUI}>
				{!actionLoaded && <ButtonAdd onClick={setFieldsForNewExamEntry} />}
				{actionLoaded && <ButtonSave onClick={handleSubmitNewExam} />}
				{actionLoaded && <ButtonClose onClick={buttonCloseClicked} />}
				<Button onClick={manageExamsClicked}>Manage</Button>
			</div>
			{(actionLoaded === "addNewExam" || actionLoaded === "editExam") && (
				<ManageExamForm />
			)}
			{actionLoaded == "manageExams" && <ExamsTable />}
		</>
	);
}

export default ManageExam;
