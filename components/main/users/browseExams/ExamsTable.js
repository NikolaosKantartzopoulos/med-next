import React, { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import tableStyles from "./ExamsTable.module.css";
import LoadingSpinner from "../../../UI/LoadingSpinner";

function ExamsTable({ allActiveExams }) {
	const router = useRouter();

	return (
		<>
			{allActiveExams ? (
				<table className={tableStyles.table}>
					<thead className={tableStyles.tableHead}>
						<tr>
							<th>Department</th>
							<th>Subd.</th>
							<th>Name</th>
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
