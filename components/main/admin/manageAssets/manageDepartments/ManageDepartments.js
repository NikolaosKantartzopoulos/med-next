import React, { useContext } from "react";
import LanguageContext from "../../../../../helper/store/language-context";
import DepartmentContext from "../../../../../helper/store/department-context.js";
import Button from "../../../../UI/Button.js";
import SingleInputForm from "../../../../UI/SingleInputForm";
import DepBoard from "./DepBoard.js";
import InfoPanel from "../../../../UI/InfoPanel";
import LoadingSpinner from "../../../../UI/LoadingSpinner";

import styles from "./ManageDepartments.module.css";

function ManageDepartments() {
	const { lng } = useContext(LanguageContext);
	const {
		addNewDepartmentHandler,
		editItemVisible,
		handlePostRequest,
		newDepartmentInput,
		setNewDepartmentInput,
		info,
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
						label={lng("Add")}
						buttonText={lng("Add")}
						onSubmit={(e) => addNewDepartmentHandler(e)}
						value={newDepartmentInput}
						onChange={(e) => setNewDepartmentInput(e.target.value)}
					/>
				)}
			</div>
			{info && <InfoPanel info={info} />}
			{/* <Button
				onClick={handlePostRequest}
				customStyle={{ margin: "auto", width: "100%", marginBottom: "1rem" }}
				disabled={editItemVisible ? true : false}
			>
				Submit
			</Button> */}
			<DepBoard />
		</div>
	);
}

export default ManageDepartments;
