import { useSelector } from "react-redux";


const LOAD = 'servers/LOAD';
const ADD_ONE = 'servers/ADD_ONE';
// const DELETE_ONE = 'servers/DELETE_ONE'
// const EDIT_ONE = 'servers/EDIT_ONE'

const load = serversArray => ({
    type: LOAD,
    serversArray
})

const addOneServer = server => ({
    type: ADD_ONE,
    server
})

export const getServers = () => async dispatch => {

    const response = await fetch(`/api/channels`)

    if (response.ok) {
        const serversArray = await response.json()
        // console.log("SERVERSARRAY:",serversArray)
        dispatch(load(serversArray))
    }
}

export const createServer = (newServer) => async dispatch => {
    const response = await fetch(`/api/channels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newServer)
    })
    const server = await response.json()
    if (response.ok) dispatch(addOneServer(server))
}




const initialState = {};

const serversReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
        case LOAD:{
            const servers = {}
            const serversArray = action.serversArray
            console.log('serversARRAY',serversArray)
            action.serversArray.forEach(server => {
                servers[server.serverId] = server
            });
            return {
                ...state, servers, serversArray
            }}
        case ADD_ONE:{
            const server = action.server
            const servers = state.servers
            const serversArray = state.servers.serversArray;
            serversArray[server.serverId] = server
            servers[server.serverId]= server
            const newState = {
                ...state, servers, serversArray
            }
            return newState
        }

    }
}

export default serversReducer
