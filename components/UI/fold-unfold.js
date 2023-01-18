import React, { useState } from "react";

import Image from "next/image";

import unfoldIcon from "../../public/images/menu-down.svg";
import foldIcon from "../../public/images/menu-up.svg";

import styles from "./fold-unfold.module.css";

function FoldUnfold({ children, headerText }) {
	const [visible, setVisible] = useState(true);
	return (
		<div className={styles.FoldUnfold}>
			<h4 className={styles.header}>
				<span className={styles.headerText}>{headerText}</span>
				{visible ? (
					<Image
						src={unfoldIcon}
						alt="fold"
						onClick={() => setVisible(false)}
					/>
				) : (
					<Image src={foldIcon} alt="unfold" onClick={() => setVisible(true)} />
				)}
			</h4>
			{visible && <>{children}</>}
		</div>
	);
}

export default FoldUnfold;
