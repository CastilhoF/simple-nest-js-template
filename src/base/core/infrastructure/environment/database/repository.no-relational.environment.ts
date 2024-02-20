import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import RepositoryNoRelationalInterface from '@/base/core/application/environment/repository.no-relational.interface';

@Injectable()
class RepositoryNoRelationalEnvironment
  implements RepositoryNoRelationalInterface
{
  constructor(private readonly configService: ConfigService) {}

  public getDatabaseType(): string {
    return this.configService.get<string>('NO_RELATIONAL_DATABASE_TYPE');
  }

  public getDatabaseHost(): string {
    return this.configService.get<string>('NO_RELATIONAL_DATABASE_HOST');
  }

  public getDatabasePort(): number {
    return this.configService.get<number>('NO_RELATIONAL_DATABASE_PORT');
  }

  public getDatabaseName(): string {
    return this.configService.get<string>('NO_RELATIONAL_DATABASE_NAME');
  }

  public getDatabaseUser(): string {
    return this.configService.get<string>('NO_RELATIONAL_DATABASE_USER');
  }

  public getDatabasePassword(): string {
    return this.configService.get<string>('NO_RELATIONAL_DATABASE_PASSWORD');
  }

  public getDatabaseParams(): string {
    return this.configService.get<string>('NO_RELATIONAL_DATABASE_PARAMS');
  }

  public getDatabaseURL(): string {
    const type = this.getDatabaseType();
    const host = this.getDatabaseHost();
    const port = this.getDatabasePort();
    const user = this.getDatabaseUser();
    const password = this.getDatabasePassword();
    const database = this.getDatabaseName();
    const params = this.getDatabaseParams();

    return `${type}://${user}:${password}@${host}:${port}/${database}${params}`;
  }
}

export default RepositoryNoRelationalEnvironment;
