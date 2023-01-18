import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

import ToolsContext from "../../../helper/store/contexts/tools-context";
import LanguageContext from "../../../helper/store/contexts/language-context";

import FoldUnfold from "../../../components/UI/fold-unfold";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";

import ScheduleTable from "../../../components/main/users/browseExams/xm-schedule-table.js";
import EcoShowcase from "../../../components/main/users/browseExams/eco-showcase.js";

import styles from "./ExamLoaded.module.css";

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
		<div>
			<h1></h1>
			{toolsCtx.examLoaded ? (
				<>
					<h3 className={styles.titleHeader}>
						<span className={styles.depHeader}>
							{xm.department + " ( " + xm.subdepartment + " ) "}
						</span>
						<span className={styles.examName}>{xm.name}</span>
					</h3>

					{xm.nhsDescription && (
						<h6 className={styles.nhsDescr}>{xm.nhsDescription}</h6>
					)}
					{xm.doctors && (
						<FoldUnfold headerText={lng("Doctors")}>
							<div className={styles.doctorsTab}>
								{xm.doctors && xm.doctors.map((d) => <div key={d}>{d}</div>)}
							</div>
						</FoldUnfold>
					)}
					<FoldUnfold headerText={lng("Preparations")}>
						{xm.generalPreparation && (
							<div>
								<h6>{lng("General")}</h6>
								<div>{xm.generalPreparation}</div>
							</div>
						)}
						{xm.uniquePreparation && (
							<div>
								<h6>{lng("Unique")}</h6>
								<div>{xm.uniquePreparation}</div>
							</div>
						)}
					</FoldUnfold>

					{xm.buildingsSchedule && (
						<FoldUnfold headerText={lng("Schedule")}>
							{xm.buildingsSchedule.map((b) => (
								<ScheduleTable building={b} key={b.buildingName} />
							))}
						</FoldUnfold>
					)}
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
				</>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}

export default ExamShowcase;
