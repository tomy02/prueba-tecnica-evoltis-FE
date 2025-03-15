import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(selectUserState, state => state.user);
export const selectUserLoading = createSelector(selectUserState, state => state.loading);
export const selectUserError = createSelector(selectUserState, state => state.error);

export const selectUsers = createSelector(selectUserState, state => state.users);
export const selectUsersLoading = createSelector(selectUserState, state => state.loading);
export const selectUsersError = createSelector(selectUserState, state => state.error);
