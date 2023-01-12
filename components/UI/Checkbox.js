import React from "react";

import checkStyles from "./Checkbox.module.css";

function Checkbox({ value, label, checkedIf, onChange }) {
	return (
		<div className={checkStyles.setInputLabel} key={label}>
			<input
				type="checkbox"
				value={value}
				id={label}
				name={label}
				onChange={onChange}
				checked={checkedIf}
			/>
			<label htmlFor={label}>{label}</label>
		</div>
	);
}

export default Checkbox;
