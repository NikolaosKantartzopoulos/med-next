import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import ThemeSwitch from "../../UI/ThemeSwitch";
import LoginButton from "../../UI/login-btn";
import LocaleSwitcher from "../../helper/locale-switcher";
import styles from "./navbar.module.css";
import LanguageContext from "../../../helper/store/contexts/language-context";
import ToolsContext from "../../../helper/store/contexts/tools-context";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Navbar({ setInProp }) {
	const { data: session, status } = useSession();

	const { lng } = useContext(LanguageContext);
	const { theme } = useContext(ToolsContext);
	const router = useRouter();
	const currentRoute = router.pathname;

	return (
		<div className={styles.navbarSection}>
			<div className={styles.leftNavbarPart}>
				{/* <Link
					href={"/users"}
					className={
						currentRoute === "/users" ? `${styles.activeLink}` : undefined
					}
					style={{ color: theme == "dark" ? "white" : null }}
				> */}
				<Image
					src="/images/cross.png"
					alt="Home Icon"
					height={24}
					width={24}
					style={{ position: "relative", top: 2, cursor: "pointer" }}
					onClick={() => {
						router.push("/");
					}}
				/>
				<Link
					href={"/users/news/"}
					onClick={() => {
						if (currentRoute === "/users/news") {
							return;
						}
						setInProp(false);
					}}
					className={
						currentRoute === "/users/news" ? `${styles.activeLink}` : undefined
					}
					style={{ color: theme == "dark" ? "white" : null }}
				>
					{lng("News")}
				</Link>
				<Link
					href={"/users/browse-exams"}
					onClick={() => {
						if (currentRoute === "/users/browse-exams") {
							return;
						}
						setInProp(false);
					}}
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
						onClick={() => {
							if (currentRoute === "/users/manage-assets") {
								return;
							}
							setInProp(false);
						}}
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
