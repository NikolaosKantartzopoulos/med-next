import React, { useState } from "react";
import Button from "../../../../UI/Button.js";
import Image from "next/image.js";
import TinyInput from "../../../../UI/TinyInput.js";

import ResponsiveItem from "../../../../UI/ResponsiveItem.js";
import SingleInputForm from "../../../../UI/SingleInputForm";
import addIcon from "../../../../../public/images/plus.svg";
import editIcon from "../../../../../public/images/edit.svg";
import deleteIcon from "../../../../../public/images/delete.svg";
import saveIcon from "../../../../../public/images/save.svg";

import styles from "./ListExistingDepartments.module.css";

function ListExistingDepartments({ allDepartments }) {
	const [editItemVisible, setEditItemVisible] = useState(null);
	const [activeDepartments, setActiveDepartments] = useState(
		[...allDepartments].sort((a, b) => (a.department > b.department ? 1 : -1))
	);
	const [departmentName, setDepartmentName] = useState("");
	const [subdepartmentName, setSubepartmentName] = useState("");
	const [departmentNameBeforeEdit, setDepartmentNameBeforeEdit] = useState("");
	const [subdepartmentNameBeforeEdit, setSubdepartmentNameBeforeEdit] =
		useState("");
	const [newDepartmentInput, setNewDepartmentInput] = useState("");
	const [newSubdepartmentInput, setNewSubdepartmentInput] = useState("");

	const [switchIcons, setSwitchIcons] = useState("showEdit");

	// DEPARTMENTS MANAGEMENT

	function addNewDepartmentHandler(e) {
		e.preventDefault();
		if (
			newDepartmentInput.trim() == "" ||
			activeDepartments
				.map((dep) => dep.department)
				.includes(newDepartmentInput)
		) {
			return;
		}

		setActiveDepartments([
			...activeDepartments,
			{
				department: newDepartmentInput,
				sub: [],
			},
		]);
		setDepartmentName("");
		setNewDepartmentInput("");
	}
	function editDepartmentNameHandler(e, currentName) {
		setEditItemVisible("editDepartment");
		setSwitchIcons("showSave");
		setDepartmentName(currentName);
		setDepartmentNameBeforeEdit(currentName);
	}

	function saveDepartmentNameHandler(e, selectedDepartment) {
		if (
			departmentName.trim() == "" ||
			activeDepartments.map((dep) => dep.department).includes(departmentName)
		) {
			setSwitchIcons("showEdit");
			setEditItemVisible(null);
			return;
		}
		const departmentToChange = activeDepartments.find(
			(entry) => entry.department === departmentNameBeforeEdit
		);

		const filteredArray = activeDepartments.filter(
			(entry) => entry.department !== departmentNameBeforeEdit
		);

		let subdepartmentsIncluded = departmentToChange.sub;
		let addThisDepartment = {
			department: departmentName,
			sub: subdepartmentsIncluded,
		};

		const newArray = [...filteredArray, addThisDepartment];
		const toSet = [...newArray].sort((a, b) =>
			a.department > b.department ? 1 : -1
		);

		setActiveDepartments(toSet);

		setSwitchIcons("showEdit");
		setEditItemVisible(null);
		setSubdepartmentNameBeforeEdit(null);
		setDepartmentName("");
		setNewDepartmentInput("");
	}
	function deleteDepartmentHandler(e, toBeDeleted) {
		const filteredArray = activeDepartments.filter(
			(entry) => entry.department !== toBeDeleted
		);
		setActiveDepartments([...filteredArray]);
	}

	// SUBDEPARTMENTS MANAGEMENT

	function addNewSubdepartmentHandler(e, departmentToEdit) {
		setDepartmentName(departmentToEdit);
		setDepartmentNameBeforeEdit(departmentToEdit);
		setSwitchIcons("showSubSave");
		setEditItemVisible(null);
	}

	function addNewSubdepartment(e) {
		if (newSubdepartmentInput.trim() == "") {
			setDepartmentName("");
			setNewDepartmentInput("");
			setNewSubdepartmentInput("");

			setEditItemVisible(null);
			setSwitchIcons("showEdit");
			return;
		}
		const departmentToChange = activeDepartments.find(
			(entry) => entry.department === departmentName
		);

		const filteredArray = activeDepartments.filter(
			(entry) => entry.department !== departmentName
		);

		let subdepartments = departmentToChange.sub;

		let addThisDepartment = {
			department: departmentName,
			sub: [...subdepartments, newSubdepartmentInput],
		};

		const newArray = [...filteredArray, addThisDepartment];
		const toSet = [...newArray].sort((a, b) =>
			a.department > b.department ? 1 : -1
		);
		setDepartmentName("");
		setNewDepartmentInput("");
		setNewSubdepartmentInput("");
		setActiveDepartments(toSet);
		setEditItemVisible(null);
		setSwitchIcons("showEdit");
	}
	function editSubHandler(e, departmentNameValue, subdepartmentNameValue) {
		setEditItemVisible("editSubdepartment");
		setDepartmentName(departmentNameValue);
		setSubepartmentName(subdepartmentNameValue);
		setSubdepartmentNameBeforeEdit(subdepartmentNameValue);
	}
	function saveEditedSubdepartmentInfo(
		e,
		selectedDepartment,
		selectedSubdepartment
	) {
		e.preventDefault();
		const departmentToChange = activeDepartments.find(
			(entry) => entry.department === selectedDepartment
		);

		const filteredArray = activeDepartments.filter(
			(entry) => entry.department !== selectedDepartment
		);

		let filteredSubdepartments = departmentToChange.sub.filter(
			(a) => a != selectedSubdepartment
		);

		let orderedSubdepartments = [
			...filteredSubdepartments,
			subdepartmentName,
		].sort((a, b) => (a > b ? 1 : -1));

		let addThisDepartment = {
			department: selectedDepartment,
			sub: orderedSubdepartments,
		};

		const newArray = [...filteredArray, addThisDepartment];
		const toSet = [...newArray].sort((a, b) =>
			a.department > b.department ? 1 : -1
		);

		setActiveDepartments(toSet);
		setEditItemVisible(null);
		setSubdepartmentNameBeforeEdit(null);
	}
	function deleteSubHandler(e, departmentNameValue, subdepartmentNameValue) {
		const departmentToChange = activeDepartments.find(
			(entry) => entry.department === departmentNameValue
		);

		const filteredArray = activeDepartments.filter(
			(entry) => entry.department !== departmentNameValue
		);

		let filteredSubdepartments = departmentToChange.sub.filter(
			(a) => a != subdepartmentNameValue
		);

		let addThisDepartment = {
			department: departmentNameValue,
			sub: [...filteredSubdepartments],
		};

		const newArray = [...filteredArray, addThisDepartment];
		const toSet = [...newArray].sort((a, b) =>
			a.department > b.department ? 1 : -1
		);

		setActiveDepartments(toSet);
	}
	//POST
	async function handlePostRequest() {
		let toPut = { activeDepartments: activeDepartments };

		const result = await fetch("/api/admin/manage-departments", {
			method: "PUT",
			body: JSON.stringify(toPut),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await result.json();
	}

	return (
		<div className={styles.ListExistingDepartments}>
			<div className={styles.addDepartment}>
				{!editItemVisible && (
					<SingleInputForm
						id="addNewDepartment"
						label="Add"
						onSubmit={(e) => addNewDepartmentHandler(e)}
						value={newDepartmentInput}
						onChange={(e) => setNewDepartmentInput(e.target.value)}
						buttonText="Add"
					/>
				)}
			</div>
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
										onClick={(e) =>
											addNewSubdepartmentHandler(e, dep.department)
										}
									/>
								) : (
									<div className={styles.iconPlaceholder}></div>
								)}
								{departmentNameBeforeEdit === dep.department &&
									switchIcons === "showSubSave" && (
										<Image
											src={saveIcon}
											alt="save-subdepartment"
											onClick={(e) => addNewSubdepartment(e)}
										/>
									)}
								{switchIcons === "showEdit" && (
									<Image
										src={editIcon}
										alt="edit-department"
										onClick={(e) =>
											editDepartmentNameHandler(e, dep.department)
										}
									/>
								)}
								{departmentNameBeforeEdit === dep.department &&
									switchIcons === "showSave" &&
									editItemVisible === "editDepartment" && (
										<Image
											src={saveIcon}
											alt="save-department"
											onClick={(e) =>
												saveDepartmentNameHandler(e, dep.department)
											}
										/>
									)}
								{switchIcons === "showEdit" && (
									<Image
										src={deleteIcon}
										alt={"delete-department"}
										onClick={(e) => deleteDepartmentHandler(e, dep.department)}
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

			{!editItemVisible && (
				<Button onClick={handlePostRequest} customStyle={{ margin: "auto" }}>
					Submit
				</Button>
			)}
		</div>
	);
}

export default ListExistingDepartments;
