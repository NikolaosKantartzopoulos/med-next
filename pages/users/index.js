import React, { createRef, useState } from "react";

import { CSSTransition } from "react-transition-group";

import styles from "./asdf.module.css";
function UsersRoute() {
	const nodeRef = createRef(null);
	const [isMoving, setIsMoving] = useState(false);

	return (
		<div>
			<button onClick={() => setIsMoving(!isMoving)}>move</button>
			<div>1</div>
			<CSSTransition
				in={isMoving}
				timeout={2000}
				classNames={{ ...styles }}
				nodeRef={nodeRef}
				mountOnEnter
				unmountOnExit
			>
				<div ref={nodeRef}>2</div>
			</CSSTransition>
			<div>3</div>
		</div>
	);
}

export default UsersRoute;
