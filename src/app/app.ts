import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export default class App {}

// readonly segment = signal<Segment>({
//   id: '1111-2222-3333-4444',
//   title: 'Segment 1',
//   description: 'This is the first segment.',
//   conditions: [
//     {
//       parameter: 'Webmaster status',
//       operator: 'equal_to',
//       value: '18',
//     },
//     {
//       parameter: 'Webmaster geo',
//       operator: 'not_equal_to',
//       value: 'john',
//       join: 'and',
//     },
//   ],
// });
//
// updateTitle(): void {
//   this.segment.update((s) => ({ ...s, title: 'New title' }));
// }
//
// reset(): void {
//   this.segment.set({} as Segment);
// }
// <button matButton type="button" (click)="updateTitle()">
//     Update title
//   </button>
// <button matButton type="button" (click)="reset()">Reset</button>
//   <app-segment [segment]="segment()" />
