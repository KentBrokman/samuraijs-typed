
import {getAuthUserData} from "./auth-reducer";
import {Dispatch} from "redux";
import {BaseThunkType, InferActionsTypes} from "./Redux-store";




let initialState = {
    isInitialised: false
};

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'INITIALISED_SUCCESSFULLY':
            return {
                ...state,
                isInitialised: true
            }
        default:
            return state;
    }

}

// type ActionsTypes = InitialisedSuccessfullyActionType
// type DispatchType = Dispatch<ActionsTypes>
// type ImportedThunkType = (): ThunkType


export const actions = {
    initialisedSuccessfully: () => ({type: "INITIALISED_SUCCESSFULLY"} as const)
}

// export const initialisedSuccessfully = (): InitialisedSuccessfullyActionType => ({type: INITIALISED_SUCCESSFULLY});

export const initialiseApp = (): ThunkType => async (dispatch) => {
    const promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initialisedSuccessfully())
        })
}


export default appReducer;

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>