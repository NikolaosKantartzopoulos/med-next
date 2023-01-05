import React from "react";

import styles from "./ExamCheckFilter.module.css";

function CkeckFilter({ title, arrayToMap, checkedItems, setCheckedItems }) {
	function handleCheckboxClick(e, item) {
		if (checkedItems.includes(item)) {
			setCheckedItems(checkedItems.filter((a) => item !== a));
		} else {
			setCheckedItems([...checkedItems, e.target.value]);
		}
	}

	return (
		<div className={styles.EcoFilter}>
			<h4>{title}</h4>
			<div className={styles.checkLine}>
				{arrayToMap.map((ins) => (
					<div className={styles.setInputLabel} key={ins}>
						<input
							type="checkbox"
							value={ins}
							id={ins}
							name={ins}
							onChange={(e) => handleCheckboxClick(e, ins)}
							checked={checkedItems.includes(ins)}
						/>
						<label htmlFor={ins}>{ins}</label>
					</div>
				))}
			</div>
		</div>
	);
}

export default CkeckFilter;
