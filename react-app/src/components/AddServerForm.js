import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { createServer } from '../store/servers';
import { getServers } from '../store/servers';
import { useEffect } from 'react';
import "./ServerForms.css"


const AddServerForm = ({ modalSetter }) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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
            description,
            ownerId,
            image
        }
        if (newServer) {
            await dispatch(createServer(newServer));
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
            <h2 className='modal-label'>New Server</h2>
            <form className='add-server-form' onSubmit={onSubmit}>
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


                <button className='newserver-submit-button' type='submit'>Create Server</button>
            </form>
        </>
    );
};

export default AddServerForm;
