// // constants
// const LOAD = '/chats/getChats'
// const ADD_ONE = 'chats/addChats'

// const load = (chats) => {
//   return {
//     type: LOAD,
//     chats
//   }
// }

// const addOneChat = (chat) => {
//   return {
//     type: ADD_ONE,
//     chat
//   }
// }

// export const getChats = () => async dispatch => {

//     const response = await fetch(`/api/channels/chats`)

//     if (response.ok) {
//         const serversArray = await response.json()
//         // console.log("SERVERSARRAY:",serversArray)
//         dispatch(load(serversArray))
//     }
// }



// const channelReducer = (state = {}, action) => {
//   let newState;
//   switch (action.type) {
//       case SET_CHANNELS:
//           newState = { ...action.channels }
//           return newState;
//       case ADD_CHANNEL:
//           newState = Object.assign({}, state);
//           newState[action.channel.id] = action.channel;
//           return newState;
//       case REMOVE_CHANNEL:
//         newState = Object.assign({}, state);
//         delete newState[action.id];
//         return newState;
//       case UPDATE_CHANNEL:
//         newState = Object.assign({}, state);
//         newState[action.id] = action;
//         return newState
//       default:
//           return state;
//   }
// };

// export default channelReducer;
