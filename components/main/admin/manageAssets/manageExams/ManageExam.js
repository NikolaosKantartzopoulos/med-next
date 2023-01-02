import React, { useContext } from "react";
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

function ManageExam() {
	const {
		examInputState,
		dispatchExamInputStateAction,
		allActiveDepartments,
		allActiveDoctors,
	} = useContext(ExamContext);
	return (
		<section className={styles.ManageExamSection}>
			<ManageExamTitles />
			<div className={styles.RadioAndDoctors}>
				<ManageExamRadio />
				<TinyTabs />
			</div>
			<ExamTags />
			<ExamBuildingsManagement />

			<ManageExamPreparation />
			<ManageExamsEco />
			<Button onClick={() => console.log(examInputState)}>Submit</Button>
		</section>
	);
}

export default ManageExam;
