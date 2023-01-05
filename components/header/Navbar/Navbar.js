import Link from "next/link";
import React from "react";

import styles from "./navbar.module.css";

function Navbar() {
	return (
		<div className={styles.navbarSection}>
			<Link href={"/users"}>Users Home</Link>
			<Link href={"/users/browse-exams"}>Browse Exams</Link>
			<Link href={"/admin/manage-assets"}>Manage Assets</Link>
		</div>
	);
}

export default Navbar;
