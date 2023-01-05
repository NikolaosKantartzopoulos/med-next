import React, { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import tableStyles from "./ExamsTable.module.css";
import editIcon from "../../../../public/images/edit.svg";
import deleteIcon from "../../../../public/images/delete.svg";
import LoadingSpinner from "../../../UI/LoadingSpinner";

function ExamsTable({ allActiveExams }) {
	const router = useRouter();

	// function setEditItem(e, item) {
	// 	router.push({
	// 		pathname: `/users/browse-exams/${item.name}/${item.department}/${item.subdepartment}`,
	// 	});
	// }

	// async function deleteItem(e, item) {
	// 	console.log("test");
	// 	console.log(item);
	// }

	return (
		<>
			{allActiveExams ? (
				<table className={tableStyles.table}>
					<thead className={tableStyles.tableHead}>
						<tr>
							<th>Name</th>
							<th>Department</th>
							<th>Subdepartment</th>
							{/* <th colSpan="2">Actions</th> */}
						</tr>
					</thead>
					<tbody className={tableStyles.tableBody}>
						{allActiveExams.map((item) => (
							<tr key={item._id}>
								<td>{item.name}</td>
								<td>{item.department}</td>
								<td>{item.subdepartment}</td>
								{/* <td>
									<Image
										src={editIcon}
										alt="edititem"
										onClick={(e) => setEditItem(e, item)}
									/>
								</td>
								<td>
									<Image
										src={deleteIcon}
										alt="deleteItem"
										onClick={(e) => deleteItem(e, item)}
									/>
								</td> */}
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