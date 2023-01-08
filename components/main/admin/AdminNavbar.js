import React, { useContext } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./AdminNavbar.module.css";
import LanguageContext from "../../../helper/store/language-context";
import ToolsContext from "../../../helper/store/tools-context";

function AdminNavbar() {
	const { theme } = useContext(ToolsContext);
	const router = useRouter();
	const { lng } = useContext(LanguageContext);
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
				style={{ color: theme == "dark" ? "white" : null }}
			>
				{lng("Buildings")}
			</Link>
			<Link
				href={"/admin/manage-departments"}
				className={
					currentRoute === "/admin/manage-departments"
						? `${styles.activeLink}`
						: undefined
				}
				style={{ color: theme == "dark" ? "white" : null }}
			>
				{lng("Departments")}
			</Link>
			<Link
				href={"/admin/manage-eco"}
				className={
					currentRoute === "/admin/manage-eco"
						? `${styles.activeLink}`
						: undefined
				}
				style={{ color: theme == "dark" ? "white" : null }}
			>
				{lng("Eco")}
			</Link>

			<Link
				href={"/admin/manage-preparations"}
				className={
					currentRoute === "/admin/manage-preparations"
						? `${styles.activeLink}`
						: undefined
				}
				style={{ color: theme == "dark" ? "white" : null }}
			>
				{lng("Preparations")}
			</Link>
			<Link
				href={"/admin/manage-users"}
				className={
					currentRoute === "/admin/manage-users"
						? `${styles.activeLink}`
						: undefined
				}
				style={{ color: theme == "dark" ? "white" : null }}
			>
				{lng("Users")}
			</Link>

			<Link
				href={"/admin/manage-exams"}
				className={
					currentRoute === "/admin/manage-exams"
						? `${styles.activeLink}`
						: undefined
				}
				style={{ color: theme == "dark" ? "white" : null }}
			>
				{lng("AddExam")}
			</Link>

			<Link
				href={"/admin/exams-table"}
				className={
					currentRoute === "/admin/exams-table"
						? `${styles.activeLink}`
						: undefined
				}
				style={{ color: theme == "dark" ? "white" : null }}
			>
				{lng("ExamsTable")}
			</Link>
		</div>
	);
}

export default AdminNavbar;
