import React, { useEffect, useState } from "react";
import styles from "./ExamFilterUI.module.css";

function ExamFilterUI({
	allExams,
	visibleExams,
	setVisibleExams,
	allDepartments,
}) {
	const mappedArray = allDepartments.map((dep) => ({
		...dep,
		checked: true,
		sub: [...dep.sub.map((a) => ({ subName: a, checked: true }))],
	}));

	const [checkedDepSub, setCheckedDepSub] = useState(mappedArray);

	function handleDepartmentClick(e, item) {
		const filteredArray = checkedDepSub.filter((a) => a.department != item);
		const foundItem = checkedDepSub.find((a) => a.department == item);
		foundItem.checked = !foundItem.checked;
		let newSub;
		if (!foundItem.checked) {
			newSub = foundItem.sub.map((subToChange) => ({
				...subToChange,
				checked: false,
			}));
		} else {
			newSub = foundItem.sub.map((subToChange) => ({
				...subToChange,
				checked: !subToChange.checked,
			}));
		}
		const newArray = [...filteredArray, { ...foundItem, sub: newSub }];
		setCheckedDepSub(newArray);
		const uniqueDepartmentsChecked = newArray
			.filter((item) => item.checked)
			.map((depMapped) => depMapped.department);
		setVisibleExams(
			allExams.filter((depTested) =>
				uniqueDepartmentsChecked.includes(depTested.department)
			)
		);
	}
	function handleSubdepartmentClick(e, dep, sub) {
		const filteredDepartmentArray = checkedDepSub.filter(
			(a) => a.department != dep
		);
		const foundDepartmentItem = checkedDepSub.find((a) => a.department == dep);
		const filteredSubArray = foundDepartmentItem.sub.filter(
			(subdep) => subdep.subName != sub
		);
		const foundSubItem = foundDepartmentItem.sub.find(
			(subdep) => subdep.subName == sub
		);
		foundSubItem.checked = !foundSubItem.checked;
		const newSubArray = [...filteredSubArray, { ...foundSubItem }];
		const newArray = [
			...filteredDepartmentArray,
			{
				...foundDepartmentItem,
				checked: true,
				sub: newSubArray,
			},
		];
		setCheckedDepSub(newArray);
		const uniqueDepartmentsChecked = newArray
			.filter((item) => item.checked)
			.map((depMapped) => depMapped.department);
		const arrayOfFilteredDepartments = allExams.filter((depTested) =>
			uniqueDepartmentsChecked.includes(depTested.department)
		);
		let arrayToSet = arrayOfFilteredDepartments.filter((item) => {
			if (item.department != dep) {
				return item;
			}

			let activeSub = newSubArray
				.filter((a) => a.checked)
				.map((item) => item.subName);

			if (activeSub.includes(item.subdepartment)) {
				return item;
			}
		});
		setVisibleExams(arrayToSet);
	}

	return (
		<div className={styles.FilterUISection}>
			{checkedDepSub
				.sort((a, b) => (a.department > b.department ? 1 : -1))
				.map((dep) => (
					<div key={dep.department} className={styles.departmentDiv}>
						<div className={styles.departmentCheckbox}>
							<input
								type="checkbox"
								value={dep.department}
								id={dep.department}
								onChange={(e) => handleDepartmentClick(e, dep.department)}
								checked={
									checkedDepSub.find((d) => d.department === dep.department)
										.checked == true
								}
								className={styles.departmentInput}
							/>
							<label
								htmlFor={dep.department}
								className={styles.departmentLabel}
							>
								{dep.department}
							</label>
						</div>
						{dep.sub
							.sort((a, b) => (a.subName > b.subName ? 1 : -1))
							.map((sub) => (
								<div key={`${dep.department}-${sub.subName}`}>
									<input
										type="checkbox"
										value={sub.subName}
										id={`${dep.department}-${sub.subName}`}
										onChange={(e) =>
											handleSubdepartmentClick(e, dep.department, sub.subName)
										}
										checked={
											checkedDepSub
												.find((d) => d.department === dep.department)
												.sub.find((s) => s.subName == sub.subName).checked ==
											true
										}
									/>
									<label htmlFor={`${dep.department}-${sub.subName}`}>
										{sub.subName}
									</label>
								</div>
							))}
					</div>
				))}
		</div>
	);
}

export default ExamFilterUI;
