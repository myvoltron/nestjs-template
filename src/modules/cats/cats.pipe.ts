import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdateCatQueryDto } from './dtos/update-cat-request.dto';
import { DeleteCatQueryDto } from './dtos/delete-cat-request.dto';

@Injectable()
export class UpdateCatQueryPipe implements PipeTransform {
  transform(value: any): UpdateCatQueryDto {
    const result = new UpdateCatQueryDto();
    result.idx = parseInt(value.idx, 10);
    return result;
  }
}

@Injectable()
export class DeleteCatQueryPipe implements PipeTransform {
  transform(value: any): DeleteCatQueryDto {
    const result = new DeleteCatQueryDto();
    result.idx = parseInt(value.idx, 10);
    return result;
  }
}
