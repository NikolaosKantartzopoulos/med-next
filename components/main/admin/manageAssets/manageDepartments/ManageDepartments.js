import React, { useContext } from "react";
import LanguageContext from "../../../../../helper/store/contexts/language-context";
import DepartmentContext from "../../../../../helper/store/contexts/department-context.js";

import DepBoard from "./DepBoard.js";

import SingleInputForm from "../../../../UI/SingleInputForm";
import LoadingSpinner from "../../../../UI/LoadingSpinner";

import styles from "./ManageDepartments.module.css";

function ManageDepartments() {
	const { lng } = useContext(LanguageContext);
	const {
		addNewDepartmentHandler,
		editItemVisible,
		newDepartmentInput,
		setNewDepartmentInput,
		isLoading,
	} = useContext(DepartmentContext);

	if (isLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div className={styles.ListExistingDepartments}>
			<div className={styles.addDepartment}>
				{!editItemVisible && (
					<SingleInputForm
						id="addNewDepartment"
						label={null}
						buttonText={lng("Add")}
						onSubmit={(e) => addNewDepartmentHandler(e)}
						value={newDepartmentInput}
						onChange={(e) => setNewDepartmentInput(e.target.value)}
					/>
				)}
			</div>

			<DepBoard />
		</div>
	);
}

export default ManageDepartments;
