import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import { CSSTransition } from "react-transition-group";

import styles from "./layout.module.css";
import AdminNavbar from "../main/admin/AdminNavbar";

export default function AdminLayout({ children }) {
	const router = useRouter();

	const [inProp, setInProp] = useState(false);
	const nodeRef = useRef(null);

	useEffect(() => {
		setInProp(true);
	}, [router.pathname]);

	return (
		<div className={styles.adminLayout}>
			<AdminNavbar setInProp={setInProp} />
			<CSSTransition
				nodeRef={nodeRef}
				in={inProp}
				timeout={250}
				classNames={{ ...styles }}
				mountOnEnter
				unmountOnExit
			>
				<main ref={nodeRef}>{children}</main>
			</CSSTransition>
		</div>
	);
}
