import profileReducer, {addPost, deletePost} from "./profile-reducer";

let state = {
    posts: [
        {id: 1, like: 34, message: "How are you?"},
        {id: 2, like: 12, message: "I have bought a car"},
        {id: 3, like: 4, message: "Many cats"},
        {id: 4, like: 10, message: "Everything is awsome"},
    ]
};

// it('length of posts should be incremented', () => {
//
//     // 1. test data
//     let action = addPost('Hello team!');
//
//     // 2. action
//     let newState = profileReducer(state, action)
//
//     // 3. expectation
//     expect(newState.posts.length).toBe(5)
// })

// it('message of new post should be "Hello team!"', () => {
//
//     // 1. test data
//     let action = addPost('Hello team!');
//
//     // 2. action
//     let newState = profileReducer(state, action)
//
//     // 3. expectation
//     expect(newState.posts[4].message).toBe('Hello team!')
// })

// it('length of posts should be decremented', () => {
//
//     // 1. test data
//     let action = deletePost(1);
//
//     // 2. action
//     let newState = profileReducer(state, action)
//
//     // 3. expectation
//     expect(newState.posts.length).toBe(3)
// })