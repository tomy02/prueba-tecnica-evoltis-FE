import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: RegisterComponent }
];

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class RegisterModule { }