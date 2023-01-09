import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import tableStyles from "./ExamsTable.module.css";
import editIcon from "../../../../../public/images/edit.svg";
import deleteIcon from "../../../../../public/images/delete.svg";
import LoadingSpinner from "../../../../UI/LoadingSpinner";
import InfoPanel from "../../../../UI/InfoPanel";
import LanguageContext from "../../../../../helper/store/contexts/language-context";

function ExamsTable({ allActiveExams }) {
	const router = useRouter();
	const { lng } = useContext(LanguageContext);
	const [info, setInfo] = useState(null);

	function setEditItem(e, item) {
		router.push({
			pathname: `/admin/manage-exams/${item.name}/${item.department}/${item.subdepartment}`,
		});
	}

	function deleteItem(e, item) {
		fetch("/api/admin/edit-exam", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(item),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.deleted) {
					setInfo({ type: "ok", text: "Data deleted" });
					setTimeout(() => setInfo(null), 2000);
					router.reload();
				} else {
					setInfo({ type: "error", text: "Error" });
					setTimeout(() => setInfo(null), 2000);
				}
			});
	}

	return (
		<>
			{info && <InfoPanel info={info} />}
			{allActiveExams ? (
				<table className={tableStyles.table}>
					<thead className={tableStyles.tableHead}>
						<tr>
							<th>{lng("Name")}</th>
							<th>{lng("Department")}</th>
							<th>{lng("Subdepartment")}</th>
							<th colSpan="2">{lng("Actions")}</th>
						</tr>
					</thead>
					<tbody className={tableStyles.tableBody}>
						{allActiveExams.map((item) => (
							<tr key={item._id}>
								<td>{item.name}</td>
								<td>{item.department}</td>
								<td>{item.subdepartment}</td>
								<td>
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
								</td>
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
