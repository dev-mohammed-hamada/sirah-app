import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  sonId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;

  @IsString()
  @IsNotEmpty()
  stageGroupId: string;

  @IsDateString()
  deadline: string;

  @IsString()
  @MaxLength(100)
  rewardDescription: string;
}
