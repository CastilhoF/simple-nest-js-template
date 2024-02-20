import mongoose, { ConnectOptions } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

class MongoMemoryServerRepository {
  private static MONGO_SERVER: MongoMemoryServer | null = null;

  public static async connect(): Promise<void> {
    if (!this.MONGO_SERVER) {
      this.MONGO_SERVER = await MongoMemoryServer.create();
      const uri = this.MONGO_SERVER.getUri();

      const mongooseOpts: ConnectOptions = {
        dbName: 'test',
        connectTimeoutMS: 60000,
        socketTimeoutMS: 60000,
        waitQueueTimeoutMS: 60000,
        maxPoolSize: 100,
        minPoolSize: 100,
        maxConnecting: 100,
      };

      await mongoose.connect(uri, mongooseOpts);
    }
  }

  public static async disconnect(): Promise<void> {
    if (this.MONGO_SERVER) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await this.MONGO_SERVER.stop();
      this.MONGO_SERVER = null;
    }
  }
}

export default MongoMemoryServerRepository;
