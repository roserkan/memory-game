import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

export default function Game() {

    let navigate = useNavigate();
    const gameConfig = useSelector(state => state.gameConfigReducer)

    if (gameConfig.gameType === '' || gameConfig.gameMod === '' || gameConfig.level === '') {
        window.location = 'http://localhost:3000/'
    }



    useEffect(() => {
        if (gameConfig.gameMod === 'Normal') {
            navigate('normal')
        }else if(gameConfig.gameMod === 'Zamana Karşı'){
            navigate('zamana-karsi')
        }else if(gameConfig.gameMod === 'Sınırlı Tıklama'){
            navigate('sinirli-tiklama')
        }

    }, [])






    return (
        <div><Outlet /></div>
    )
}
