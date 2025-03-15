import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UserFormComponent } from '../user-form/user-form.component';

const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'create', component: UserFormComponent },
    { path: 'edit/:id', component: UserFormComponent }
];

@NgModule({
    declarations: [UserListComponent, UserFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ButtonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class UserModule { }