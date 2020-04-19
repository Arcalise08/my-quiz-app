import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Quiz, Question} from './quiz.model';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }
  public getQuizzes() {
    return this.http.get(`https://opentdb.com/api_category.php`).pipe(
      map((result: any[]) => {
        // @ts-ignore
        return result.trivia_categories.map(r => new Quiz(r.id, r.name));
      })
    );
  }

  public getQuestions(fileId: number, difficultyId: string) {
    return this.http.get(`https://opentdb.com/api.php?amount=10&category=${fileId}&difficulty=${difficultyId}`).pipe(
      map((result: any[]) => {
        // @ts-ignore
        return result.results.map(r => new Question(r.question, this.joinAnswers(r), r.correct_answer)

        );
      })
    );
  }



  joinAnswers(r) {
    r.incorrect_answers.push(r.correct_answer);
    r.incorrect_answers.sort(() => Math.random() - 0.5);
    return r.incorrect_answers;
  }
}
