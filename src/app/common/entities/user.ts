export class User {
  email: string;
  password: string;
  readonly roles: string[];

  get isAdmin(): boolean {
    return this.roles.find(role => role.toLowerCase() == 'admin') != null
  }
}
