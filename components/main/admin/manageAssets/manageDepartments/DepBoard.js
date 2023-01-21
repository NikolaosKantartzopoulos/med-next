import React, { useContext } from "react";
import DepartmentContext from "../../../../../helper/store/contexts/department-context.js";

import Image from "next/image.js";
import TinyInput from "../../../../UI/TinyInput.js";

import ResponsiveItem from "../../../../UI/ResponsiveItem.js";
import addIcon from "../../../../../public/images/plus.svg";
import editIcon from "../../../../../public/images/edit.svg";
import deleteIcon from "../../../../../public/images/delete.svg";
import saveIcon from "../../../../../public/images/save.svg";
import styles from "./ManageDepartments.module.css";

function DepBoard() {
	const {
		activeDepartments,
		addNewSubdepartment,
		addNewSubdepartmentHandler,
		deleteDepartmentHandler,
		deleteSubHandler,
		departmentName,
		departmentNameBeforeEdit,
		editDepartmentNameHandler,
		editItemVisible,
		editSubHandler,
		newSubdepartmentInput,
		saveDepartmentNameHandler,
		saveEditedSubdepartmentInfo,
		setDepartmentName,
		setNewSubdepartmentInput,
		setSubepartmentName,
		subdepartmentName,
		subdepartmentNameBeforeEdit,
		switchIcons,
	} = useContext(DepartmentContext);

	return (
		<div className={styles.arrayComponent}>
			{activeDepartments.map((dep) => (
				<div key={dep.department} className={styles.department}>
					<div className={styles.departmentTitle}>
						{departmentNameBeforeEdit === dep.department && (
							<>
								{switchIcons === "showSubSave" && (
									<TinyInput
										id="newSubInput"
										value={newSubdepartmentInput}
										onChange={(e) => setNewSubdepartmentInput(e.target.value)}
									/>
								)}
								{editItemVisible === "editDepartment" && (
									<TinyInput
										id={dep.department}
										value={departmentName}
										onChange={(e) => setDepartmentName(e.target.value)}
									/>
								)}
							</>
						)}
						{dep.department}

						<div className={styles.departmentOptions}>
							{switchIcons === "showEdit" ? (
								<Image
									src={addIcon}
									alt="add-subdepartment"
									onClick={(e) => addNewSubdepartmentHandler(e, dep)}
								/>
							) : (
								<div className={styles.iconPlaceholder}></div>
							)}
							{departmentNameBeforeEdit === dep.department &&
								switchIcons === "showSubSave" && (
									<Image
										src={saveIcon}
										alt="save-subdepartment"
										onClick={(e) => addNewSubdepartment(e, dep)}
									/>
								)}
							{switchIcons === "showEdit" && (
								<Image
									src={editIcon}
									alt="edit-department"
									onClick={(e) => editDepartmentNameHandler(e, dep)}
								/>
							)}
							{departmentNameBeforeEdit === dep.department &&
								switchIcons === "showSave" &&
								editItemVisible === "editDepartment" && (
									<Image
										src={saveIcon}
										alt="save-edited-department"
										onClick={(e) => saveDepartmentNameHandler(e, dep)}
									/>
								)}
							{switchIcons === "showEdit" && (
								<Image
									src={deleteIcon}
									alt={"delete-department"}
									onClick={(e) => deleteDepartmentHandler(e, dep)}
								/>
							)}
						</div>
					</div>

					<div className={styles.subdepartments}>
						{dep.sub.map((b) => (
							<ResponsiveItem
								key={b}
								deleteItemHandler={deleteSubHandler}
								editItemHandler={editSubHandler}
								saveItemHandler={saveEditedSubdepartmentInfo}
								tier1={dep.department}
								tier2={b}
								helperValue={subdepartmentNameBeforeEdit}
							>
								{subdepartmentNameBeforeEdit === b ? (
									<TinyInput
										id={b}
										value={subdepartmentName}
										onChange={(e) => setSubepartmentName(e.target.value)}
									/>
								) : (
									b
								)}
							</ResponsiveItem>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export default DepBoard;
