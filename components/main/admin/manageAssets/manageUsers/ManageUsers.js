import React, { useContext } from "react";
import UsersContext from "../../../../../helper/store/contexts/users-context";

import ManageUserInputs from "./ManageUserInputs";

import InfoPanel from "../../../../UI/InfoPanel";
import LoadingSpinner from "../../../../UI/LoadingSpinner";
import ManageUsersTable from "./ManageUsersTable";
import ManageUsersUI from "./ManageUsersUI";
import Button from "../../../../UI/Button";

import styles from "./ManageUsers.module.css";

function ManageUsers() {
	const { actionLoaded, info, isLoading, showThis, handlePostRequest } =
		useContext(UsersContext);

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div className={styles.ManageUsersSection}>
			<div className={styles.UISection}>
				<ManageUsersUI />
				{showThis === "showManageUserInputs" && <ManageUserInputs />}
			</div>
			{info && <InfoPanel info={info} />}
			<ManageUsersTable />
		</div>
	);
}

export default ManageUsers;
