import React, { useReducer, useEffect } from "react";

import {
	initialObject,
	examInputReducer,
} from "../../../../../helper/store/reducers/manage-exam-input-reducer";

import ManageExamTitles from "./ManageExamTitles";
import ScheduleTable from "./ScheduleTable";
import ManageExamRadio from "./ManageExamRadio";
import ManageExamsEco from "./ManageExamsEco";
import ManageExamPreparation from "./ManageExamPreparation";

import Button from "../../../../UI/Button";
import TinyTabs from "./TinyTabs";

import styles from "./ManageExam.module.css";

function ManageExam({ allActiveDepartments, allActiveDoctors }) {
	const [examInputState, dispatchExamInputStateAction] = useReducer(
		examInputReducer,
		initialObject
	);

	return (
		<section className={styles.ManageExamSection}>
			<ManageExamTitles
				dispatchExamInputStateAction={dispatchExamInputStateAction}
				examInputState={examInputState}
			/>
			<div className={styles.RadioAndDoctors}>
				<ManageExamRadio
					dispatchExamInputStateAction={dispatchExamInputStateAction}
					allActiveDepartments={allActiveDepartments}
					examInputState={examInputState}
				/>
				<TinyTabs
					allActiveDoctors={allActiveDoctors}
					examDoctors={examInputState.doctors}
					dispatchExamInputStateAction={dispatchExamInputStateAction}
				/>
			</div>
			<div className={styles.scheduleTables}>
				{[...examInputState.buildingsSchedule]
					.sort((a, b) => (a.buildingName > b.buildingName ? 1 : -1))
					.map((building) => (
						<ScheduleTable
							key={building.buildingName}
							building={building}
							dispatchExamInputStateAction={dispatchExamInputStateAction}
						/>
					))}
			</div>
			<ManageExamPreparation
				dispatchExamInputStateAction={dispatchExamInputStateAction}
				examInputState={examInputState}
			/>
			<ManageExamsEco
				examInputState={examInputState}
				dispatchExamInputStateAction={dispatchExamInputStateAction}
			/>
			<Button onClick={() => console.log(examInputState)}>Submit</Button>
		</section>
	);
}

export default ManageExam;
