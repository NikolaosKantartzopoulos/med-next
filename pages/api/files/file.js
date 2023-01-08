import path from "path";
import fs from "fs/promises";

export default async function handler(req, res) {
	let filePath = path.join(
		process.cwd(),
		"helper",
		"store",
		"files",
		"sample.pdf"
	);
	let data = await fs.readFile(filePath);

	return res.status(200).send(data);
}
