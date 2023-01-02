import React, { useContext, useEffect, useState } from "react";
import ExamContext from "../../../../../helper/store/exam-context";
import Button from "../../../../UI/Button";
import Input from "../../../../UI/Input";

import ResponsiveItem from "../../../../UI/ResponsiveItem";
import TinyInput from "../../../../UI/TinyInput";

import styles from "./ExamTags.module.css";

function ExamTags() {
	const {
		examInputState,
		dispatchExamInputStateAction,
		allActiveDepartments,
		allActiveDoctors,
	} = useContext(ExamContext);

	const [activeTabs, setActiveTabs] = useState(examInputState.tags);
	const [miniValue, setMiniValue] = useState("");
	const [itemShown, setItemShown] = useState(null);

	function editItemHandler(e, tier1, tier2) {
		setMiniValue(tier2);
		setItemShown(tier2);
	}
	function saveItemHandler(e, tier1, tier2) {
		const filteredArray = activeTabs.filter((tag) => tag != tier2);
		const newTags = [...filteredArray, miniValue].sort((a, b) =>
			a > b ? 1 : -1
		);
		dispatchExamInputStateAction({
			type: "setTags",
			newTags: newTags,
		});
		setActiveTabs(newTags);
		setItemShown(null);
	}
	function deleteItemHandler(e, tier1, tier2) {
		setActiveTabs(activeTabs.filter((tab) => tab != tier2));

		dispatchExamInputStateAction({
			type: "setTags",
			newTags: activeTabs.filter((tab) => tab != tier2),
		});
	}

	function newTabFn() {
		dispatchExamInputStateAction({
			type: "setTags",
			newTags: [...activeTabs, "Add"],
		});
	}

	return (
		<>
			<h5>Tags</h5>
			<div className={styles.examTagsSection}>
				{examInputState.tags.map((tag) => (
					<ResponsiveItem
						key={tag}
						editItemHandler={editItemHandler}
						saveItemHandler={saveItemHandler}
						deleteItemHandler={deleteItemHandler}
						tier1="asdf"
						tier2={tag}
						helperValue={itemShown}
					>
						{itemShown && itemShown == tag ? (
							<TinyInput
								id="tinyId"
								value={miniValue}
								onChange={(e) => setMiniValue(e.target.value)}
							/>
						) : (
							<div>{tag}</div>
						)}
					</ResponsiveItem>
				))}
				<Button onClick={newTabFn}>Add</Button>
			</div>
		</>
	);
}

export default ExamTags;
