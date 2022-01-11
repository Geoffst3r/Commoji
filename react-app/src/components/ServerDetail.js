import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { compose } from "redux";
import { deleteServer } from "../store/servers";

const ServerDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {serverId} = useParams()
    const id = parseInt(serverId)

    console.log(id)
    const serversContainer = useSelector(state => state.servers)
    console.log('STATE CONTAINTER', serversContainer)
    const servers = serversContainer.servers
    console.log('SERVERS',servers)
    console.log(servers[id])

    useEffect(() => {
        console.log('something')
    },[dispatch])

    const handleDelete = () => {
        dispatch(deleteServer(servers[id]))
    }

    return (
        <div className="server-detail-container">
            <div className="server-detail">
                <button onClick={handleDelete}>Delete?</button>
            </div>
        </div>
    )
}

export default ServerDetail
