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
                <h1 className='splash_text'>This can be anything...</h1>
                <p className='splash_text'>Create a world and community for you and your friends.</p>
                <button className='DemoButton' onClick={() => onClick()}>Demo Now</button>
            </div>
        </div>
    )
}

export default Landing
