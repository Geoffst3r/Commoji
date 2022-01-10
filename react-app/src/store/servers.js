import { useSelector } from "react-redux";


const LOAD = 'servers/LOAD';
// const ADD_ONE = 'servers/ADD_ONE';
// const DELETE_ONE = 'servers/DELETE_ONE'
// const EDIT_ONE = 'servers/EDIT_ONE'

const load = serversArray => ({
    type: LOAD,
    serversArray
})

export const getServers = () => async dispatch => {

    const response = await fetch(`/api/channels`)

    if (response.ok) {
        const serversArray = await response.json()
        console.log("SERVERSARRAY:",serversArray)
        dispatch(load(serversArray))
    }
}

const initialState = {};

const serversReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
        case LOAD:
            const servers = {}
            // console.log(action)
            // action.serversArray.forEach(server => {
            //     servers[server.id] = server
            // });
            return {
                ...state, servers
            }
    }
}

export default serversReducer
