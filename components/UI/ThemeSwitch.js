import Image from "next/image";
import ToolsContext from "../../helper/store/contexts/tools-context";
import React, { useContext } from "react";
import sunIcon from "../../public/images/sun.svg";
import moonIcon from "../../public/images/moon.svg";
import styles from "./ThemeSwitch.module.css";
function ThemeSwitch() {
	const toolsCtx = useContext(ToolsContext);
	return (
		<>
			{toolsCtx.theme === "dark" ? (
				<Image
					src={sunIcon}
					alt="sunIcon"
					onClick={toolsCtx.enableLightTheme}
				/>
			) : (
				<Image
					src={moonIcon}
					alt="moonIcon"
					height={28}
					width={28}
					className={styles.moonIcon}
					onClick={toolsCtx.enableDarkTheme}
				/>
			)}
		</>
	);
}

export default ThemeSwitch;
