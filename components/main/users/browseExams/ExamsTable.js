import React, { useContext } from "react";
import { useRouter } from "next/router";
import tableStyles from "./ExamsTable.module.css";
import LoadingSpinner from "../../../UI/LoadingSpinner";
import LanguageContext from "../../../../helper/store/contexts/language-context";

function ExamsTable({ allActiveExams }) {
	const router = useRouter();
	const { lng } = useContext(LanguageContext);
	return (
		<>
			{allActiveExams ? (
				<table className={tableStyles.table}>
					<thead className={tableStyles.tableHead}>
						<tr>
							<th>{lng("Department")}</th>
							<th>{lng("Subdepartment")}</th>
							<th>{lng("Name")}</th>
							{/* <th colSpan="2">Actions</th> */}
						</tr>
					</thead>
					<tbody className={tableStyles.tableBody}>
						{allActiveExams.map((item) => (
							<tr key={item._id}>
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
		</>
	);
}

export default ExamsTable;
