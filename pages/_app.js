import Layout from "../components/helper/layout";

import "../styles/globals.css";

export default function App({ Component, pageProps, router }) {
	return (
		<Layout>
			<Component {...pageProps} key={router.route} />
		</Layout>
	);
}
