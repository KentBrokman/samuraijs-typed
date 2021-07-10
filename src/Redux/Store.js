import dialoguesReducer from "./dialogues-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";


let store = {
    _state: {
        sidebar: {
            friends: [
                {id: 1, name: 'Andrey'},
                {id: 2, name: 'Artem'},
                {id: 3, name: 'Evgeniy'}
            ]
        },

        profilePage: {
            posts: [
                {id: 1, like: 34, message: "How are you?"},
                {id: 2, like: 12, message: "I have bought a car"},
                {id: 1, like: 4, message: "Many cats"},
                {id: 3, like: 10, message: "Everything is awsome"},
            ],
            newPostText: 'Enter your text'
        },

        dialoguesPage: {
            dialogues: [
                {id: 1, name: "Dima"},
                {id: 2, name: "Vasya"},
                {id: 3, name: "Petya"},
                {id: 4, name: "Fedor"},
                {id: 5, name: "Sveta"},
                {id: 6, name: "Igor"},
            ],

            dialogueItem: {

                messages: [
                    {message: 'Hello!'},
                    {message: 'How are you?'},
                    {message: 'Watcha doing?'}
                ],
                newMessage: ''

            }

        }


    },
    _callSubscriber() {
        console.log('Page rerendered')
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialoguesPage = dialoguesReducer(this._state.dialoguesPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    }
}




window.store = store;


export default store;

