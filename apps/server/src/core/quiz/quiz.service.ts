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

interface Attempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  createdAt: Date;
}

@Injectable()
export class QuizService {
  private quizzes: Quiz[] = [];
  private attempts: Attempt[] = [];

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

  submitAnswers(quizId: string, userId: string, answers: number[]): Attempt {
    const quiz = this.findQuiz(quizId);
    const score = quiz.questions.reduce((acc, q, idx) => {
      return acc + (answers[idx] === q.answer ? 1 : 0);
    }, 0);
    const attempt: Attempt = {
      id: Date.now().toString(),
      quizId,
      userId,
      score,
      createdAt: new Date(),
    };
    this.attempts.push(attempt);
    return attempt;
  }

  getHistory(quizId: string, userId: string): Attempt[] {
    return this.attempts.filter(
      (a) => a.quizId === quizId && a.userId === userId,
    );
  }
}
