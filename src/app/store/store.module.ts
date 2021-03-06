import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { AppConfig } from '../../environments/environment';

import { logoutReducer } from './reducers/auth.reducers';

import { CustomSerializer, effects, reducers } from '.';

@NgModule({
  imports: [
    EffectsModule.forRoot(effects),
    StoreModule.forRoot(reducers, { metaReducers: [logoutReducer] }),
    StoreDevtoolsModule.instrument({ maxAge: 100, logOnly: AppConfig.production }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
})
export class AppStoreModule {}
