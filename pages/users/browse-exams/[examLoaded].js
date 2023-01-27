import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

import ToolsContext from "../../../helper/store/contexts/tools-context";
import LanguageContext from "../../../helper/store/contexts/language-context";

import FoldUnfold from "../../../components/UI/fold-unfold";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";

import ScheduleTable from "../../../components/main/users/browseExams/xm-schedule-table.js";
import EcoShowcase from "../../../components/main/users/browseExams/eco-showcase.js";

import styles from "./ExamLoaded.module.css";
import ExamLoadedTitles from "../../../components/main/users/browseExams/xm-loaded-titles";
import ExamLoadedDoctors from "../../../components/main/users/browseExams/xm-loaded-doctors";
import ExamLoadedPreparations from "../../../components/main/users/browseExams/xm-loaded-preparations";

function ExamShowcase() {
	const toolsCtx = useContext(ToolsContext);
	const { lng } = useContext(LanguageContext);
	const xm = toolsCtx.examLoaded;
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

				toolsCtx.setExamLoaded(data.examReturned);
			}
		}

		fetchExam();
		return () => {
			toolsCtx.setExamLoaded(null);
		};
	}, []);

	return (
		<>
			{toolsCtx.examLoaded ? (
				<>
					<ExamLoadedTitles xm={xm} />
					{xm.doctors && <ExamLoadedDoctors xm={xm} />}

					{xm.eco && (
						<FoldUnfold headerText={lng("Eco")}>
							{xm.eco.map((ec) => (
								<EcoShowcase
									eco={ec}
									key={ec.title}
									department={xm.department}
									subdepartment={xm.subdepartment}
								/>
							))}
						</FoldUnfold>
					)}
					{xm.buildingsSchedule && (
						<FoldUnfold headerText={lng("Schedule")}>
							<div className={styles.schDiv}>
								{xm.buildingsSchedule.map((b) => (
									<ScheduleTable building={b} key={b.buildingName} />
								))}
							</div>
						</FoldUnfold>
					)}

					{(xm.generalPreparation || xm.uniquePreparation) && (
						<ExamLoadedPreparations xm={xm} />
					)}
				</>
			) : (
				<LoadingSpinner />
			)}
		</>
	);
}

export default ExamShowcase;
