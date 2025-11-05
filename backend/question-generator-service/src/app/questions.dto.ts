// dto/interview-question.dto.ts
import { IsEnum, IsArray, IsInt, Max, Min } from 'class-validator';

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  DIFFICULT = 'difficult',
}

export class InterviewQuestionDto {
  @IsEnum(Difficulty)
  difficulty!: Difficulty;

  @IsArray()
  techStack!: string[];

  @IsInt()
  @Min(1)
  @Max(50)
  count!: number;
}
