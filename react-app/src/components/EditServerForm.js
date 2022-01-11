import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { editServer } from '../store/servers';
import { getServers } from '../store/servers';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';



const EditServerForm = ({ modalSetter }) => {
    const { serverId } = useParams()
    const id = parseInt(serverId)
    const serversContainer = useSelector(state => state.servers)
    const servers = serversContainer.servers
    const server = servers[id]

    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(server.title);
    const [description, setDescription] = useState(server.description);
    const [image, setImage] = useState(server.image);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServers())
    }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault();
        const ownerId = user.id
        const newServer = {
            id,
            title,
            description,
            ownerId
        }
        if (newServer) {
            await dispatch(editServer(newServer));
            dispatch(getServers())
        }
        modalSetter();

    };

    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    const updateDescription = (e) => {
        setDescription(e.target.value);
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
                    <label>Server Description</label>
                    <input
                        type='text'
                        name='email'
                        onChange={updateDescription}
                        value={description}
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


                <button className='editserver-submit-button' type='submit'>Create Server</button>
            </form>
        </>
    );
};

export default EditServerForm;
