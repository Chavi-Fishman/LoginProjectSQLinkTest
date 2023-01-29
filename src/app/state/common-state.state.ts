import { Action, createReducer, on } from "@ngrx/store";
import { AUTH_DATA_PERSONAL_DETAILS, AUTH_DATA_TOKEN } from "app/models/local-storage-keys";
import { PersonalDetails } from "app/models/personal-details";
import { setAuthData } from "./common-state.actions";

const lastAuthToken = localStorage.getItem(AUTH_DATA_TOKEN);

//temp only - take the personal details form local storage
//todo add server api to load personal details for loggod on user that return just his personal details, then we will not need save the personal details in store
const lastAuthPersonalDetails = localStorage.getItem(AUTH_DATA_PERSONAL_DETAILS);

export class AuthUserState {
    token: string;
    personalDetails: PersonalDetails;
}

let initialState: AuthUserState = {
    token: lastAuthToken, personalDetails: lastAuthPersonalDetails ? JSON.parse(lastAuthPersonalDetails) : { name: '', Team: '', joinedAt: null, avatar: '' },
}



const createUserReducer = createReducer(
    initialState,
    on(setAuthData, (state, { token, personalDetails }) => {
        localStorage.setItem(AUTH_DATA_TOKEN, token);
        localStorage.setItem(AUTH_DATA_PERSONAL_DETAILS, JSON.stringify(personalDetails));
        return { ...state, token, personalDetails };
    }),
);

export function userReducer(state: AuthUserState | undefined, action: Action) {
    return createUserReducer(state, action);
}

