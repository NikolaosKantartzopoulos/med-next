import React from "react";

import RightTabCSS from "./RightTab.module.css";

function RightTab(props) {
	const classesSelected = `${RightTabCSS.rightTab} ${props.className}`;
	return <div className={classesSelected}>{props.children}</div>;
}

export default RightTab;
