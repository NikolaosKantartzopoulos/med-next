import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./login-btn.module.css";
import Button from "./Button";
import { useContext } from "react";
import LanguageContext from "../../helper/store/language-context";
export default function Component() {
	const { data: session } = useSession();
	const router = useRouter();
	const { lng } = useContext(LanguageContext);

	if (session) {
		return (
			<div className={styles.buttonDiv}>
				<div className={styles.info}> {session.user.username} </div>
				<Button onClick={() => signOut()} customStyle={{ width: "8rem" }}>
					{lng("SignOut")}
				</Button>
			</div>
		);
	}
	return (
		<div className={styles.buttonDiv}>
			<div style={{ width: "10rem" }}> </div>
			<Button onClick={() => signIn()} customStyle={{ width: "8rem" }}>
				{lng("SignIn")}
			</Button>
		</div>
	);
}
