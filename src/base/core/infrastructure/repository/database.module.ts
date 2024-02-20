import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import type { RedisClientOptions } from 'redis';
import CacheRepository from '../../../_/application/repository/cache/cache.repository';
import RepositoryRelationalOptions from './config/mysql/repository.relational.options';
import CacheServiceProvider from './provider/cache-service.provider';
import databaseCacheProvider from './provider/database.cache.provider';
import DatabaseNoRelationalProvider from './provider/repository.no-relational.options';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>(databaseCacheProvider),
    MongooseModule.forRootAsync(DatabaseNoRelationalProvider.mongoose()),
    MongooseModule.forFeature([
      // ...RepositoryNoRelationalOptions.createNoRelationalOptions().schemas,
    ]),
  ],
  providers: [RepositoryRelationalOptions, CacheServiceProvider.redis()],
  controllers: [],
  exports: [RepositoryRelationalOptions, CacheRepository],
})
class DatabaseModule {}

export default DatabaseModule;
