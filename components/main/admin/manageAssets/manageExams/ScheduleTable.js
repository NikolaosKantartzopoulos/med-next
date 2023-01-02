import React, { useState } from "react";
import tableStyles from "./ScheduleTable.module.css";
import TableInput from "../../../../UI/TableInput";

function ScheduleTable({ building, dispatchExamInputStateAction }) {
	const [activeDays, setActiveDays] = useState(building.schedule);
	return (
		<table className={tableStyles.table}>
			<thead className={tableStyles.tableHead}>
				<tr>
					<th colSpan={2}>{building.buildingName}</th>
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