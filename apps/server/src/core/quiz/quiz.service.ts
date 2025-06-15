import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

interface Question {
  id: string;
  text: string;
  options: string[];
  answer: number;
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

@Injectable()
export class QuizService {
  private quizzes: Quiz[] = [];

  createQuiz(dto: CreateQuizDto): Quiz {
    const quiz: Quiz = {
      id: Date.now().toString(),
      title: dto.title,
      questions: [],
    };
    this.quizzes.push(quiz);
    return quiz;
  }

  addQuestion(quizId: string, dto: CreateQuestionDto): Question {
    const quiz = this.quizzes.find((q) => q.id === quizId);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    const question: Question = {
      id: Date.now().toString(),
      text: dto.text,
      options: dto.options,
      answer: dto.answer,
    };
    quiz.questions.push(question);
    return question;
  }

  findQuiz(id: string): Quiz {
    const quiz = this.quizzes.find((q) => q.id === id);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }
}
