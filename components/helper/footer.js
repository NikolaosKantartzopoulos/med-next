import React from "react";

import styles from "./footer.module.css";

function Footer() {
	let year = new Date().getFullYear();
	return <footer className={styles.footer}>{year} @ med</footer>;
}

export default Footer;
