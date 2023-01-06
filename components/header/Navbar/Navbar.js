import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

import LoginButton from "../../UI/login-btn";

import styles from "./navbar.module.css";

function Navbar() {
	const router = useRouter();
	const currentRoute = router.pathname;
	return (
		<div className={styles.navbarSection}>
			<Link
				href={"/users"}
				className={
					currentRoute === "/users" ? `${styles.activeLink}` : undefined
				}
			>
				Users Home
			</Link>
			<Link
				href={"/users/browse-exams"}
				className={
					currentRoute === "/users/browse-exams"
						? `${styles.activeLink}`
						: undefined
				}
			>
				Browse Exams
			</Link>
			<Link
				href={"/admin/manage-assets"}
				className={
					currentRoute.includes("/admin") ? `${styles.activeLink}` : undefined
				}
			>
				Manage Assets
			</Link>
			<LoginButton />
		</div>
	);
}

export default Navbar;
