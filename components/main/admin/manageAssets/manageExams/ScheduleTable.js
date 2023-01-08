import React, { useContext, useState } from "react";
import tableStyles from "./ScheduleTable.module.css";
import TableInput from "../../../../UI/TableInput";
import TinyInput from "../../../../UI/TinyInput";
import saveIcon from "../../../../../public/images/save.svg";

import Image from "next/image";
import ToolsContext from "../../../../../helper/store/tools-context";

function ScheduleTable({ building, dispatchExamInputStateAction }) {
	const [activeDays, setActiveDays] = useState(building.schedule);
	const [fillFrom, setFillFrom] = useState("");
	const { theme } = useContext(ToolsContext);

	function handleSave() {
		dispatchExamInputStateAction({
			type: "fillBuildingSchedule",
			buildingToFillName: building.buildingName,
			fillWith: fillFrom,
		});
		setActiveDays([
			{ day: "Monday", value: fillFrom },
			{ day: "Tuesday", value: fillFrom },
			{ day: "Wednesday", value: fillFrom },
			{ day: "Thursday", value: fillFrom },
			{ day: "Friday", value: fillFrom },
			{ day: "Saturday", value: fillFrom },
			{ day: "Sunday", value: "" },
		]);
	}

	return (
		<table className={tableStyles.table}>
			<thead
				className={tableStyles.tableHead}
				style={{ color: theme == "dark" ? "white" : null }}
			>
				<tr>
					<th colSpan={2}>{building.buildingName}</th>
				</tr>
				<tr>
					<th>Fill from</th>
					<th className={tableStyles.fillTable}>
						<TinyInput
							value={fillFrom}
							onChange={(e) => setFillFrom(e.target.value)}
						></TinyInput>
						<Image
							src={saveIcon}
							onClick={handleSave}
							alt="save table changes"
						/>
					</th>
				</tr>
			</thead>
			<tbody className={tableStyles.tableBody}>
				{activeDays.map((entry, index) => (
					<tr key={entry.day} className={tableStyles.tableRow}>
						<td>{entry.day}</td>
						<td className={tableStyles.inputTd}>
							<TableInput
								value={activeDays.map((a) => a.value)[index]}
								onChange={(e) => {
									let newActiveDays = activeDays.map((activeDay, i) => {
										if (index === i) {
											return {
												day: activeDay.day,
												value: e.target.value,
											};
										} else {
											return {
												day: activeDay.day,
												value: activeDay.value,
											};
										}
									});
									setActiveDays(newActiveDays);
								}}
								onBlur={() =>
									dispatchExamInputStateAction({
										type: "setSchedule",
										buildingName: building.buildingName,
										newBuildingSchedule: activeDays,
									})
								}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default ScheduleTable;

// function printPosition(value) {
// 	switch (value) {
// 		case "doctor":
// 			return "Doctor";
// 		case "secretary":
// 			return "Secretary";
// 		default:
// 			return "";
// 	}
// }

// function printPosition2(value) {
// 	switch (value) {
// 		case "frontDesk":
// 			return "Front Desk";
// 		case "trascriptionist":
// 			return "Trascriptionist";
// 		case "	phoneCenter":
// 			return "Phone Center";
// 		default:
// 			return "";
// 	}
// }
