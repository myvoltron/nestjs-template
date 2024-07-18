import { Cat } from '../cats.entity';
import { Exclude, Expose } from 'class-transformer';

export class GetCatsResponseDto {
  @Exclude()
  private readonly _idx: number;
  @Exclude()
  private readonly _name: string;
  @Exclude()
  private readonly _kind: string;
  @Exclude()
  private readonly _createdDate: Date;

  constructor(cat: Cat) {
    this._idx = cat.idx;
    this._name = cat.name;
    this._kind = cat.kind;
    this._createdDate = cat.createdDate;
  }

  @Expose()
  get idx(): number {
    return this._idx;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get kind(): string {
    return this._kind;
  }

  @Expose()
  get createdDate(): Date {
    return this._createdDate;
  }
}
