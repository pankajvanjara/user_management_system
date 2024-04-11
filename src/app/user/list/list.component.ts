import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

const MatModules: Array<any> = [
  MatTableModule,
  MatIconModule
];

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [
    ...MatModules,
    CommonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  userService = inject(UserService);
  router = inject(Router);

  editUser(user: any) {
    this.router.navigate(['/user/add'], { queryParams: { ...user } });
  }

}
