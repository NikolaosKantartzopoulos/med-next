import { useState, createContext } from "react";

const ToolsContext = createContext({
	theme: "light",
	setTheme: () => {},
	enableLightTheme: () => {},
	enableDarkTheme: () => {},
});

export function ToolsContextProvider(props) {
	let localTheme;
	const [theme, setTheme] = useState(localTheme ? localTheme : "light");
	function enableLightTheme() {
		localStorage.setItem("theme", "light");
		setTheme("light");
	}
	function enableDarkTheme() {
		localStorage.setItem("theme", "dark");
		setTheme("dark");
	}
	const toolsContext = { theme, setTheme, enableLightTheme, enableDarkTheme };
	return (
		<ToolsContext.Provider value={toolsContext}>
			{props.children}
		</ToolsContext.Provider>
	);
}

export default ToolsContext;
