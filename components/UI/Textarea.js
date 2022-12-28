import React from "react";

import styles from "./Textarea.module.css";

function Textarea({ id, label, value, onChange, rows, columns, children }) {
	return (
		<>
			{label && (
				<label className={styles.TextareaLabel}>
					{label}
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
				</label>
			)}
			{!label && (
				<div className={styles.TextareaLabel}>
					{label}
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
		</>
	);
}

export default Textarea;
