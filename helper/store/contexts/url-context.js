import { createContext } from "react";

const UrlContext = createContext({
	dbURL: "",
	editExamAPIURL: "",
	addExamAPIURL: "",
	addAssetAPIURL: "",
	manageDepartmentsAPIURLs: "",
});

export function UrlContextProvider(props) {
	const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oftkpuh.mongodb.net/?retryWrites=true&w=majority`;

	const buildingsAPIURL = "/api/admin/manage-buildings";
	const editExamAPIURL = "/api/admin/edit-exam";
	const addExamAPIURL = "/api/admin/add-exam";
	const addAssetAPIURL = "/api/admin/add-asset";
	const manageDepartmentsAPIURL = "/api/admin/manage-departments";

	const urlContext = {
		dbURL: dbURL,
		buildingsAPIURL: buildingsAPIURL,
		editExamAPIURL: editExamAPIURL,
		addExamAPIURL: addExamAPIURL,
		addAssetAPIURL: addAssetAPIURL,
		manageDepartmentsAPIURL: manageDepartmentsAPIURL,
	};
	return (
		<UrlContext.Provider value={urlContext}>
			{props.children}
		</UrlContext.Provider>
	);
}

export default UrlContext;
