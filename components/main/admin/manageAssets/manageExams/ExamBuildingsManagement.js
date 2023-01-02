import React, { useContext } from "react";
import ExamContext from "../../../../../helper/store/exam-context";
import ScheduleTable from "./ScheduleTable";
import styles from "./ManageExam.module.css";

function ExamBuildingsManagement() {
	const {
		examInputState,
		dispatchExamInputStateAction,
		allActiveDepartments,
		allActiveDoctors,
		allActiveBuildings,
	} = useContext(ExamContext);
	return (
		<div>
			{allActiveBuildings.map((b) => (
				<li>{b.address}</li>
			))}
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
		</div>
	);
}

export default ExamBuildingsManagement;
