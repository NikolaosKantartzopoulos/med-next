import React, { useContext, useState } from "react";
import ExamContext from "../../../../../helper/store/contexts/exam-context";
import ScheduleTable from "./ScheduleTable";
import styles from "./ManageExam.module.css";
import checkStyles from "./BuildingFilters.module.css";
import LanguageContext from "../../../../../helper/store/contexts/language-context";
import ToolsContext from "../../../../../helper/store/contexts/tools-context";
function ExamBuildingsManagement() {
	const {
		examInputState,
		dispatchExamInputStateAction,
		allActiveDepartments,
		allActiveDoctors,
		allActiveBuildings,
	} = useContext(ExamContext);

	const { theme } = useContext(ToolsContext);
	const { lng } = useContext(LanguageContext);
	const allAddresses = allActiveBuildings.map((addr) => addr.address);
	const examAddresses = examInputState.buildingsSchedule.map(
		(b) => b.buildingName
	);
	const [activeAddresses, setActiveAddresses] = useState(examAddresses);

	function handleTitleCheckboxClick(e, ins) {
		if (
			examInputState.buildingsSchedule.map((b) => b.buildingName).includes(ins)
		) {
			dispatchExamInputStateAction({
				type: "removeBuilding",
				RemoveBuildingName: ins,
			});
			setActiveAddresses(activeAddresses.filter((a) => a != ins));
		} else {
			setActiveAddresses([...activeAddresses, ins]);
			dispatchExamInputStateAction({
				type: "addBuilding",
				addBuildingName: ins,
			});
		}
	}

	return (
		<div>
			<div
				className={checkStyles.EcoFilter}
				style={{ color: theme == "dark" ? "white" : null }}
			>
				<h4>{lng("Buildings")}</h4>
				<div className={checkStyles.checkLine}>
					{allAddresses.map((ins) => (
						<div className={checkStyles.setInputLabel} key={ins}>
							<input
								type="checkbox"
								value={ins}
								id={ins}
								name={ins}
								onChange={(e) => handleTitleCheckboxClick(e, ins)}
								checked={examInputState.buildingsSchedule
									.map((b) => b.buildingName)
									.includes(ins)}
							/>
							<label htmlFor={ins}>{ins}</label>
						</div>
					))}
				</div>
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
		</div>
	);
}

export default ExamBuildingsManagement;
