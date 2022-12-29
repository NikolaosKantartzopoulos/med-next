import styles from "./RadioButton.module.css";
function RadioButton({ id, label, name, disabled, value, checked }) {
	return (
		<div className={styles.radioButton}>
			<label htmlFor={id} disabled={disabled} className={styles.radioLabel}>
				<input
					type="radio"
					id={id}
					name={name}
					value={value}
					checked={checked}
					readOnly
					disabled={disabled}
				/>
				<span>{label}</span>
			</label>
		</div>
	);
}
export default RadioButton;
