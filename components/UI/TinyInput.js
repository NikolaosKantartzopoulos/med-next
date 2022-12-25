import React from "react";

import styles from "./TinyInput.module.css";

function TinyInput({ id, value, onChange }) {
	return (
		<input
			className={styles.tinyInput}
			id={id}
			value={value}
			onChange={onChange}
		></input>
	);
}

export default TinyInput;
