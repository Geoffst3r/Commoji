import { useSelector } from "react-redux";


const LOAD = 'servers/LOAD';
const ADD_ONE = 'servers/ADD_ONE';
const DELETE_ONE = 'servers/DELETE_ONE'
const EDIT_ONE = 'servers/EDIT_ONE'

const load = serversArray => ({
    type: LOAD,
    serversArray
})

const addOneServer = server => ({
    type: ADD_ONE,
    server
})

const deleteOneServer = server => ({
    type: DELETE_ONE,
    server
})

const editOneServer = server => ({
    type: EDIT_ONE,
    server
})

export const getServers = () => async dispatch => {

    const response = await fetch(`/api/channels`)

    if (response.ok) {
        const serversArray = await response.json()
        dispatch(load(serversArray))
    }
}

export const createServer = (newServer) => async dispatch => {
    console.log('made it here')
    console.log(newServer)
    const response = await fetch(`/api/channels/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newServer)
    })
    const server = await response.json()
    if (response.ok) dispatch(addOneServer(server))
}

export const deleteServer = (serverToDelete) => async dispatch => {
    const response = await fetch(`/api/channels/${serverToDelete.serverId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serverToDelete)
    })
    // const server = await response.json()
    if (response.ok) dispatch(deleteOneServer(serverToDelete))
}

export const editServer = (serverToEdit) => async dispatch => {
    const response = await fetch(`/api/channels/${serverToEdit.serverId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serverToEdit)
    })
    if (response.ok) dispatch(editOneServer(serverToEdit))
}


const initialState = {};

const serversReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
        case LOAD:{
            const servers = {}
            const serversArray = action.serversArray
            // console.log('serversARRAY',serversArray)
            action.serversArray.forEach(server => {
                servers[server.serverId] = server
            });
            return {
                ...state, servers, serversArray
            }}
        case ADD_ONE:{
            // console.log('ADDONESTATE', state)
            const server = action.server
            const servers = state.servers
            // console.log()
            const serversArray = state.serversArray;
            serversArray[server.serverId] = server
            servers[server.serverId]= server
            const newState = {
                ...state, servers, serversArray
            }
            return newState
        }
        case DELETE_ONE:{
            const deleteServer = action.server;
            console.log(deleteServer)
            const serversArray = state.serversArray;
            const servers = state.servers;
            console.log('SERVERID',servers[deleteServer.serverId])
            delete servers[deleteServer.serverId]
            console.log(servers)
            let index;
            for (let i = 0; i < serversArray.length; i++) {
                const server = serversArray[i];
                if (server.id === deleteServer.serverId) {
                    index = i
                }
            }
            serversArray.splice(index, 1)
            const newState = {
                ...state, servers, serversArray
            }
            return newState
        }
        case EDIT_ONE: {
            const editServer = action.server;
            const serversArray = state.serversArray;
            const servers = state.servers;
            // servers[editServer.id]
        }

    }
}

export default serversReducer
