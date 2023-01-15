import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import ToolsContext from "../../helper/store/contexts/tools-context";

import Navbar from "../header/Navbar/Navbar";
import Footer from "./footer";
import InfoPanel from "../UI/InfoPanel";

import { CSSTransition } from "react-transition-group";

import styles from "./layout.module.css";

export default function Layout({ children }) {
	const toolsCtx = useContext(ToolsContext);
	const router = useRouter();

	const [inProp, setInProp] = useState(false);
	const nodeRef = useRef(null);

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

	useEffect(() => {
		setInProp(true);
	}, [router.pathname]);

	return (
		<div
			className={styles.layoutSection}
			style={{ color: toolsCtx.theme === "dark" ? "white" : null }}
		>
			<InfoPanel />
			<Navbar setInProp={setInProp} />
			<CSSTransition
				nodeRef={nodeRef}
				in={inProp}
				timeout={250}
				classNames={{ ...styles }}
				mountOnEnter
				unmountOnExit
			>
				<main className={styles.mainSection} ref={nodeRef}>
					{children}
				</main>
			</CSSTransition>

			<Footer />
		</div>
	);
}
