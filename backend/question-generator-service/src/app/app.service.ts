import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({
  apiKey: process.env.google_api_key,
});

@Injectable()
export class AppService {
  constructor(private readonly http: HttpService) {}
  getData(): { message: string } {
    return { message: 'Hello from question-generator API' };
  }

  async generateQuestions(
    difficulty: string,
    techStack: string[],
    count: number
  ) {
    const prompt = `
      Generate ${count} interview questions with the following format:
      - qn
      - answer
      - detailed explanation
      - code snippet (if applicable)
      - tags: tech stack + difficulty
      Send me as a downloadable json format to include in code. no other text before or after the json.

      Tech stack: ${techStack.join(', ')}
      Difficulty: ${difficulty}
      `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: [prompt],
    });
    return response.text;
  }
}
