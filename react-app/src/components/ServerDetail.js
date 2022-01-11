import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { compose } from "redux";
import './serverDetails.css'
import { deleteServer, getServers } from "../store/servers";
import EditServerModal from "./EditServerModal";


const ServerDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { serverId } = useParams()
    const id = parseInt(serverId)


    const serversContainer = useSelector(state => state.servers)

    const servers = serversContainer.servers



    useEffect(() => {

    }, [dispatch])

    const handleDelete = async () => {
        await dispatch(deleteServer(servers[id]))
        await dispatch(getServers())
        history.push(`/channels`);

    }



    return (
        <div className="server-detail-container">
            <div className="server-detail">
                <button onClick={handleDelete}>Delete</button>
                <EditServerModal/>
            </div>

        </div>
    )
}

export default ServerDetail
