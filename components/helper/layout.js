import Navbar from "../header/Navbar/Navbar";
import Footer from "./footer";

import styles from "./layout.module.css";

import { useRouter } from "next/router";
import Transition from "./Transition/index";

export default function Layout({ children }) {
	// const router = useRouter();
	return (
		<div className={styles.mainSection}>
			<Navbar />

			{/* <Transition location={router.pathname}> */}
			<main className={styles.mainSection}>{children}</main>
			{/* </Transition> */}
			<Footer />
		</div>
	);
}
