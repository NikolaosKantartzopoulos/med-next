import React, { createRef, useContext, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import ToolsContext from "../../helper/store/contexts/tools-context";

import styles from "./InfoPanel.module.css";

function InfoPanel() {
	const { info } = useContext(ToolsContext);
	const nodeRef = createRef(null);
	const [isMoving, setIsMoving] = useState(false);

	const [infoText, setInfoText] = useState("");
	const [infoType, setInfoType] = useState("");

	useEffect(() => {
		if (info) {
			setInfoText(info.text);
			setInfoType(info.type);
			setIsMoving(true);
		} else {
			setIsMoving(false);
			setInfoText(null);
		}
	}, [info]);

	return (
		<CSSTransition
			in={isMoving}
			timeout={300}
			classNames={{ ...styles }}
			nodeRef={nodeRef}
			mountOnEnter
			unmountOnExit
		>
			<div
				ref={nodeRef}
				style={{
					backgroundColor: infoType == "error" ? "darkred" : "green",
				}}
				className={styles.infoPanel}
			>
				{/* {info.text} */}
				<div>{infoText}</div>
			</div>
		</CSSTransition>
	);
}

export default InfoPanel;
