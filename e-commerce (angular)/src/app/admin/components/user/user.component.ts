import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/admin/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  usersData: any;
  userPerPage: any;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems!: number;
  subscription!: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(): void {
    this.subscription = this.userService.getAllUsers().subscribe(userDataFromDB => {
      this.usersData = userDataFromDB.users;
      this.userPerPage = this.usersData;
      this.totalItems = this.usersData.length;
      console.log(userDataFromDB);
      this.loadUsers();
    });
  }

  loadUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.userPerPage = this.usersData.slice(startIndex, endIndex);
    console.log(startIndex, endIndex)

  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.totalItems) {
      this.currentPage++;
      console.log(this.currentPage)
      this.loadUsers();
      console.log(this.usersData)
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
