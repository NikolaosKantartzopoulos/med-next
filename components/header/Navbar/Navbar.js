import Link from "next/link";
import React from "react";

import styles from "./navbar.module.css";

function Navbar() {
	return (
		<div className={styles.navbarSection}>
			Navbar
			<Link href={"/admin/manage-assets"}>Manage Assets</Link>
		</div>
	);
}

export default Navbar;
