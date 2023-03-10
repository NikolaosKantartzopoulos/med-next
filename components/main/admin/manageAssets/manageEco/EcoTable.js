import React, { useContext } from "react";
import LanguageContext from "../../../../../helper/store/contexts/language-context.js";
import EcoContext from "../../../../../helper/store/contexts/eco-context.js";

import Image from "next/image";
import tableStyles from "./EcoTable.module.css";
import editIcon from "../../../../../public/images/edit.svg";
import deleteIcon from "../../../../../public/images/delete.svg";

function EcoTable() {
	const { lng } = useContext(LanguageContext);
	const {
		setEditItem,
		deleteItem,
		allActiveInsurances,
		checkedInsurances,
		checkedDepartments,
	} = useContext(EcoContext);
	return (
		<table className={tableStyles.table}>
			<thead className={tableStyles.tableHead}>
				<tr>
					<th>{lng("Insurance")}</th>
					<th>{lng("Department")}</th>
					<th>{lng("Subdepartment")}</th>
					<th>{lng("Cost")}</th>
					<th colSpan="2">{lng("Actions")}</th>
				</tr>
			</thead>
			<tbody className={tableStyles.tableBody}>
				{allActiveInsurances
					.filter((a) => checkedInsurances.includes(a.title))
					.filter((a) => checkedDepartments.includes(a.department))
					.map((item) => (
						<tr key={item._id}>
							<td>{item.title}</td>
							<td>{item.department}</td>
							<td>{item.subdepartment}</td>
							<td>{item.cost}</td>
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
	);
}

export default EcoTable;
