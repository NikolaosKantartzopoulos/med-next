import React from "react";

import styles from "./TableInput.module.css";

function TableInput({ id, value, onChange, akey, onBlur }) {
	return (
		<input
			key={akey}
			className={styles.TableInput}
			id={id}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
		/>
	);
}

export default TableInput;
