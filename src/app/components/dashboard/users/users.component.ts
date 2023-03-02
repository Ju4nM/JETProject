import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import User from './interfaces/user.interface';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  userData: User[] = [];

  constructor (
    private userService: UsersService
  ) {
  }
  
  ngOnInit() {
    this.loadData();
  }

  loadData () {
    this.userService.getUsers()
      .subscribe(
        (res: User[]) => this.userData = res
      );
  }

}
