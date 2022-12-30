import React from "react";
import Image from "next/image";
import tableStyles from "./ManageUsersTable.module.css";
import editIcon from "../../../../../public/images/edit.svg";
import deleteIcon from "../../../../../public/images/delete.svg";

function printPosition(value) {
	switch (value) {
		case "doctor":
			return "Doctor";
		case "secretary":
			return "Secretary";
		default:
			return "";
	}
}

function printPosition2(value) {
	switch (value) {
		case "frontDesk":
			return "Front Desk";
		case "typist":
			return "Typist";
		case "	phoneCenter":
			return "Phone Center";
		default:
			return "";
	}
}

function ManageUsersTable({ activeUsers, editThisUser, deleteThisUser }) {
	return (
		<table className={tableStyles.table}>
			<thead className={tableStyles.tableHead}>
				<tr>
					<th>Username</th>
					<th>Email</th>
					<th>Password</th>
					<th>Position</th>
					<th>Position2</th>
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
