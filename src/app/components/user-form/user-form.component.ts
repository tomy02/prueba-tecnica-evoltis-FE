import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AppState } from 'src/app/states/app.state';
import { loadUser, updateUser, addUser } from 'src/app/states/user/user.actions';
import { selectUser } from 'src/app/states/user/user.selectors';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm: FormGroup;
  user$: Observable<User | null> = new Observable<User | null>();
  createMode: boolean = false;
  editMode: boolean = false;
  userId = this.route.snapshot.paramMap.get('id');
  isPasswordModalOpen: boolean = false;
  currentPassword: string = '';
  
  @ViewChild('changePasswordModal', { static: false })
  changePasswordModal!: TemplateRef<any>;


  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    if(this.route.snapshot.routeConfig?.path == 'create'){
      this.createMode = true;
      this.editMode = false;
    }else{
      this.createMode = false;
      this.editMode = true;
      this.userService.getUserById(Number(this.userId)).subscribe(user => {
        this.userForm.patchValue(user);
        this.userForm.get('password')?.setValue("*******");
      });
    }
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');  
    if (userId) {
      this.editMode = true;  
      this.userForm.get('password')?.disable();
      this.store.dispatch(loadUser({ id: +userId }));  
      this.user$ = this.store.select(selectUser); 

      this.user$.subscribe(user => {
        if (user) {
          this.userForm.patchValue({
            name: user.name,
            email: user.email
          });
        }
      });
    } else {
      this.editMode = false; 
      this.user$ = new Observable(); 
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;

      if (this.editMode) {
        this.store.dispatch(updateUser({ user: { ...user, id: +this.userId! } }));
      } else {
        this.store.dispatch(addUser({ user }));
      }
    }
  }

  openChangePasswordModal(): void {
    this.isPasswordModalOpen = true;
  }

  closeChangePasswordModal(): void {
    this.isPasswordModalOpen = false;
  }
  
  validateCurrentPassword(): void {
    const userId = 1; 
    
    this.userService.validatePassword(userId, this.currentPassword).subscribe(response => {
      if (response.isValid.result) {
        this.userForm.get('password')?.enable();
        this.userForm.get('password')?.setValue(this.currentPassword);
        this.closeChangePasswordModal();
      } else {
        alert('La contraseña actual es incorrecta.');
      }
    }, error => {
      console.error('Error al validar la contraseña', error);
    });
  }
}
