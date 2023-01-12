import { useState, createContext } from "react";

const ToolsContext = createContext({
	theme: "light",
	setTheme: () => {},
	enableLightTheme: () => {},
	enableDarkTheme: () => {},
	info: null,
	setInfo: () => {},
	infoMessage: () => {},
	mainComponentVisible: true,
	setMainComponentVisible: () => {},
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

	const [info, setInfo] = useState(null);

	function infoMessage(type, text) {
		setInfo({ type: type, text: text });
		setTimeout(() => setInfo(null), 3000);
	}

	const [mainComponentVisible, setMainComponentVisible] = useState();

	const toolsContext = {
		theme,
		setTheme,
		enableLightTheme,
		enableDarkTheme,
		info,
		setInfo,
		infoMessage,
		mainComponentVisible,
		setMainComponentVisible,
	};
	return (
		<ToolsContext.Provider value={toolsContext}>
			{props.children}
		</ToolsContext.Provider>
	);
}

export default ToolsContext;
