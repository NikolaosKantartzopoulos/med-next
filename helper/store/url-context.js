import { createContext } from "react";

const UrlContext = createContext({
	dbURL: "",
});

export function UrlContextProvider(props) {
	const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oftkpuh.mongodb.net/?retryWrites=true&w=majority`;

	const buildingsAPIURL = "/api/admin/manage-buildings";

	const urlContext = { dbURL: dbURL, buildingsAPIURL: buildingsAPIURL };

	return (
		<UrlContext.Provider value={urlContext}>
			{props.children}
		</UrlContext.Provider>
	);
}

export default UrlContext;
