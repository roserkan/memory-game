import React from 'react'
import Auth from '../../components/gameComponents/Auth/Auth'
import Main from '../../components/gameComponents/Main/Main'
import './Dashboard.css'

export default function Dashboard(props) {

    if(!props.isAuthenticated) return <Auth />

    

    return (
        <div className='dashboard'>
            <Main />
        </div>
    )
}
