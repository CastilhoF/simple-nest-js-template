import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ApplicationEnvironment from './application/application.environment';
import AuthenticationEnvironment from './authentication/authentication.environment';
import environmentOptions from './global/environment.options';
import RepositoryNoRelationalEnvironment from './database/repository.no-relational.environment';
import RepositoryCacheEnvironment from './database/repository.cache.environment';

@Global()
@Module({
  imports: [ConfigModule.forRoot(environmentOptions.getConfig())],
  providers: [
    ApplicationEnvironment,
    AuthenticationEnvironment,
    RepositoryNoRelationalEnvironment,
    RepositoryCacheEnvironment,
  ],
  controllers: [],
  exports: [
    ApplicationEnvironment,
    AuthenticationEnvironment,
    RepositoryNoRelationalEnvironment,
    RepositoryCacheEnvironment,
  ],
})
class EnvironmentModule {}

export default EnvironmentModule;
