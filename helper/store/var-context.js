import { useState, createContext } from "react";

const VarContext = createContext({
	inProp: true,
	setInProp: () => {},
});

export function VarContextProvider(props) {
	const [inProp, setInProp] = useState(false);
	const varContext = { inProp, setInProp };

	return (
		<VarContext.Provider value={varContext}>
			{props.children}
		</VarContext.Provider>
	);
}

export default VarContext;
