import React, { useContext, useState } from "react";

import ExamContext from "../../../../../helper/store/contexts/exam-context";
import ToolsContext from "../../../../../helper/store/contexts/tools-context";

import ButtonSave from "../../../../UI/ButtonSave";
import ManageExamForm from "./ManageExamForm";
import LoadingSpinner from "../../../../UI/LoadingSpinner";

function ManageExam() {
	const { examInputState, dispatchExamInputStateAction } =
		useContext(ExamContext);
	const { info, setInfo, infoMessage } = useContext(ToolsContext);
	const [isLoading, setIsLoading] = useState(false);

	function setFieldsForNewExamEntry() {
		dispatchExamInputStateAction({ type: "resetAll" });
	}
	async function handleSubmitNewExam() {
		if (examInputState.name.trim() === "") {
			infoMessage("error", "Name field is empty");
			console.log("inside");
			return;
		}
		if (examInputState.nhsDescription.trim() === "") {
			infoMessage("error", "A field is empty");
			console.log("inside");
			return;
		}

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
			<ManageExamForm />
		</>
	);
}

export default ManageExam;
