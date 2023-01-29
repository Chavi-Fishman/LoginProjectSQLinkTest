import { createSelector } from "@ngrx/store";
import { AuthUserState } from "./common-state.state";

export const selectAuthUserState = state => state.authUserState;
export const selectToken = createSelector(selectAuthUserState,
    (authUserState: AuthUserState) => authUserState.token);
export const selectPersonalDetails = createSelector(selectAuthUserState,
    (authUserState: AuthUserState) => authUserState.personalDetails);