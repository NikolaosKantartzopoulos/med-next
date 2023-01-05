import Layout from "../components/helper/layout";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
	router,
}) {
	return (
		<SessionProvider session={session}>
			<Layout>
				<Component {...pageProps} key={router.route} />
			</Layout>
		</SessionProvider>
	);
}
