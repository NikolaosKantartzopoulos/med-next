import React, { useContext } from "react";
import UsersContext from "../../../../../helper/store/users-context";

import ManageUserInputs from "./ManageUserInputs";

import InfoPanel from "../../../../UI/InfoPanel";
import ManageUsersTable from "./ManageUsersTable";
import ManageUsersUI from "./ManageUsersUI";
import Button from "../../../../UI/Button";

import styles from "./ManageUsers.module.css";

function ManageUsers() {
	const { actionLoaded, info, showThis, handlePostRequest } =
		useContext(UsersContext);
	return (
		<div className={styles.ManageUsersSection}>
			<div className={styles.UISection}>
				<ManageUsersUI />
				{showThis === "showManageUserInputs" && <ManageUserInputs />}
			</div>
			{info && <InfoPanel info={info} />}
			<Button
				onClick={handlePostRequest}
				customStyle={{ margin: "1rem auto", width: "100%" }}
				disabled={actionLoaded ? true : false}
			>
				Submit
			</Button>
			<ManageUsersTable />
		</div>
	);
}

export default ManageUsers;
