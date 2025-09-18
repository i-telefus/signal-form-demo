import { Component, computed, input, linkedSignal } from '@angular/core';
import {
  Condition,
  FilterOperatorValues,
  JoinValues,
  ParametersValues,
  Segment,
} from '../models';
import {
  apply,
  Control,
  customError,
  disabled,
  FieldPath,
  form,
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
import { MatCheckbox } from '@angular/material/checkbox';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export function minTwoConditions(
  path: FieldPath<Condition[]>,
  minConditions = 2,
) {
  validate(path, (ctx) => {
    const conditions = ctx.value();

    if (conditions.length < minConditions) {
      return customError({
        kind: 'minTwoConditions',
        message: `At least 2 conditions are required. Currently have ${conditions.length}.`,
      });
    }

    return null;
  });
}

const segmentSchema = schema<Segment>((segment) => {
  required(segment.title, {
    message: 'This field is required',
    when: ({ valueOf }) => valueOf(segment.isDescriptionRequired) === true,
  });
  required(segment.description, {
    message: 'This field is required',
    when: ({ valueOf }) => valueOf(segment.isDescriptionRequired) === true,
  });
  minTwoConditions(segment.conditions);
});

const requiredSchema = schema<string>((path) => {
  required(path, { message: 'This field is required' });
});

const minConditionsSchema = schema<Condition[]>((path) => {
  minTwoConditions(path);
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
    MatCheckbox,
  ],
  templateUrl: './signal-segment.html',
  styleUrl: './signal-segment.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export default class SignalSegment {
  readonly segment = input.required<Segment>();

  readonly parameters = ParametersValues;
  readonly operators = FilterOperatorValues;
  readonly joins = JoinValues;

  readonly header = computed(
    () => `${this.segment() ? 'Edit' : 'Create new'} signal segment`,
  );

  readonly segmentModel = linkedSignal(() => this.segment());

  readonly form = form(this.segmentModel, segmentSchema);

  addCondition() {
    this.form.conditions().value.set([
      ...this.form.conditions().value(),
      {
        parameter: this.parameters[0].key,
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
