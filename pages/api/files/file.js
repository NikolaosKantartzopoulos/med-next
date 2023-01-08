import path from "path";
import fs from "fs/promises";

export default async function handler(req, res) {
	let filePath = path.join(process.cwd(), "helper", "store", "files", "my.txt");
	let data = await fs.readFile(filePath);

	console.log(data.toString());
	// const file = data.toString();
	return res
		.status(200)
		.setHeader("Content-Type", "multipart/form-data")
		.blob(data);
}
