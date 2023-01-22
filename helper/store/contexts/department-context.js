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

	/********************************************************************
	 ********************************************************************
	 * DEPARTMENTS MANAGEMENT
	 ********************************************************************
	 ********************************************************************* */
	async function addNewDepartmentHandler(e) {
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

		const addDepRes = await fetch("/api/admin/manage-departments", {
			method: "POST",
			headers: {
				"Content-Type": "application-json",
			},
			body: JSON.stringify({ newDepartmentTitle: newDepartmentInput }),
		});
		if (addDepRes.ok) {
			const infoObj = await addDepRes.json();
			infoMessage(infoObj.type, infoObj.text);

			setActiveDepartments([
				...activeDepartments,
				{
					department: newDepartmentInput,
					sub: [],
					_id: infoObj._id,
				},
			]);
			setDepartmentName("");
			setNewDepartmentInput("");
		}
	}

	/********************************************************************
	 * DEPARTMENT EDIT
	 ********************************************************************/

	function editDepartmentNameHandler(e, dep) {
		setEditItemVisible("editDepartment");
		setSwitchIcons("showSave");
		setDepartmentName(dep.department);
		setDepartmentNameBeforeEdit(dep.department);
	}

	async function saveDepartmentNameHandler(e, item) {
		if (
			departmentName.trim() == "" ||
			activeDepartments.map((dep) => dep.department).includes(departmentName)
		) {
			infoMessage(
				"error",
				"A field is empty or department name already exists"
			);

			setSwitchIcons("showEdit");
			setEditItemVisible(null);
			return;
		}
		const departmentToChange = activeDepartments.find(
			(entry) => entry._id === item._id
		);

		const filteredArray = activeDepartments.filter(
			(entry) => entry._id !== item._id
		);

		let subdepartmentsIncluded = departmentToChange.sub;
		let addThisDepartment = {
			_id: item._id,
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

		const editDepRes = await fetch("/api/admin/manage-departments", {
			method: "PUT",
			headers: {
				"Content-Type": "application-json",
			},
			body: JSON.stringify({ editedDepartmentNewData: addThisDepartment }),
		});
		if (!editDepRes.ok) {
			infoMessage("error", "An error occured (500)");
			return;
		}
		const infoObj = await editDepRes.json();
		infoMessage(infoObj.type, infoObj.text);

		fetch("/api/admin/manage-departments", {
			method: "POST",
			body: JSON.stringify({ departmentNameBeforeEdit, departmentName }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		fetch("/api/admin/update-eco-department-name", {
			method: "POST",
			body: JSON.stringify({ departmentNameBeforeEdit, departmentName }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		fetch("/api/admin/update-exams-department-name", {
			method: "POST",
			body: JSON.stringify({ departmentNameBeforeEdit, departmentName }),
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	async function deleteDepartmentHandler(e, item) {
		const promptResponse = prompt(
			"Are you sure? This will delete all exams and all Eco information of this department! Type OK and confirm!"
		);
		console.log(promptResponse);
		const grRegex = new RegExp(/οκ/i);
		const enRegex = new RegExp(/ok/i);

		console.log(!grRegex.test(promptResponse), !enRegex.test(promptResponse));

		if (!grRegex.test(promptResponse) && !enRegex.test(promptResponse)) {
			return;
		}
		console.log("pass");
		const filteredArray = activeDepartments.filter(
			(entry) => entry.department !== item.department
		);

		const delRes = await fetch("/api/admin/manage-departments", {
			method: "DELETE",
			body: item._id,
			headers: {
				"Content-Type": "text/plain",
			},
		});

		if (!delRes.ok) {
			infoMessage("error", "An error occured (500)");
		}
		const data = await delRes.json();
		infoMessage(data.type, data.text);

		fetch("/api/admin/update-eco-department-name", {
			method: "DELETE",
			body: item.department,
			headers: {
				"Content-Type": "text/plain",
			},
		});

		fetch("/api/admin/update-exams-department-name", {
			method: "DELETE",
			body: item.department,
			headers: {
				"Content-Type": "text/plain",
			},
		});

		setActiveDepartments([...filteredArray]);
	}

	/********************************************************************
	 ********************************************************************
	 * SUBDEPARTMENTS MANAGEMENT
	 ********************************************************************
	 ********************************************************************* */

	function addNewSubdepartmentHandler(e, departmentToEdit) {
		setDepartmentName(departmentToEdit.department);
		setDepartmentNameBeforeEdit(departmentToEdit.department);
		setSwitchIcons("showSubSave");
		setEditItemVisible(null);
	}

	/***************************************************
	 *	ADD NEW SUBDEPARTMENT
	 ***************************************************/

	async function addNewSubdepartment(e, dep) {
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

		const addSubRes = await fetch("/api/admin/manage-subdepartments", {
			method: "POST",
			headers: { "Content-Type": "application-json" },
			body: JSON.stringify({
				dep: dep,
				newSubdepartment: newSubdepartmentInput,
			}),
		});

		if (addSubRes.ok) {
			const data = await addSubRes.json();
			infoMessage(data.type, data.text);
			setDepartmentName("");
			setNewDepartmentInput("");
			setNewSubdepartmentInput("");
			setActiveDepartments(toSet);
			setEditItemVisible(null);
			setSwitchIcons("showEdit");
		} else {
			infoMessage("error", "An error occured");
		}
	}

	function editSubHandler(e, departmentItem, subdepartmentNameValue) {
		setEditItemVisible("editSubdepartment");
		setDepartmentName(departmentItem.department);
		setSubepartmentName(subdepartmentNameValue);
		setSubdepartmentNameBeforeEdit(subdepartmentNameValue);
	}

	/***************************************************
	 *	SAVE EDITED SUBDEPARTMENT
	 ***************************************************/

	async function saveEditedSubdepartmentInfo(
		e,
		selectedDepartment,
		selectedSubdepartment
	) {
		e.preventDefault();

		console.log(selectedDepartment, selectedSubdepartment);

		if (subdepartmentName.trim() === "") {
			infoMessage("error", "A field is empty");
			return;
		}

		const departmentToChange = activeDepartments.find(
			(entry) => entry.department === selectedDepartment.department
		);

		const filteredArray = activeDepartments.filter(
			(entry) => entry.department !== selectedDepartment.department
		);

		let filteredSubdepartments = departmentToChange.sub.filter(
			(a) => a != selectedSubdepartment
		);

		let orderedSubdepartments = [
			...filteredSubdepartments,
			subdepartmentName,
		].sort((a, b) => (a > b ? 1 : -1));

		const putSubRes = await fetch("/api/admin/manage-subdepartments", {
			method: "PUT",
			body: JSON.stringify({
				selectedDepartment: selectedDepartment,
				subdepartmentName: subdepartmentName,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (putSubRes.ok) {
			const data = await putSubRes.json();
			infoMessage(data.type, data.text);

			let addThisDepartment = {
				department: selectedDepartment.department,
				sub: orderedSubdepartments,
			};

			const newArray = [...filteredArray, addThisDepartment];
			const toSet = [...newArray].sort((a, b) =>
				a.department > b.department ? 1 : -1
			);

			setActiveDepartments(toSet);
			setEditItemVisible(null);
			setSubdepartmentNameBeforeEdit(null);

			fetch("/api/admin/update-eco-subdepartment-name", {
				method: "POST",
				body: JSON.stringify({ selectedSubdepartment, subdepartmentName }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			fetch("/api/admin/update-exams-subdepartment-name", {
				method: "POST",
				body: JSON.stringify({ selectedSubdepartment, subdepartmentName }),
				headers: {
					"Content-Type": "application/json",
				},
			});
		}
	}

	/************************************************************************
	 * DELETE SUBDEPARTMENT
	 ***********************************************************************/

	async function deleteSubHandler(e, departmentItem, subdepartmentNameValue) {
		const departmentToChange = activeDepartments.find(
			(entry) => entry.department === departmentItem.department
		);

		const filteredArray = activeDepartments.filter(
			(entry) => entry.department !== departmentItem.department
		);

		let filteredSubdepartments = departmentToChange.sub.filter(
			(a) => a != subdepartmentNameValue
		);

		let addThisDepartment = {
			department: departmentItem.department,
			sub: [...filteredSubdepartments],
		};

		const newArray = [...filteredArray, addThisDepartment];
		const toSet = [...newArray].sort((a, b) =>
			a.department > b.department ? 1 : -1
		);

		const delRes = await fetch("/api/admin/manage-subdepartments", {
			method: "DELETE",
			body: JSON.stringify({
				department: departmentItem,
				subdepartment: subdepartmentNameValue,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!delRes.ok) {
			infoMessage("error", "An error occured (500)");
		}
		const data = await delRes.json();
		infoMessage(data.type, data.text);

		// fetch("/api/admin/update-eco-subdepartment-name", {
		// 	method: "DELETE",
		// 	body: item.subdepartmentNameValue,
		// 	headers: {
		// 		"Content-Type": "text/plain",
		// 	},
		// });

		// fetch("/api/admin/update-exams-subdepartment-name", {
		// 	method: "DELETE",
		// 	body: item.subdepartmentNameValue,
		// 	headers: {
		// 		"Content-Type": "text/plain",
		// 	},
		// });

		setActiveDepartments(toSet);
	}

	/********************************************************************
	 ********************************************************************
	 * REST
	 ********************************************************************
	 ********************************************************************* */

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
