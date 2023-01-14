import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./Home.module.css";

export default function Index() {
	const router = useRouter();
	useEffect(() => {
		router.replace("/users/news");
	}, []);
	return <div className={styles.Home}></div>;
}
