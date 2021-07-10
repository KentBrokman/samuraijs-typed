import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {Dispatch} from "redux";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./Redux-store";
import {profileApi} from "../api/profile-api";



let initialState = {
    posts: [
        {id: 1, like: 34, message: "How are you?"},
        {id: 2, like: 12, message: "I have bought a car"},
        {id: 3, like: 4, message: "Many cats"},
        {id: 4, like: 10, message: "Everything is awsome"},
    ] as Array<PostType>,
    newPostText: 'Enter your text',
    profile: null as ProfileType | null ,
    status: ''
};


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST': {
            return {
                ...state,
                posts: [...state.posts, {
                    id: 5,
                    like: 0,
                    message: action.newPostBody
                }]
            }
        }
        case 'DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(post => post.id != action.postId)
            }
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SET_USER_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SAVE_PHOTO_SUCCESSED': {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileType
            }
        }
        default:
            return state;
    }

}


export const actions = {
    addPost: (newPostBody: string) => ({type: 'ADD_POST', newPostBody} as const),
    deletePost: (postId: number) => ({type: 'DELETE_POST', postId} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setUserStatus: (status: string) => ({type: 'SET_USER_STATUS', status} as const),
    savePhotoSuccesed: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESSED', photos} as const),
}



export let getProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileApi.getProfile(userId)
    dispatch(actions.setUserProfile(data));
}


export let getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileApi.getStatus(userId)
    dispatch(actions.setUserStatus(data));
}


export let updateStatus = (status: string): ThunkType => async (dispatch) => {

    let data = await profileApi.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setUserStatus(status))
    }
}


export let savePhoto = (file: File): ThunkType => async (dispatch) => {

    let data = await profileApi.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccesed(data.data.photos))
    }
}

export let saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let data = await profileApi.saveProfile(profile);
    if (data.resultCode === 0) {
        if (userId !== null) {
            dispatch(getProfile(userId))
        } else {
            throw new Error('userId cant be null')
        }

    } else {
        let error: string = data.messages[0];
        let errorMatch: Array<string> | null | string = error.match(/(?<=>)\w+/);
        let errorObj: any = {};
        if (!errorMatch) {
            errorMatch = error.match(/(?<=\()\w+/);
            if (errorMatch === null) return Promise.reject('someError')
            errorMatch = errorMatch[0]
            let errorMatchFormated = errorMatch.slice(0, 1).toLowerCase() + errorMatch.slice(1)
            errorObj[errorMatchFormated] = error;
            dispatch(stopSubmit('profileData', errorObj))
            return Promise.reject(error)
        } else {
            let errorTarget = errorMatch[0].toLowerCase();
            errorObj[errorTarget] = data.messages[0];
            dispatch(stopSubmit('profileData', {'contacts': errorObj}))
            return Promise.reject(error)
        }

    }
}


export default profileReducer;


type ActionsType = InferActionsTypes<typeof actions>
type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsType | FormAction>