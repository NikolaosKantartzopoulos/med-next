import React, { useContext } from "react";

import UsersContext from "../../../../../helper/store/contexts/users-context";

import ManageUsersUI from "./ManageUsersUI";
import ManageUserInputs from "./ManageUserInputs";
import ManageUsersTable from "./ManageUsersTable";

import LoadingSpinner from "../../../../UI/LoadingSpinner";

import styles from "./ManageUsers.module.css";

function ManageUsers() {
	const { isLoading, actionLoaded } = useContext(UsersContext);

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div className={styles.ManageUsersSection}>
			<div className={styles.UISection}>
				<ManageUsersUI />
				{actionLoaded && <ManageUserInputs />}
			</div>
			<ManageUsersTable />
		</div>
	);
}

export default ManageUsers;
