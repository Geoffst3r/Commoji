import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


const Landing = () => {
    return (
        <div className='splash-container'>
            <div className='splash-description'>
                <h1>This can be anything...</h1>
                <p>Create a world and community for you and your friends.</p>
            </div>
        </div>
    )
}

export default Landing
