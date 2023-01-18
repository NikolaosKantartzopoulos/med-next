import React from "react";

import styles from "./TinyInput.module.css";

function TinyInput({
	id,
	value,
	onChange,
	onBlur,
	customStyle,
	children,
	onKeyDown,
	readOnly,
}) {
	return (
		<>
			<input
				className={styles.tinyInput}
				id={id}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				style={customStyle}
				onKeyDown={onKeyDown}
				readOnly={readOnly}
			/>
			{children}
		</>
	);
}

export default TinyInput;
