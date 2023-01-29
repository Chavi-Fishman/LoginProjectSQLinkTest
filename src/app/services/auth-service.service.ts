import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PersonalDetails } from 'app/models/personal-details';
import { setAuthData } from 'app/state/common-state.actions';
import { selectToken } from 'app/state/common-state.selectors';
import { AuthUserState } from 'app/state/common-state.state';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private LOGIN_URL = 'https://private-052d6-testapi4528.apiary-mock.com/authenticate';
  public token: string;

  constructor(private httpClient: HttpClient, private store: Store<AuthUserState>) {

    store.pipe(select(selectToken)).subscribe(token => {
      this.token = token;
    })

  }

  public get isLoggedOn(): boolean {
    return this.token ? true : false;
  }

  login(login: { email: string, password: string }): Observable<{ token: string, personalDetails: PersonalDetails }> {
    return this.httpClient.post<{ token: string, personalDetails: PersonalDetails }>(this.LOGIN_URL, login)
      .pipe(map(response => response[0]))
      .pipe(tap(response => {
        this.store.dispatch(setAuthData(response));
      }))
  }

}
