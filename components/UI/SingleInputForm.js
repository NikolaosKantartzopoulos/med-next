import React from "react";

import Button from "./Button";
import Input from "./Input.js";

import styles from "./SingleInputForm.module.css";

function SingleInputForm({
	id,
	label,
	onSubmit,
	value,
	onChange,
	buttonText = "Submit",
}) {
	return (
		<form className={styles.SingleInputFormDiv} onSubmit={onSubmit}>
			<Input id={id} label={label} value={value} onChange={onChange} />
			<Button type="submit">{buttonText}</Button>
		</form>
	);
}

export default SingleInputForm;
