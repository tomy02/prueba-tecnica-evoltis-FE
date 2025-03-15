import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/states/app.state';
import { addUser, loadUser, loadUsers, deleteUser, updateUser } from 'src/app/states/user/user.actions';
import { selectUser, selectUserLoading, selectUsers } from 'src/app/states/user/user.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users$: Observable<User[]> = this.store.select(selectUsers) ?? of([]);
  userForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.store.dispatch(loadUsers());
  }

  addUser() {
    this.router.navigate(['users/create']);
  }
  
  editUser(id: number) {
    this.router.navigate(['users/edit/'+id]);
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.store.dispatch(deleteUser({ id }));
    }
  }
}
