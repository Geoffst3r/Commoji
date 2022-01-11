import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { createServer } from '../store/servers';



const AddServerForm = ({modalSetter}) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmit = async (e) => {
        e.preventDefault();
        const ownerId = user.id
        const newServer = {
            title,
            description,
            ownerId
        }
        if (newServer) {
            await dispatch(createServer(newServer));
        }
        modalSetter();
        <Redirect to='/channels/'/>
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
                <label>Server Title</label>
                <div>
                    <input
                        type='text'
                        name='title'
                        onChange={updateTitle}
                        value={title}
                    ></input>
                </div>
                <label>Server Description</label>
                <div>
                    <input
                        type='text'
                        name='email'
                        onChange={updateDescription}
                        value={description}
                    ></input>
                </div>
                <label>Image Url</label>
                <div>
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
