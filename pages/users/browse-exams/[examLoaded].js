import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import ToolsContext from "../../../helper/store/contexts/tools-context";

function ExamShowcase() {
	const toolsCtx = useContext(ToolsContext);
	const router = useRouter();

	useEffect(() => {
		async function fetchExam() {
			if (!toolsCtx.examLoaded) {
				router.push("/users/browse-exams");
				return;
			}
			const res = await fetch("/api/users/fetch-exam", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ _id: toolsCtx.examLoaded._id }),
			});

			if (res.ok) {
				const data = await res.json();
				console.log(data.examReturned);
				toolsCtx.setExamLoaded(data.examReturned);
			}
		}

		fetchExam();
		return () => {
			toolsCtx.setExamLoaded(null);
		};
	}, []);

	return (
		<div>
			<h1></h1>
			{toolsCtx.examLoaded ? (
				<span>{toolsCtx.examLoaded.nhsDescription}</span>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}

export default ExamShowcase;
