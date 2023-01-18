import React, { useContext, useEffect, useState } from "react";
import tableStyles from "./ScheduleTable.module.css";
import TableInput from "../../../../UI/TableInput";
import TinyInput from "../../../../UI/TinyInput";
import saveIcon from "../../../../../public/images/save.svg";

import Image from "next/image";
import ToolsContext from "../../../../../helper/store/contexts/tools-context";
import LanguageContext from "../../../../../helper/store/contexts/language-context";

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

	function translateDays(day) {
		switch (day) {
			case "Monday":
				return lng("Monday");

			case "Tuesday":
				return lng("Tuesday");

			case "Wednesday":
				return lng("Wednesday");

			case "Thursday":
				return lng("Thursday");

			case "Friday":
				return lng("Friday");

			case "Saturday":
				return lng("Saturday");
			case "Sunday":
				return lng("Sunday");
		}
	}

	const { lng } = useContext(LanguageContext);
	return (
		<table className={tableStyles.table} style={{ color: "black" }}>
			<thead
				className={tableStyles.tableHead}
				style={{ color: theme == "dark" ? "white" : null }}
			>
				<tr>
					<th colSpan={2}>{building.buildingName}</th>
				</tr>
				<tr>
					<th>{lng("Duration")}</th>
					<th>
						<TinyInput
							value={building.duration}
							onChange={(e) =>
								dispatchExamInputStateAction({
									type: "setDuration",
									newDuration: e.target.value,
									buildingToHandle: building.buildingName,
								})
							}
						></TinyInput>
					</th>
				</tr>
				<tr>
					<th>{lng("FillFrom")}</th>
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
						<td>{translateDays(entry.day)}</td>
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
								onBlur={() => {
									dispatchExamInputStateAction({
										type: "setSchedule",
										buildingToHandle: building.buildingName,
										newBuildingSchedule: activeDays,
									});
								}}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default ScheduleTable;
