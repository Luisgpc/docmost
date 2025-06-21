import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { SubmitAnswersDto } from './dto/submit-answers.dto';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('create')
  create(@Body() dto: CreateQuizDto) {
    return this.quizService.createQuiz(dto);
  }

  @Post(':id/questions')
  addQuestion(@Param('id') id: string, @Body() dto: CreateQuestionDto) {
    return this.quizService.addQuestion(id, dto);
  }

  @Post(':id/attempts')
  submit(
    @Param('id') id: string,
    @Body() dto: SubmitAnswersDto,
  ) {
    return this.quizService.submitAnswers(id, dto.userId, dto.answers);
  }

  @Get(':id/history/:userId')
  getHistory(@Param('id') id: string, @Param('userId') userId: string) {
    return this.quizService.getHistory(id, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findQuiz(id);
  }
}
