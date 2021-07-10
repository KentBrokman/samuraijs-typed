
export type FriendType = {
    id: number
    name: string
}

let initialState  = {
    friends: [
        {id: 1, name: 'Andrey'},
        {id: 2, name: 'Artem'},
        {id: 3, name: 'Evgeniy'}
    ] as Array<FriendType>
};

type InitialStateType = typeof initialState


const sidebarReducer = (state = initialState, action: any): InitialStateType => {

    return state;

}


export default sidebarReducer;