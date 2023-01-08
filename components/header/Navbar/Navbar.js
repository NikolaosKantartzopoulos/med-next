import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import ThemeSwitch from "../../UI/ThemeSwitch";
import LoginButton from "../../UI/login-btn";
import LocaleSwitcher from "../../helper/locale-switcher";
import styles from "./navbar.module.css";
import LanguageContext from "../../../helper/store/language-context";
function Navbar() {
	const { lng } = useContext(LanguageContext);
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
				{lng("UsersHome")}
			</Link>
			<Link
				href={"/users/browse-exams"}
				className={
					currentRoute === "/users/browse-exams"
						? `${styles.activeLink}`
						: undefined
				}
			>
				{lng("BrowseExams")}
			</Link>
			<Link
				href={"/admin/manage-assets"}
				className={
					currentRoute.includes("/admin") ? `${styles.activeLink}` : undefined
				}
			>
				{lng("ManageAssets")}
			</Link>
			<div className={styles.navbarRightPart}>
				<LocaleSwitcher />
				<ThemeSwitch />
				<LoginButton />
			</div>
		</div>
	);
}

export default Navbar;
