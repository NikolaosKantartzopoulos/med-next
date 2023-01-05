import { useSession, signIn, signOut } from "next-auth/react";

import styles from "./login-btn.module.css";
import Button from "./Button";

export default function Component() {
	const { data: session } = useSession();
	if (session) {
		return (
			<div className={styles.buttonDiv}>
				<div className={styles.info}> {session.user.username} </div>
				<Button onClick={() => signOut()} customStyle={{ width: "8rem" }}>
					Sign out
				</Button>
			</div>
		);
	}
	return (
		<div className={styles.buttonDiv}>
			<div style={{ width: "10rem" }}> </div>
			<Button onClick={() => signIn()} customStyle={{ width: "8rem" }}>
				Sign in
			</Button>
		</div>
	);
}
