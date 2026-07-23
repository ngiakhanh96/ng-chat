import {
  ChangeDetectorRef,
  DestroyRef,
  Pipe,
  PipeTransform,
  inject,
} from '@angular/core';
import { Utilities } from '../utilities/utilities';

@Pipe({ name: 'displayDate', pure: false })
export class DisplayDatePipe implements PipeTransform {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly refreshTimer = setInterval(
    () => this.changeDetectorRef.markForCheck(),
    Utilities.secondsInOneMinute * 1000,
  );

  constructor() {
    this.destroyRef.onDestroy(() => clearInterval(this.refreshTimer));
  }

  transform(value: string): string {
    const displayDateString = Utilities.dateToDisplayString(new Date(value));
    return displayDateString === '0 second ago'
      ? 'Just now'
      : displayDateString;
  }
}
