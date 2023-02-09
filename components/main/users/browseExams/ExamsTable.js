import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import tableStyles from "./ExamsTable.module.css";
import LoadingSpinner from "../../../UI/LoadingSpinner";
import LanguageContext from "../../../../helper/store/contexts/language-context";
import ToolsContext from "../../../../helper/store/contexts/tools-context";

function ExamsTable({ allActiveExams }) {
	const router = useRouter();
	const toolsCtx = useContext(ToolsContext);
	const { lng } = useContext(LanguageContext);

	function handleRowCLick(e, item) {
		toolsCtx.setExamLoaded(item);
	}

	useEffect(() => {
		if (toolsCtx.examLoaded) {
			setTimeout(() => {
				router.push(`/users/browse-exams/${toolsCtx.examLoaded.name}`);
			}, 500);
		}
	}, [toolsCtx.examLoaded]);

	return (
		<div style={{ color: "black" }}>
			{allActiveExams ? (
				<table className={tableStyles.table} style={{ color: "black" }}>
					<thead className={tableStyles.tableHead}>
						<tr>
							<th>{lng("Department")}</th>
							<th>{lng("Subdepartment")}</th>
							<th>{lng("Name")}</th>
							{/* <th colSpan="2">Actions</th> */}
						</tr>
					</thead>
					<tbody className={tableStyles.tableBody}>
						{allActiveExams
							.sort((a, b) => (a.name > b.name ? 1 : -1))
							.map((item) => (
								<tr key={item._id} onClick={(e) => handleRowCLick(e, item)}>
									<td>{item.department}</td>
									<td>{item.subdepartment}</td>
									<td>{item.name}</td>
								</tr>
							))}
					</tbody>
				</table>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}

export default ExamsTable;
