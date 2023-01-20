import { MongoClient } from "mongodb";

export async function connectDatabase() {
	const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

	const client = await MongoClient.connect(dbURL);
	const db = client.db();

	return [client, db];
}

export async function insertDocument(client, collection, document) {
	const result = await db.collection(collection).insertOne(document);
	return result;
}

export async function updateDocument(client, collection, filter, document) {
	const result = await db.collection(collection).updateOne(filter, document);
	return result;
}

export async function getAllDocuments(db, collection, sort) {
	const documents = await db.collection(collection).find().sort(sort).toArray();
	return documents;
}

export async function getDocumentsWithValue(db, collection, value, sort) {
	const documents = await db
		.collection(collection)
		.find({ [`${value}`]: { $exists: true } })
		.sort(sort)
		.toArray();
	return documents;
}
