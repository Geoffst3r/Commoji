import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import "./Landing.css"

const Landing = () => {
    return (
        <div className='splash-container'>
            <div className='splash-description'>
                <h1 className='splash_text'>This can be anything...</h1>
                <p className='splash_text'>Create a world and community for you and your friends.</p>
            </div>
        </div>
    )
}

export default Landing
