import { useRouter } from "next/router";
import React, { useContext } from "react";
import ToolsContext from "../../../helper/store/tools-context";

function NewsIndexRoute() {
	const { theme } = useContext(ToolsContext);
	return (
		<div style={{ color: theme === "dark" && "white" }}>NewsIndexRoute</div>
	);
}

export default NewsIndexRoute;
