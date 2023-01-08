import Navbar from "../header/Navbar/Navbar";
import Footer from "./footer";
import ToolsContext from "../../helper/store/tools-context";
import styles from "./layout.module.css";
import { useContext, useEffect } from "react";
// import Transition from "./Transition/index";

export default function Layout({ children }) {
	const toolsCtx = useContext(ToolsContext);
	useEffect(() => {
		const currentTheme = localStorage.getItem("theme");
		if (currentTheme === "light") {
			toolsCtx.enableLightTheme();
		} else if (currentTheme === "dark") {
			toolsCtx.enableDarkTheme();
		} else {
			toolsCtx.enableLightTheme();
		}
		if (toolsCtx.theme === "dark") {
			document.body.style.backgroundColor = "rgb(50,50,50)";
		} else {
			document.body.style.backgroundColor = "white";
		}
	}, [toolsCtx.theme]);
	return (
		<div className={styles.layoutSection}>
			<Navbar />
			{/* <Transition location={router.pathname}> */}
			<main className={styles.mainSection}>{children}</main>
			{/* </Transition> */}
			<Footer />
		</div>
	);
}
