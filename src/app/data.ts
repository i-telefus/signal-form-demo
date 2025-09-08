import { InjectionToken } from '@angular/core';
import { Segment } from './models';

export const SEGMENT = new InjectionToken<Segment | undefined>('SEGMENT');

export const segmentMock: Segment = {
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
};
