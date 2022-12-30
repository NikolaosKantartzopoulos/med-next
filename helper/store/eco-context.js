import { createContext } from "react";

const EcoContext = createContext({});

export function UrlContextProvider(props) {
	const ecoContext = {};

	return (
		<UrlContext.Provider value={ecoContext}>
			{props.children}
		</UrlContext.Provider>
	);
}

export default UrlContext;
