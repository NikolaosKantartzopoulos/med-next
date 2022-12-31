export function infoMessage(setInfo, what, message) {
	console.log(what);
	setInfo({ type: what, text: message });
	setTimeout(() => setInfo(null), 3000);
}
