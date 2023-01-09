import { useContext } from "react";
import ToolsContext from "../../helper/store/contexts/tools-context";
import styles from "./Input.module.css";

function Input({ id, label, value, onChange, customStyle }) {
	const { theme } = useContext(ToolsContext);
	return (
		<div className={styles.inputDiv} style={customStyle}>
			<label
				className={styles.myLabel}
				htmlFor={id}
				style={{ color: theme == "dark" ? "white" : null }}
			>
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
