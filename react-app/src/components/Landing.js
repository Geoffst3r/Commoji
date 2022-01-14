import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../store/session';
import "./Landing.css"

const Landing = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory()
    if (user) {
        return <Redirect to='/channels' />;
    }
    const onClick = () => {
        dispatch(login('demo@aa.io', 'password'));
        return history.push(`/channels`);
    };
    return (
        <div className='splash-container'>
            <div className='splash-description'>
                <h1 className='splash_text'>Welcome to Commoji 👁‍🗨</h1>
                <div className='description-text'>
                    <h2 className='splash_text'>Commoji can be anything...</h2>
                    <p className='splash_text'>Create a world and community for you and your friends...</p>
                    <p>to chat whenever and wherever you are.</p>
                </div>
                <button className='DemoButton' onClick={() => onClick()}>Demo Now</button>
                <div className='about-container'>
                    <div className='built'>Built By:</div>
                    <div className='about-links'>
                        <a target='_blank' rel='noreferrer' href='https://github.com/Geoffst3r'>Geoffrey Cox</a>
                        <a target='_blank' rel='noreferrer' href='https://github.com/mothwork'>Brett Hageft</a>
                        <a target='_blank' rel='noreferrer' href='https://github.com/depash'>Depash Nepal</a>
                        <a target='_blank' rel='noreferrer' href='https://github.com/JacobNicotra'>Jacob Nicotra</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Landing
