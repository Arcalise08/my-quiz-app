import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {switchMap} from 'rxjs/operators';
import { QuestionsService} from '../questions.service';
import {Quiz, Answers, Choice, Question} from '../quiz.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  answers: Answers;
  quiz: Quiz;
  currentQuestionIndex: number;
  currentIncorrect: number;
  questions: Question[];
  showResults = false;

  constructor(private route: ActivatedRoute, private questionsService: QuestionsService) {

  }
  ngOnInit() {
    this.questionsService.getQuestions(this.route.snapshot.params.quizId, this.route.snapshot.params.difficultyId).subscribe(questions => {
      this.questions = questions;
      this.answers = new Answers([], []);
      this.currentIncorrect = 0;
      this.currentQuestionIndex = 0;
    });
  }

  updateChoice(choice: Choice) {
    this.answers.values[this.currentQuestionIndex] = choice;
  }

  nextOrViewResults() {
    const a = this.answers.values[this.currentQuestionIndex].toString();
    const check = a.search(' correct');

    if (check === -1) {
      const tempArr: any = {
        questionName: this.questions[this.currentQuestionIndex].label,
        choices: this.questions[this.currentQuestionIndex].choices,
        picked: a.replace(' incorrect', ''),
        correctAnswer: this.questions[this.currentQuestionIndex].correct
      };
      this.answers.incorrect[this.currentIncorrect] = tempArr;
      this.currentIncorrect++;
    }

    if (this.currentQuestionIndex === this.questions.length - 1) {

      this.showResults = true;
      return;
    }

    this.currentQuestionIndex++;
  }

  reset() {
    this.quiz = undefined;
    this.questions = undefined;
    this.answers = undefined;
    this.currentQuestionIndex = undefined;
    this.currentIncorrect = undefined;
  }
}
