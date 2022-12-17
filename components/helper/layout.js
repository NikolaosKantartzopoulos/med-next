import Navbar from "../header/Navbar/Navbar";
import Footer from "./footer";

import styles from "./layout.module.css";

export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			<main className={styles.mainSection}>{children}</main>
			<Footer />
		</>
	);
}
