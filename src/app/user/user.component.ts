import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { ListComponent } from './list/list.component';
import { UserService } from '../shared/services/user.service';

const STAND_COMPONENTS: Array<any> = [
  ListComponent
]

const MAT_MODULES: Array<any> = [
  MatButtonModule
]

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ...STAND_COMPONENTS,
    ...MAT_MODULES
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  userService = inject(UserService);

}
