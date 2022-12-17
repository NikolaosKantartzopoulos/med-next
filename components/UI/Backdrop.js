import React, { useState } from "react";

import styles from "./Backdrop.module.css";

function Backdrop(props) {
	// const [backdropVisible, setBackdropVisible] = useState(true);

	// return <>{backdropVisible && <div className={styles.backdrop} />}</>;

	const [backdropVisible, setBackdropVisible] = useState(true);

	return (
		<>
			{backdropVisible && (
				<div className={styles.backdrop} onClick={props.onClick} />
			)}
		</>
	);
}

export default Backdrop;
