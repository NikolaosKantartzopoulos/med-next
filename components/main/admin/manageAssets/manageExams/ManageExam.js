import React, { useContext, useEffect, useState } from "react";
import ExamContext from "../../../../../helper/store/contexts/exam-context";
import ButtonSave from "../../../../UI/ButtonSave";
import ManageExamForm from "./ManageExamForm";
import InfoPanel from "../../../../UI/InfoPanel";
import LoadingSpinner from "../../../../UI/LoadingSpinner";

function ManageExam() {
	const [info, setInfo] = useState(null);
	const { examInputState, dispatchExamInputStateAction } =
		useContext(ExamContext);
	const [isLoading, setIsLoading] = useState(false);

	function setFieldsForNewExamEntry() {
		dispatchExamInputStateAction({ type: "resetAll" });
	}
	async function handleSubmitNewExam() {
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

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<>
			<ButtonSave onClick={handleSubmitNewExam} />
			{info && <InfoPanel info={info} />}
			<ManageExamForm />
		</>
	);
}

export default ManageExam;
