import React from "react";

import styles from "./Input.module.css";

function Input({ id, label, value, onChange }) {
	return (
		<div className={styles.inputDiv}>
			<label className={styles.myLabel} htmlFor={id}>
				{label}
			</label>
			<input
				className={styles.myInput}
				id={id}
				value={value}
				onChange={onChange}
			></input>
		</div>
	);
}

export default Input;
