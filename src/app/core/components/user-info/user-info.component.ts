import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AUTH_DATA_PERSONAL_DETAILS } from 'app/models/local-storage-keys';
import { PersonalDetails } from 'app/models/personal-details';
import { selectPersonalDetails } from 'app/state/common-state.selectors';
import { AuthUserState } from 'app/state/common-state.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  personalDetails$: Observable<PersonalDetails>;

  constructor(private store: Store<AuthUserState>) { }

  ngOnInit(): void {
    this.personalDetails$ = this.store.pipe(select(selectPersonalDetails));
  }
}
