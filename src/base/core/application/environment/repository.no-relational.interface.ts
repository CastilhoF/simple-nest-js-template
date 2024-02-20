interface RepositoryNoRelationalInterface {
  getDatabaseType(): string;
  getDatabaseHost(): string;
  getDatabasePort(): number;
  getDatabaseUser(): string;
  getDatabasePassword(): string;
  getDatabaseName(): string;
  getDatabaseParams(): string;
  getDatabaseURL(): string;
}

export default RepositoryNoRelationalInterface;
