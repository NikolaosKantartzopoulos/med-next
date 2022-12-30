import React from "react";

import styles from "./Textarea.module.css";

function Textarea({
	id,
	label,
	value,
	onChange,
	rows,
	columns,
	children,
	customStyles,
}) {
	return (
		<>
			{label && (
				<div style={customStyles} className={styles.labelAndTextarea}>
					<label className={styles.TextareaLabel} htmlFor={id}>
						{label}
					</label>
					<textarea
						id={id}
						value={value}
						onChange={onChange}
						rows={rows}
						cols={columns}
						className={styles.Textarea}
					>
						{children}
					</textarea>
				</div>
			)}
			{!label && (
				<div className={styles.TextareaLabel} style={customStyles}>
					<textarea
						id={id}
						value={value}
						onChange={onChange}
						rows={rows}
						cols={columns}
						className={styles.Textarea}
						style={customStyles}
					>
						{children}
					</textarea>
				</div>
			)}
		</>
	);
}

export default Textarea;
