import RepositoryNoRelationalOptions from '../config/mongoose/schema/repository.no-relational.options';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import ApplicationEnvironment from '../../environment/application/application.environment';
import RepositoryNoRelationalEnvironment from '../../environment/database/repository.no-relational.environment';

class DatabaseNoRelationalProvider {
  public static mongoose(): MongooseModuleAsyncOptions {
    return {
      useFactory: RepositoryNoRelationalOptions.createNoRelationalOptions,
      inject: [ApplicationEnvironment, RepositoryNoRelationalEnvironment],
    };
  }
}

export default DatabaseNoRelationalProvider;
