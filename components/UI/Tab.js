import React from "react";

import tabCSS from "./Tab.module.css";

function Tab(props) {
	const classesSelected = `${tabCSS.tab} ${props.className}`;
	return (
		<div
			className={classesSelected}
			onClick={props.onClick}
			style={props.customStyle}
		>
			{props.children}
		</div>
	);
}

export default Tab;
