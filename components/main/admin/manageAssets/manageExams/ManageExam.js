import React, { useContext, useEffect, useState } from "react";
import ExamContext from "../../../../../helper/store/exam-context";
import ButtonSave from "../../../../UI/ButtonSave";
import ManageExamForm from "./ManageExamForm";
import InfoPanel from "../../../../UI/InfoPanel";
import LoadingSpinner from "../../../../UI/LoadingSpinner";

function ManageExam() {
	const [info, setInfo] = useState(null);
	const { examInputState, dispatchExamInputStateAction } =
		useContext(ExamContext);
	const [isLoading, setIsLoading] = useState(false);
	// const [actionLoaded, setActionLoaded] = useState(null);

	function setFieldsForNewExamEntry() {
		// setActionLoaded("addNewExam");
		dispatchExamInputStateAction({ type: "resetAll" });
	}
	async function handleSubmitNewExam() {
		// setActionLoaded(null);
		setIsLoading(true);
		const response = await fetch("/api/admin/add-exam", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(examInputState),
		});
		const data = await response.json();
		setIsLoading(false);
		if (response.ok) {
			setInfo({ type: "ok", text: "Exam Submited" });
			setTimeout(() => setInfo(null), 3000);
		} else {
			setInfo({ type: "error", text: "Exam Exists" });
			setTimeout(() => setInfo(null), 3000);
		}
	}

	// function buttonCloseClicked() {
	// 	dispatchExamInputStateAction({ type: "resetAll" });
	// }
	// function manageExamsClicked() {
	// 	setActionLoaded("manageExams");
	// 	router.push("/admin/exams-table");
	// }

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<>
			<ButtonSave onClick={handleSubmitNewExam} />
			{info && <InfoPanel info={info} />}
			<ManageExamForm />
			{/* <div className={styles.ExamsUI}>
				{!actionLoaded && <ButtonAdd onClick={setFieldsForNewExamEntry} />}
				{actionLoaded && <ButtonSave onClick={handleSubmitNewExam} />}
				{actionLoaded && <ButtonClose onClick={buttonCloseClicked} />}
				<Button onClick={manageExamsClicked}>Manage</Button>
			</div>
			{(actionLoaded === "addNewExam" || actionLoaded === "editExam") && (
				<ManageExamForm />
			)}
			{actionLoaded == "manageExams" && <ExamsTable />} */}{" "}
		</>
	);
}

export default ManageExam;
