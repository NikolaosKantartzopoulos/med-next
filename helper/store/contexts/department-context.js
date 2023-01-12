import React, { createContext, useState } from "react";
import { infoMessage } from "../../fn/ui";

const DepartmentContext = createContext({});

export function DepartmentContextProvider({
	allDepartments,
	info,
	setInfo,
	infoMessage,
	children,
}) {
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
	const [isLoading, setIsLoading] = useState(false);

	// DEPARTMENTS MANAGEMENT

	function addNewDepartmentHandler(e) {
		e.preventDefault();
		if (
			activeDepartments
				.map((dep) => dep.department)
				.includes(newDepartmentInput)
		) {
			infoMessage("error", "Department exists");
			return;
		}
		if (newDepartmentInput.trim() == "") {
			infoMessage("error", "A field is empty");
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
		handlePostRequest([
			...activeDepartments,
			{
				department: newDepartmentInput,
				sub: [],
			},
		]);
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
			infoMessage("error", "A field is empty");

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
		handlePostRequest(toSet);
	}
	function deleteDepartmentHandler(e, toBeDeleted) {
		const filteredArray = activeDepartments.filter(
			(entry) => entry.department !== toBeDeleted
		);
		setActiveDepartments([...filteredArray]);
		handlePostRequest([...filteredArray]);
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
			infoMessage("error", "A field is empty");

			setEditItemVisible(null);
			setSwitchIcons("showEdit");
			return;
		}
		const departmentToChange = activeDepartments.find(
			(entry) => entry.department === departmentName
		);
		if (departmentToChange.sub.includes(newSubdepartmentInput)) {
			setInfo({ type: "error", text: "Subdepartment exists" });
			setTimeout(() => setInfo(null), 3000);
			return;
		}

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
		handlePostRequest(newArray);
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

		if (subdepartmentName.trim() === "") {
			infoMessage("error", "A field is empty");
			return;
		}

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
		handlePostRequest(toSet);
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
		handlePostRequest(toSet);
	}
	//POST
	async function handlePostRequest(these) {
		let toPut = { activeDepartments: these };
		setIsLoading(true);
		const result = await fetch("/api/admin/manage-departments", {
			method: "PUT",
			body: JSON.stringify(toPut),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await result.json();
		setIsLoading(false);
	}

	const departmentContext = {
		activeDepartments,
		addNewDepartmentHandler,
		addNewSubdepartment,
		addNewSubdepartmentHandler,
		deleteDepartmentHandler,
		deleteSubHandler,
		departmentName,
		departmentNameBeforeEdit,
		editDepartmentNameHandler,
		editItemVisible,
		editSubHandler,
		handlePostRequest,
		info,
		isLoading,
		newDepartmentInput,
		newSubdepartmentInput,
		saveDepartmentNameHandler,
		saveEditedSubdepartmentInfo,
		setActiveDepartments,
		setDepartmentName,
		setDepartmentNameBeforeEdit,
		setEditItemVisible,
		setInfo,
		setNewDepartmentInput,
		setNewSubdepartmentInput,
		setSubdepartmentNameBeforeEdit,
		setSubepartmentName,
		setSwitchIcons,
		subdepartmentName,
		subdepartmentNameBeforeEdit,
		switchIcons,
	};
	return (
		<DepartmentContext.Provider value={departmentContext}>
			{children}
		</DepartmentContext.Provider>
	);
}

export default DepartmentContext;
