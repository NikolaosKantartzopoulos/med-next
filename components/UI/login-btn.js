import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./login-btn.module.css";
import Button from "./Button";
import { useContext } from "react";
import LanguageContext from "../../helper/store/language-context";
import ToolsContext from "../../helper/store/tools-context";
export default function Component() {
	const { data: session } = useSession();
	const router = useRouter();
	const { lng } = useContext(LanguageContext);
	const { theme } = useContext(ToolsContext);
	if (session) {
		return (
			<div
				className={styles.buttonDiv}
				style={{ color: theme == "dark" ? "white" : null }}
			>
				<div
					className={styles.info}
					style={{ color: theme == "dark" ? "white" : null }}
				>
					{session.user.username}
				</div>
				<Button onClick={() => signOut()}>
					<span style={{ color: theme == "dark" ? "white" : null }}>
						{lng("SignOut")}
					</span>
				</Button>
			</div>
		);
	}
	return (
		<div className={styles.buttonDiv}>
			<Button onClick={() => signIn()}>
				<span style={{ color: theme == "dark" ? "white" : null }}>
					{lng("SignIn")}
				</span>
			</Button>
		</div>
	);
}
