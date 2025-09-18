import {
  Component,
  computed,
  signal,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatError, MatOption, MatSelect } from '@angular/material/select';
import {
  Condition,
  FilterOperatorValues,
  JoinValues,
  ParametersValues,
  Segment,
} from '../models';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatCard,
  MatCardTitle,
  MatCardHeader,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { JsonPipe, TitleCasePipe } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-segment',
  imports: [
    FormsModule,
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
    MatCheckbox,
  ],
  templateUrl: './segment.html',
  styleUrl: './segment.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export default class SegmentComponent {
  readonly segment = input.required<Segment>();

  readonly parameters = ParametersValues;
  readonly operators = FilterOperatorValues;
  readonly joins = JoinValues;

  readonly header = computed(
    () => `${this.segment() ? 'Edit' : 'Create new'} segment`,
  );

  readonly title = linkedSignal(() => this.segment()?.title ?? '');
  readonly description = linkedSignal(() => this.segment()?.description ?? '');
  readonly isRequired = linkedSignal(
    () => this.segment()?.isDescriptionRequired ?? false,
  );
  readonly conditions = linkedSignal<Condition[]>(
    () =>
      this.segment()?.conditions ?? [
        {
          parameter: this.parameters[0],
          operator: 'equal_to',
          value: 'some value',
        },
      ],
  );

  readonly payload = computed<Segment>(() => ({
    id: this.segment().id,
    title: this.title(),
    description: this.description(),
    isDescriptionRequired: this.isRequired(),
    conditions: this.conditions(),
  }));

  addCondition() {
    this.conditions.set([
      ...this.conditions(),
      {
        parameter: this.parameters[0].key,
        operator: 'equal_to',
        value: '',
        joinOp: 'and',
      },
    ]);
  }

  removeCondition(i: number) {
    this.conditions.set(
      [...this.conditions()].filter((_, index) => index !== i),
    );
  }

  save(): void {
    console.log('Segment saved:', this.payload());
  }

  cancel(): void {
    console.log('Segment creation/editing cancelled');
  }
}
