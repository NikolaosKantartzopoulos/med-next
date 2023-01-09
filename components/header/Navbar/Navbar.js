import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import ThemeSwitch from "../../UI/ThemeSwitch";
import LoginButton from "../../UI/login-btn";
import LocaleSwitcher from "../../helper/locale-switcher";
import styles from "./navbar.module.css";
import LanguageContext from "../../../helper/store/language-context";
import ToolsContext from "../../../helper/store/tools-context";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../../UI/LoadingSpinner";

function Navbar() {
	const { data: session, status } = useSession();

	const { lng } = useContext(LanguageContext);
	const { theme } = useContext(ToolsContext);
	const router = useRouter();
	const currentRoute = router.pathname;

	if (status === "loading") {
		return <LoadingSpinner />;
	}

	return (
		<div className={styles.navbarSection}>
			<div className={styles.leftNavbarPart}>
				<Link
					href={"/users"}
					className={
						currentRoute === "/users" ? `${styles.activeLink}` : undefined
					}
					style={{ color: theme == "dark" ? "white" : null }}
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
					style={{ color: theme == "dark" ? "white" : null }}
				>
					{lng("BrowseExams")}
				</Link>
				{status === "authenticated" && (
					<Link
						href={"/admin/manage-assets"}
						className={
							currentRoute.includes("/admin")
								? `${styles.activeLink}`
								: undefined
						}
						style={{ color: theme == "dark" ? "white" : null }}
					>
						{lng("ManageAssets")}
					</Link>
				)}
			</div>
			<div className={styles.navbarRightPart}>
				<LocaleSwitcher />
				<ThemeSwitch />
				<LoginButton />
			</div>
		</div>
	);
}

export default Navbar;
