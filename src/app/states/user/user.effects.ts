import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import * as UserActions from './user.actions';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private userService: UserService, private router: Router) {}

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
          ofType(UserActions.loadUsers), 
          mergeMap(() => {
            return this.userService.getUsers().pipe( 
              map(users => {
                return UserActions.loadUsersSuccess({ users });
              }),
              catchError(error => {
                console.error('❌ Error en loadUsers$', error);
                return of(UserActions.loadUsersFailure({ error: error.message }));
              })
            );
          })
        )
    );
  
    addUser$ = createEffect(() =>
        this.actions$.pipe(
          ofType(UserActions.addUser), 
          mergeMap(action => this.userService.addUser(action.user).pipe( 
            map(user => UserActions.addUserSuccess({ user })),
            catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
          ))
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
          ofType(UserActions.updateUser),
          switchMap(({ user }) =>
            this.userService.updateUser(user).pipe(
              map(updatedUser => UserActions.updateUserSuccess({ user: updatedUser })),
              catchError(error => of(UserActions.updateUserFailure({ error: error.message })))
            )
          )
        )
      );
    
    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
          ofType(UserActions.deleteUser), 
          mergeMap(action => this.userService.deleteUser(action.id).pipe( 
            map(() => UserActions.deleteUserSuccess({ id: action.id })),
            catchError(error => of(UserActions.deleteUserFailure({ error: error.message })))
          ))
        )
    );

    redirectAfterAdd$ = createEffect(() =>
        this.actions$.pipe(
          ofType(UserActions.addUserSuccess),
          map(() => {
            this.router.navigate(['/users']);
            return { type: 'no-action' };
          })
        )
      );
     
      redirectAfterUpdate$ = createEffect(() =>
        this.actions$.pipe(
          ofType(UserActions.updateUserSuccess),
          map(() => {
            this.router.navigate(['/users']);
            return { type: 'no-action' };
          })
        )
      );
}
