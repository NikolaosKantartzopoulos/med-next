import React, { useContext } from "react";
import ToolsContext from "../../helper/store/contexts/tools-context";

import styles from "./footer.module.css";

function Footer() {
	const { theme } = useContext(ToolsContext);
	let year = new Date().getFullYear();
	return (
		<footer
			className={styles.footer}
			style={{ color: theme == "dark" ? "white" : null }}
		>
			{year} @ med
		</footer>
	);
}

export default Footer;
