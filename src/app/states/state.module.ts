import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './app.state';
import { UserEffects } from './user/user.effects';

@NgModule({
  imports: [
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([UserEffects])
  ]
})
export class StateModule {}
