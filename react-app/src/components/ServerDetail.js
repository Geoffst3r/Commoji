import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteServer } from "../store/servers";

const ServerDetail = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {serverId} = useParams()

    const servers = useSelector(state => state.servers.servers)

    useEffect(() => {
        console.log('something')
    },[dispatch])

    const handleDelete = () => {
        dispatch(deleteServer())
    }

    return (
        <div className="server-detail-container">
            <div className="server-detail">
                <button onClick={handleDelete}>Delete?</button>
            </div>
        </div>
    )
}
