import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SignalSegment from '../signal-segment/signal-segment';
import SegmentComponent from '../segment/segment';
import { Segment } from '../models';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-wrapper',
  imports: [SignalSegment, SegmentComponent, MatButton],
  template: `
    <button matButton type="button" (click)="updateTitle()">
      Update title
    </button>
    <button matButton type="button" (click)="reset()">Reset</button>
    @if (isSignalRoute) {
      <app-signal-segment [segment]="segment()" />
    } @else {
      <app-segment [segment]="segment()" />
    }
  `,
})
export default class Wrapper {
  readonly isSignalRoute = inject(Router).url.includes('/signal');

  readonly segment = signal<Segment>({
    id: '1111-2222-3333-4444',
    title: 'Segment 1',
    description: 'This is the first segment.',
    isDescriptionRequired: false,
    conditions: [
      {
        parameter: 'WebmasterStatus',
        operator: 'equal_to',
        value: '18',
      },
      {
        parameter: 'WebmasterGeo',
        operator: 'not_equal_to',
        value: 'john',
        joinOp: 'and',
      },
    ],
  });

  updateTitle(): void {
    this.segment.update((s) => ({ ...s, title: 'New title' }));
  }

  reset(): void {
    this.segment.set({
      title: '',
      description: '',
      isDescriptionRequired: false,
      conditions: [
        {
          parameter: 'WebmasterGeo',
          operator: 'equal_to',
          value: 'EN',
        },
      ],
    });
  }
}
