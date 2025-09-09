import { Component, computed, input, signal } from '@angular/core';
import {
  Condition,
  FilterOperatorValues,
  JoinValues,
  Segment,
} from '../models';
import {
  Control,
  customError,
  disabled,
  FieldPath,
  form,
  PathKind,
  required,
  schema,
  validate,
} from '@angular/forms/signals';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatError, MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';

export function minTwoConditions(
  conditionsPath: FieldPath<Condition[], PathKind.Child>,
) {
  validate(conditionsPath, (ctx) => {
    const conditions = ctx.value();

    if (conditions.length < 2) {
      return customError({
        kind: 'minTwoConditions',
        message: `At least 2 conditions are required. Currently have ${conditions.length}.`,
      });
    }

    return undefined;
  });
}

const SEGMENT_SCHEMA = schema<Segment>((segment) => {
  required(segment.title, {
    message: 'This field is required',
  });
  disabled(segment.title, ({ value }) => value() === 'Default');
  required(segment.description, {
    message: 'Description is required',
  });
  minTwoConditions(segment.conditions);
});

@Component({
  selector: 'app-signal-segment',
  imports: [
    MatInput,
    MatFormField,
    MatLabel,
    MatSelect,
    MatIconButton,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatOption,
    TitleCasePipe,
    MatError,
    JsonPipe,
    Control,
  ],
  templateUrl: './signal-segment.html',
  styleUrl: './signal-segment.scss',
})
export default class SignalSegment {
  readonly segment = input<Segment>();

  readonly parameters = [
    'Webmaster status',
    'Webmaster geo',
    'Webmaster language',
  ];
  readonly operators = FilterOperatorValues;
  readonly joins = JoinValues;

  readonly header = computed(
    () => `${this.segment() ? 'Edit' : 'Create new'} signal segment`,
  );

  readonly segmentModel = signal<Segment>({
    id: '',
    title: '',
    description: '',
    conditions: [
      {
        parameter: 'Webmaster status',
        operator: 'equal_to',
        value: '18',
      },
      // {
      //   parameter: 'Webmaster geo',
      //   operator: 'not_equal_to',
      //   value: 'john',
      //   joinOp: 'and',
      // },
    ],
  });

  readonly form = form(this.segmentModel, SEGMENT_SCHEMA);

  addCondition() {
    this.form.conditions().value.set([
      ...this.form.conditions().value(),
      {
        parameter: this.parameters[0],
        operator: 'equal_to',
        value: '',
        joinOp: 'and',
      },
    ]);
  }

  removeCondition(i: number) {
    this.form
      .conditions()
      .value.update((conditions) =>
        conditions.filter((_, index) => index !== i),
      );
  }

  save(): void {
    console.log('Segment saved:', this.form());
  }

  cancel(): void {
    console.log('Segment creation/editing cancelled');
  }
}
