import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarComponent } from '@libs/hys-avatar';

@Component({
  imports: [AvatarComponent],
  selector: 'app-user-profile-badge',
  templateUrl: './user-profile-badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileBadgeComponent {}
