import React, { useContext } from "react";
import UsersContext from "../../../../../helper/store/users-context";
import Image from "next/image";
import tableStyles from "./ManageUsersTable.module.css";
import editIcon from "../../../../../public/images/edit.svg";
import deleteIcon from "../../../../../public/images/delete.svg";
import LanguageContext from "../../../../../helper/store/language-context";

function ManageUsersTable() {
	const { activeUsers, editThisUser, deleteThisUser } =
		useContext(UsersContext);
	const { lng } = useContext(LanguageContext);

	function printPosition(value) {
		switch (value) {
			case "doctor":
				return lng("Doctor");
			case "secretary":
				return lng("Secretary");
			default:
				return "";
		}
	}

	function printPosition2(value) {
		switch (value) {
			case "frontDesk":
				return lng("FrontDesk");
			case "trascriptionist":
				return lng("Transcriptionist");
			case "phoneCenter":
				return lng("PhoneCenter");
			default:
				return "";
		}
	}

	return (
		<table className={tableStyles.table}>
			<thead className={tableStyles.tableHead}>
				<tr>
					<th>Username</th>
					<th>Email</th>
					<th>Password</th>
					<th>{lng("Position")}</th>
					<th>{lng("Position2")}</th>
					<th colSpan="2">Actions</th>
				</tr>
			</thead>
			<tbody className={tableStyles.tableBody}>
				{activeUsers.map((user) => (
					<tr key={user.email}>
						<td>{user.username}</td>
						<td>{user.email}</td>
						<td>{user.password}</td>
						<td>{printPosition(user.position)}</td>
						<td>{printPosition2(user.position2)}</td>
						<td>
							<Image
								src={editIcon}
								alt="editUser"
								onClick={(e) => editThisUser(e, user)}
							/>
						</td>
						<td>
							<Image
								src={deleteIcon}
								alt="deleteUser"
								onClick={(e) => deleteThisUser(e, user)}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default ManageUsersTable;
