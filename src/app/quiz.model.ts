import {Observable, ObservedValueOf} from 'rxjs';

export class Choice {
  constructor(public value: string, public correctChoice: any) {}
}

export class Question {
  constructor(public label: string, public choices: Choice[], public correct: Choice['correctChoice']) {}
}

export class Quiz {
  constructor(public label: number, public name: string)
  {}
}

export class Answers {
  constructor(public values: Choice[] = [], public incorrect: Choice['correctChoice']) {}
}
