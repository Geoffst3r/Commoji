import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { editServer } from '../store/servers';
import { getServers } from '../store/servers';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getChannels } from '../store/channel';

const EditServerForm = ({ modalSetter }) => {
    const { serverId } = useParams()
    const id = parseInt(serverId)
    const serversContainer = useSelector(state => state.servers)
    const servers = serversContainer.servers
    const server = servers[id]

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(server.title);
    const [image, setImage] = useState(server.image);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getServers())
    }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault();
        const ownerId = user.id
        const newServer = {
            id,
            title,
            ownerId,
            image
        }
        if (newServer) {
            await dispatch(editServer(newServer));
            await dispatch(getServers());


        }
        modalSetter();

    };

    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    const updateImage = (e) => {
        setImage(e.target.value);
    };

    return (
        <>
            <h2 className='modal-label'>Edit Server</h2>
            <form className='add-server-form' onSubmit={onSubmit}>
                <div className='LabelAndInputContainer'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='LabelAndInputContainer'>
                    <label>Server Title</label>
                    <input
                        type='text'
                        name='title'
                        onChange={updateTitle}
                        value={title}
                    ></input>
                </div>
                <div className='LabelAndInputContainer'>
                    <label>Image Url</label>
                    <input
                        type='text'
                        name='image'
                        onChange={updateImage}
                        value={image}
                    ></input>
                </div>
                <button className='newserver-submit-button' type='submit'>Edit Server</button>
            </form>
        </>
    );
};

export default EditServerForm;
