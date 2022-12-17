import { createContext } from "react";

const UrlContext = createContext({
	databaseURL: "",
});

export function UrlContextProvider(props) {
	const databaseURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6fxb7u9.mongodb.net/?retryWrites=true&w=majority`;

	const urlContext = { databaseURL: databaseURL };

	return (
		<UrlContext.Provider value={urlContext}>
			{props.children}
		</UrlContext.Provider>
	);
}

export default UrlContext;
