import path from "path";
import fs from "fs/promises";

export default async function handler(req, res) {
	let filePath = path.join(process.cwd(), "helper", "store", "files", "my.txt");
	let file = await fs.readFile(filePath);

	return res.status(200).send(file);
}
