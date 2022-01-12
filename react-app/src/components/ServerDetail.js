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
    useEffect(() => {
        dispatch(getServers())
    }, [dispatch])

    const handleDelete = async () => {
        await dispatch(deleteServer(server))
        await dispatch(getServers());
        history.push(`/channels/`);
    }


    const servers = serversContainer.servers
    const server = servers?.[id]
    const user = useSelector(state => state.session.user);
    console.log('SERVER', server)
    console.log('USER', user)

    const ownerLinks = (
        <div className="server-detail">
            <button className="DeleteServerButton" onClick={handleDelete}>Delete</button>
            <EditServerModal />
        </div>
    )
    const owner = () => {
        if (server) {
            return user.id === server.ownerId
        }
        return false
    }



    return (
        <div className="server-detail-container">
            {owner() ? ownerLinks : null}
        </div>
    )
}

export default ServerDetail
