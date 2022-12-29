import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./AdminNavbar.module.css";

function AdminNavbar() {
	const router = useRouter();
	const currentRoute = router.pathname;
	return (
		<div className={styles.adminNavbar}>
			<Link
				href={"/admin/manage-buildings"}
				className={
					currentRoute === "/admin/manage-buildings"
						? `${styles.activeLink}`
						: undefined
				}
			>
				Buildings
			</Link>
			<Link
				href={"/admin/manage-departments"}
				className={
					currentRoute === "/admin/manage-departments"
						? `${styles.activeLink}`
						: undefined
				}
			>
				Departments
			</Link>
			<Link
				href={"/admin/manage-preparations"}
				className={
					currentRoute === "/admin/manage-preparations"
						? `${styles.activeLink}`
						: undefined
				}
			>
				Preparations
			</Link>
			<Link
				href={"/admin/manage-users"}
				className={
					currentRoute === "/admin/manage-users"
						? `${styles.activeLink}`
						: undefined
				}
			>
				Users
			</Link>
			<Link
				href={"/admin/manage-exams"}
				className={
					currentRoute === "/admin/manage-exams"
						? `${styles.activeLink}`
						: undefined
				}
			>
				Exams
			</Link>
		</div>
	);
}

export default AdminNavbar;
