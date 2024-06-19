import { MongoClient, ObjectId } from "mongodb"

export class DB {
    constructor(url, dataBaseName, collectionName) {
        this.url = url;
        this.dataBaseName = dataBaseName;
        this.collectionName = collectionName;
        this.Client = new MongoClient(url);
    }

    async connect() {
        this.connection = await this.Client.connect();
        this.db = this.connection.db(this.dataBaseName);
        this.collection = this.db.collection(this.collectionName);
    }
}
