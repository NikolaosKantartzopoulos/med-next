import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import ToolsContext from "../../helper/store/tools-context";
import Image from "next/image";
import gbIcon from "../../public/images/GB.png";
import grIcon from "../../public/images/GR.png";

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
						{locale == "en-US" ? (
							<Image
								src={gbIcon}
								alt="select english language"
								height={32}
								width={32}
								style={{ position: "relative", top: 4 }}
							/>
						) : (
							<Image
								src={grIcon}
								alt="select greek language"
								height={32}
								width={32}
								style={{ position: "relative", top: 4 }}
							/>
						)}
					</Link>
				);
			})}
		</>
	);
}
