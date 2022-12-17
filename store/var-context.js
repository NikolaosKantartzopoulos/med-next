import { createContext } from "react";

const VarContext = createContext({
	sample: "",
});

export function UrlContextProvider(props) {
	const varContext = {};

	return (
		<VarContext.Provider value={varContext}>
			{props.children}
		</VarContext.Provider>
	);
}

export default VarContext;
