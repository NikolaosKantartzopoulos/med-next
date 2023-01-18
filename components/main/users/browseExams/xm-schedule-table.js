import React, { useContext } from "react";
import tableStyles from "./xm-schedule-table.module.css";

import LanguageContext from "../../../../helper/store/contexts/language-context";
import ToolsContext from "../../../../helper/store/contexts/tools-context";

function ScheduleTable({ building }) {
	const activeDays = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

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
	const { theme } = useContext(ToolsContext);
	const { lng } = useContext(LanguageContext);
	return (
		<>
			{building.schedule ? (
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
								{building.duration ? building.duration : <span>---</span>}
							</th>
						</tr>
					</thead>
					<tbody className={tableStyles.tableBody}>
						{building.schedule.map((entry, index) => (
							<tr key={entry.day} className={tableStyles.tableRow}>
								<td>{translateDays(entry.day)}</td>
								<td className={tableStyles.inputTd}>{entry.value}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : null}
		</>
	);
}

export default ScheduleTable;
