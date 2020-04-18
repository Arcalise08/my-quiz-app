import {Component, EventEmitter,Input, Output, OnInit} from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Question } from '../quiz.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})

export class QuestionFormComponent implements OnInit {
  @Input() question: Question;
  @Output() onChoiceMade = new EventEmitter<string>();
  form: FormGroup;
  ngOnInit() {

    this.form = new FormGroup({
      choice: new FormControl()
    });
    this.form.valueChanges.subscribe(this.onChange);
  }
  onChange = () => {
    if (this.form.value.choice === this.question.correct) {
      this.onChoiceMade.emit(this.form.value.choice + [' correct']);
    }
    else {
        this.onChoiceMade.emit(this.form.value.choice + [' incorrect']);
    }
  }

}
