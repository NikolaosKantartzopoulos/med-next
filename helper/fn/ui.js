export function infoMessage(setInfo, what, message) {
	setInfo({ type: what, text: message });
	setTimeout(() => setInfo(null), 3000);
}
