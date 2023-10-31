import { User } from '../users.entity';
import { Expose } from 'class-transformer';

export class AddUserResponseDto {
  private readonly _name: string;
  private readonly _email: string;

  constructor(user: Partial<User>) {
    this._name = user.name;
    this._email = user.email;
  }

  @Expose()
  name(): string {
    return this._name;
  }

  @Expose()
  email(): string {
    return this._email;
  }
}
