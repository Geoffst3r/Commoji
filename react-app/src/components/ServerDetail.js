import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteServer, getServers } from "../store/servers";
import EditServerModal from "./EditServerModal";
import './serverDetails.css'

const ServerDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { serverId } = useParams()
    const id = parseInt(serverId)

    const user = useSelector(state => state.session.user);
    const serversContainer = useSelector(state => state.servers);
    const servers = serversContainer.servers;
    const server = servers?.[id];

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to remove this server?')
        if (confirmed) {
            await dispatch(deleteServer(server))
            await dispatch(getServers());
            history.push(`/channels/`);
        }
    };

    useEffect(() => {
        dispatch(getServers())
    }, [dispatch])

    const ownerLinks = (
        <div className="server-detail">
            <EditServerModal />
            <button className="DeleteServerButton" onClick={handleDelete}>Delete</button>
        </div>
    );

    const owner = () => {
        if (server && user) {
            return user.id === server.ownerId
        }
        return false
    };

    return (
        <div className="server-detail-container">
            {owner() ? ownerLinks : null}
        </div>
    )
}

export default ServerDetail
