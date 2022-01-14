import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createServer } from '../store/servers';
import { getServers } from '../store/servers';
import { useEffect } from 'react';
import "./ServerForms.css"

const AddServerForm = ({ modalSetter }) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
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
            title,
            ownerId,
            image
        }
        let newServerDb = null
        if (newServer) {
            newServerDb = await dispatch(createServer(newServer));
            dispatch(getServers())
        }
        modalSetter(newServerDb['id']);

        return history.push(`/channels/${newServerDb['id']}/${newServerDb['generalId']}`)
    };

    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    const updateImage = (e) => {
        setImage(e.target.value);
    };

    return (
        <>
            <h2 className='modal-label'>New Server</h2>
            <form autoComplete="off" className='add-server-form' onSubmit={onSubmit}>
                <div>
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
                        required
                        autoComplete="off"
                    ></input>
                </div>
                <div className='LabelAndInputContainer'>
                    <label>Image Url</label>
                    <input
                        type='text'
                        name='image'
                        onChange={updateImage}
                        value={image}
                        autoComplete="off"
                    ></input>
                </div>
                <button className='newserver-submit-button' type='submit'>Create Server</button>
            </form>
        </>
    );
};

export default AddServerForm;
