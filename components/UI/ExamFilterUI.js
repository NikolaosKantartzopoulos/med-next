import React, { useContext, useEffect, useState } from "react";
import ToolsContext from "../../helper/store/contexts/tools-context";

import styles from "./ExamFilterUI.module.css";
import Image from "next/image";
import menuFold from "../../public/images/menu-up.svg";
import menuUnfold from "../../public/images/menu-down.svg";
import selectAll from "../../public/images/check-all.svg";
import clearAll from "../../public/images/backspace-outline.svg";
import searchIcon from "../../public/images/magnify.svg";
import TinyInput from "../UI/TinyInput";

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
	const { theme } = useContext(ToolsContext);

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
		searchExams();
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
		searchExams();
	}

	const [filterMenuVisible, setFilterMenuVisible] = useState(true);
	function checkAllFilters() {
		setVisibleExams(allExams);
		setCheckedDepSub(mappedArray);
		setFilterMenuVisible(true);
	}
	function uncheckAllFilters() {
		setVisibleExams([]);
		setCheckedDepSub(
			mappedArray.map((dpt) => ({
				...dpt,
				checked: false,
				sub: dpt.sub.map((sub) => ({ ...sub, checked: false })),
			}))
		);
		setFilterMenuVisible(true);
	}

	function searchExams() {
		if (searchFieldValue.trim() === "") {
			return;
		}
		const str = `.*${searchFieldValue}.*`;
		const regex = new RegExp(str, "gi");
		const filteredExams = allExams.filter((xm) => !xm.name.search(regex));

		let uniqueDepartmentsChecked = checkedDepSub
			.filter((elem) => elem.checked)
			.map((elem) => elem.department);

		const dblFiltered = filteredExams.filter((depTested) =>
			uniqueDepartmentsChecked.includes(depTested.department)
		);
		setVisibleExams(dblFiltered);
	}

	const [searchFieldValue, setSearchFieldValue] = useState("");

	return (
		<div>
			<div className={styles.filtersWindow}>
				<div>
					<TinyInput
						customStyle={{ width: "10rem" }}
						value={searchFieldValue}
						onChange={(e) => setSearchFieldValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								searchExams();
							}
						}}
					>
						<Image
							src={searchIcon}
							alt="searchIcon"
							onClick={searchExams}
							style={{ cursor: "pointer" }}
						/>
					</TinyInput>
				</div>
				<div>
					{filterMenuVisible ? (
						<Image
							src={menuFold}
							alt="menuFold"
							onClick={() => setFilterMenuVisible(false)}
						/>
					) : (
						<Image
							src={menuUnfold}
							alt="menuUnfold"
							onClick={() => setFilterMenuVisible(true)}
						/>
					)}
				</div>
				<div>
					<Image src={selectAll} alt="selectAll" onClick={checkAllFilters} />
					<Image src={clearAll} alt="clearAll" onClick={uncheckAllFilters} />
				</div>
			</div>
			{filterMenuVisible && (
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
										<div
											key={`${dep.department}-${sub.subName}`}
											className={styles.subdepCheckbox}
										>
											<input
												type="checkbox"
												value={sub.subName}
												id={`${dep.department}-${sub.subName}`}
												onChange={(e) =>
													handleSubdepartmentClick(
														e,
														dep.department,
														sub.subName
													)
												}
												checked={
													checkedDepSub
														.find((d) => d.department === dep.department)
														.sub.find((s) => s.subName == sub.subName)
														.checked == true
												}
											/>
											<label
												htmlFor={`${dep.department}-${sub.subName}`}
												style={{ color: theme == "dark" ? "darkorange" : null }}
											>
												{sub.subName}
											</label>
										</div>
									))}
							</div>
						))}
				</div>
			)}
		</div>
	);
}

export default ExamFilterUI;
