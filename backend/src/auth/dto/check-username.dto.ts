import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CheckUsernameDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  username: string;
}
