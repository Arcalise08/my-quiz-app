import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Quiz, Question} from './quiz.model';
import {concat} from 'rxjs';
import {join} from '@angular/compiler-cli/src/ngtsc/file_system';
import {StringDecoder} from 'string_decoder';
import {parse} from 'ts-node';
import {decode, stringify} from 'querystring';

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

  public getQuestions(fileId: number) {
    return this.http.get(`https://opentdb.com/api.php?amount=10&category=${fileId}`).pipe(
      map((result: any[]) => {
        // @ts-ignore
        return result.results.map(r => new Question(r.question, this.joinAnswers(r), r.correct_answer)

        );
      })
    );
  }



  joinAnswers(r) {
    r.incorrect_answers.push(r.correct_answer);
    return r.incorrect_answers;
  }
}
