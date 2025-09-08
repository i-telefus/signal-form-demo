import { Component, signal } from '@angular/core';
import { SegmentComponent } from './segment/segment';
import { Segment } from './models';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [MatButton, SegmentComponent],
  template: `
    <button matButton type="button" (click)="updateTitle()">
      Update title
    </button>
    <button matButton type="button" (click)="reset()">Reset</button>
    <app-segment [segment]="segment()" />
  `,
})
export default class App {
  readonly segment = signal<Segment>({
    id: '1111-2222-3333-4444',
    title: 'Segment 1',
    description: 'This is the first segment.',
    conditions: [
      {
        parameter: 'Webmaster status',
        operator: 'equal_to',
        value: '18',
      },
      {
        parameter: 'Webmaster geo',
        operator: 'not_equal_to',
        value: 'john',
        join: 'and',
      },
    ],
  });

  updateTitle(): void {
    this.segment.update((s) => ({ ...s, title: 'New title' }));
  }

  reset(): void {
    this.segment.set({} as Segment);
  }
}
