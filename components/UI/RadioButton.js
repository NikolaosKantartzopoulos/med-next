import { useContext } from "react";
import ToolsContext from "../../helper/store/contexts/tools-context";
import styles from "./RadioButton.module.css";

function RadioButton({ id, label, name, disabled, value, checked }) {
	const { theme } = useContext(ToolsContext);
	return (
		<div className={styles.radioButton}>
			<label
				htmlFor={id}
				disabled={disabled}
				className={styles.radioLabel}
				style={{ color: theme == "dark" ? "white" : null }}
			>
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
