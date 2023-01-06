import React from "react";

import styles from "./TinyInput.module.css";

function TinyInput({ id, value, onChange, onBlur }) {
	return (
		<input
			className={styles.tinyInput}
			id={id}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
		></input>
	);
}

export default TinyInput;
