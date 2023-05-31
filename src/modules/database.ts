import "dotenv/config";
import mongoose, { Connection } from "mongoose";

let connection: Connection | boolean = false;

export const connect = async () => {
  if (!connection || (connection as Connection).readyState !== 1) {
    connection = await mongoose.createConnection(
      process.env.MONGO_DB_CONNECTION_STRING as string
    );
  }

  return connection as Connection;
};

export const disconnect = async () => {
  for (const connections of mongoose.connections) {
    await connections.close();
  }
};

export const resetDatabase = async () => {
  const dbConnection = await connect();
  await dbConnection.dropDatabase();
};
