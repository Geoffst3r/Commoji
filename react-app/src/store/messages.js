// constants
const LOAD = '/messages/getMessages'
const ADD_ONE = 'messages/addMessage'

const load = (messages) => {
  return {
    type: LOAD,
    messages
  }
}

const addOneMessage = (message) => {
  return {
    type: ADD_ONE,
    message
  }
}

export const getMessages = (channelId) => async dispatch => {

    const response = await fetch(`/api/channels/messages/${channelId}`)

    if (response.ok) {
        const messageArr = await response.json()
        console.log("messageArr ##########',:",messageArr)
        dispatch(load(messageArr))
    }
}

export const createMessage = (newMessage, channelId) => async dispatch => {
   
    const response = await fetch(`/api/channels/messages/${channelId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(newMessage)
        body: JSON.stringify({
            "message": newMessage,
            "channelId": channelId
        })
    })
    const message = await response.json()

    if (response.ok) dispatch(addOneMessage(message))
}


const initialState = {};

const messageReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
        case LOAD:{
            const messages = {}
            // console.log('!!!!! ACTION', action)
            const messageArr = action.messages
            // console.log('messageArr', messageArr)

            // console.log('messageArr inside reducer', messageArr)

            messageArr.forEach(message => {
                messages[message.id] = message
            });
            return {
                ...state, messages, messageArr
            }}
        case ADD_ONE:{
            // console.log('ADD_ONE inside reducer', state)

            const message = action.message
            const messages = state.messages

            // console.log('STATE MESSAGE ADD ONE -----', state)

            const messageArr = state.messageArr;
            messageArr[message.id] = message
            messages[message.id]= message
            const newState = {
                ...state, messages, messageArr
            }
            return newState
        }

    }
}

export default messageReducer;
