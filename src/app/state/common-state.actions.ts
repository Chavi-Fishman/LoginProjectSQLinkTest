import { createAction, props } from "@ngrx/store";
import { PersonalDetails } from "app/models/personal-details";

export const setAuthData = createAction('[AuthUserState] setAuthData', props<{ token: string, personalDetails: PersonalDetails}>());
