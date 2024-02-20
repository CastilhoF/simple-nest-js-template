import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import ApplicationEnvironment from '@/base/core/infrastructure/environment/application/application.environment';
import RepositoryNoRelationalEnvironment from '@/base/core/infrastructure/environment/database/repository.no-relational.environment';

@Injectable()
class RepositoryNoRelationalOptions {
  public static createNoRelationalOptions() {
    const configService = new ConfigService();
    const applicationEnvironment = new ApplicationEnvironment(configService);
    const noRelationalEnvironment = new RepositoryNoRelationalEnvironment(
      configService,
    );

    const isProduction = applicationEnvironment.getNodeEnv() === 'production';

    const protocol = `${noRelationalEnvironment.getDatabaseType()}`;
    const host = noRelationalEnvironment.getDatabaseHost();
    const port = noRelationalEnvironment.getDatabasePort();

    let uri = `${protocol}://${host}`;
    if (protocol === 'mongodb') uri += `:${port}`;

    const payload = {
      appName: applicationEnvironment.getAppName(),
      autoCreate: !isProduction,
      autoIndex: !isProduction,
      connectTimeoutMS: 5000,
      dbName: noRelationalEnvironment.getDatabaseName(),
      enableUtf8Validation: true,
      heartbeatFrequencyMS: 30000,
      minPoolSize: 5,
      maxPoolSize: 10,
      pass: noRelationalEnvironment.getDatabasePassword(),
      socketTimeoutMS: 30000,
      uri: uri,
      user: noRelationalEnvironment.getDatabaseUser(),
    };

    if (isProduction) {
      payload['keepAlive'] = true;
      payload['keepAliveInitialDelay'] = 5000;
      payload['loggerLevel'] = 'error';
    }

    return payload;
  }
}

export default RepositoryNoRelationalOptions;
