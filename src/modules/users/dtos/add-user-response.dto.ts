import { User } from '../users.entity';
import { Exclude, Expose } from 'class-transformer';

export class AddUserResponseDto {
  @Exclude()
  private readonly _name: string;
  @Exclude()
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
