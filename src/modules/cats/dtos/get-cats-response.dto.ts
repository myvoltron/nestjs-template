import { Cat } from '../cats.entity';

export class GetCatsResponseDto {
  private readonly _idx: number;
  private readonly _name: string;
  private readonly _kind: string;
  private readonly _createdDate: Date;

  constructor(cat: Cat) {
    this._idx = cat.idx;
    this._name = cat.name;
    this._kind = cat.kind;
    this._createdDate = cat.createdDate;
  }

  get idx(): number {
    return this._idx;
  }

  get name(): string {
    return this._name;
  }

  get kind(): string {
    return this._kind;
  }

  get createdDate(): Date {
    return this._createdDate;
  }
}
