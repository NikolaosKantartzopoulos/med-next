import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import ToolsContext from "../../helper/store/tools-context";

export default function LocaleSwitcher() {
	const { theme } = useContext(ToolsContext);
	const { locales, locale, pathname, query, asPath } = useRouter();
	const otherLocales = locales.filter((l) => l !== locale); // Find all the locales apart from the current locale.

	return (
		<>
			{otherLocales.map((locale) => {
				return (
					<Link
						key={locale}
						href={{ pathname, query }}
						as={asPath}
						locale={locale}
						style={{
							color: theme == "dark" ? "white" : null,
						}}
					>
						<span style={{ position: "relative", top: 2 }}>{locale}</span>
					</Link>
				);
			})}
		</>
	);
}
