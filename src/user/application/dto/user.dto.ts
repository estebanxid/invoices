import { TaxRegimeEnum } from '@user/domain/enum/tax-regime.enum';
import { User } from '@user/domain/model/user.model';
import { IsByteLength, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements User {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsByteLength(12, 13)
  rfc: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TaxRegimeEnum)
  taxRegime: string;
}
