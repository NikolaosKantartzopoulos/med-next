import Layout from "../components/helper/layout";
import { SessionProvider } from "next-auth/react";
import { LanguageContextProvider } from "../helper/store/contexts/language-context";
import { UrlContextProvider } from "../helper/store/contexts/url-context";
import { ToolsContextProvider } from "../helper/store/contexts/tools-context";
import "../styles/globals.css";
export default function App({
	Component,
	pageProps: { session, ...pageProps },
	router,
}) {
	return (
		<ToolsContextProvider>
			<LanguageContextProvider locale={router.locale}>
				<SessionProvider session={session}>
					<UrlContextProvider>
						<Layout>
							<Component {...pageProps} key={router.route} />
						</Layout>
					</UrlContextProvider>
				</SessionProvider>
			</LanguageContextProvider>
		</ToolsContextProvider>
	);
}
