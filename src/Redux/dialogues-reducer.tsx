import { DialogsType, MessagesType } from './../types/types'
import {InferActionsTypes} from "./Redux-store";


let initialState = {
    dialogues: [
        {id: 1, name: "Dima"},
        {id: 2, name: "Vasya"},
        {id: 3, name: "Petya"},
        {id: 4, name: "Fedor"},
        {id: 5, name: "Sveta"},
        {id: 6, name: "Igor"},
    ] as Array<DialogsType>,

    dialogueItem: {
        messages: [
            {message: 'Hello!'},
            {message: 'How are you?'},
            {message: 'Watcha doing?'}
        ] as Array<MessagesType>
    }

};


const dialoguesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'ADD_MESSAGE':
            return {
                ...state,
                dialogueItem: {
                    messages: [...state.dialogueItem.messages, {message: action.newMessageBody}]
                }
            }
        default:
            return state;
    }

}




export const actions = {
    addMessage: (newMessageBody: string) => ({type: 'ADD_MESSAGE', newMessageBody: newMessageBody} as const)
}

export default dialoguesReducer;


export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>