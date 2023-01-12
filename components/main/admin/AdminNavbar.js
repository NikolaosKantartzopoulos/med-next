import React, { useContext, useState, useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import LanguageContext from "../../../helper/store/contexts/language-context";
import ToolsContext from "../../../helper/store/contexts/tools-context";

import { CSSTransition } from "react-transition-group";

import styles from "./AdminNavbar.module.css";

function AdminNavbar() {
	const router = useRouter();

	const { theme } = useContext(ToolsContext);
	const { lng } = useContext(LanguageContext);

	const currentRoute = router.pathname;

	const [inProp, setInProp] = useState(false);
	const nodeRef = useRef(null);

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
				style={{
					color: theme == "dark" ? "white" : null,
					gridColumn: "span 2",
				}}
			>
				{lng("ExamsTable")}
			</Link>
		</div>
	);
}

export default AdminNavbar;
