import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { compose } from "redux";
import { deleteServer, getServers } from "../store/servers";

const ServerDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {serverId} = useParams()
    const id = parseInt(serverId)


    const serversContainer = useSelector(state => state.servers)

    const servers = serversContainer.servers



    useEffect(() => {

    },[dispatch])

    const handleDelete = async () => {
        await dispatch(deleteServer(servers[id]))
        dispatch(getServers())
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
