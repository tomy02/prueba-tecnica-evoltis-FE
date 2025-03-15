import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from 'src/app/models/user.model';

export interface UserState {
  user: User | any;
  users: User[] | any[];
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    user: undefined
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUserSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(UserActions.addUserSuccess, (state, { user }) => ({ ...state, users: [...state.users, user], loading: false })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({ ...state, users: state.users.map(u => u.id === user.id ? user : u) })),
  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id)
  })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error
  })),
);
