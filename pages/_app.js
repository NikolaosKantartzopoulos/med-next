import Layout from "../components/helper/layout";
import { SessionProvider } from "next-auth/react";
import { UrlContextProvider } from "../helper/store/url-context";
import "../styles/globals.css";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
	router,
}) {
	return (
		<SessionProvider session={session}>
			<UrlContextProvider>
				<Layout>
					<Component {...pageProps} key={router.route} />
				</Layout>
			</UrlContextProvider>
		</SessionProvider>
	);
}
