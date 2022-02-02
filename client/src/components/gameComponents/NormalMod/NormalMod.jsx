import React, { useEffect, useState, createElement, useRef } from 'react'
import { Button } from "antd";
import { useSelector } from "react-redux";
import './NormalMod.css'
import { getAll as getBaseSteps } from "../../../services/baseStepService";
import { getByTypeId as getImagesByTypeId } from "../../../services/gameImageService";
import { updateScoreByUserId } from "../../../services/scoreService";
import { updateLevelByUserId } from "../../../services/levelService";
import { BsCircleFill } from 'react-icons/bs';

const audio = new Audio("sounds/sound3.wav");
const finishAudio = new Audio("sounds/sound1.wav");

export default function NormalMod() {

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }


    const url = 'http://localhost:5000/'

    const gameConfig = useSelector(state => state.gameConfigReducer)
    const auth = useSelector(state => state.authReducer)
    const [timeControl, setTimeControl] = useState(0)
    const [images, setImages] = useState([])
    const [draw, setDraw] = useState('')
    const [time, setTime] = useState(0)
    const [count, setCount] = useState(0)
    const [point, setPoint] = useState(0)

    const [gameAgain, setGameAgain] = useState('')

    useEffect(() => {
        getBaseSteps().then(res => {
            let currentStep = res.data.data[0].steps[gameConfig.level];
            getImagesByTypeId(gameConfig.typeId).then(res => {
                let paths = []
                res.data.data.forEach(img => {
                    const tempImage = img.imagePath;
                    const orjinalImagePath = tempImage.replaceAll('\\', '/').replace('uploads/', '');
                    let path = url + orjinalImagePath;
                    paths.push(path);
                });
                setImages(paths)
                let row = parseInt(currentStep.split('x')[1]);
                let col = parseInt(currentStep.split('x')[0]);
                const orders = shuffle(createRandomArray(row * col));
                const drawed = drawGame(shuffle(paths), row, col, orders)
                setDraw(drawed)
            })


        })
    }, [gameAgain])

    useInterval(() => {
        if (timeControl > 0)
            setTime(time + 1);
    }, 1000);






    const gameControl = e => {

        audio.play()
        audio.currentTime = 0

     

        if (timeControl === 0) {
            setTimeControl(1)
        }




        const doneCount = document.querySelectorAll('.flip-box').length - 2;
        const dones = document.querySelectorAll('.done').length;

        const target = e.target;
        const rotateds = document.querySelectorAll('.rotated');
        if (rotateds.length < 2) {
            target.children[0].classList.add('rotated')


        } else {

            const isTrue = rotateds[0].parentElement.getAttribute('order') === rotateds[1].parentElement.getAttribute('order');
            if (isTrue) {
               
                rotateds.forEach(item => item.classList.remove('rotated'))
                rotateds.forEach(item => item.classList.add('done'))
                target.children[0].classList.add('rotated')
                
            } else {
                rotateds.forEach(item => item.classList.remove('rotated'))
                target.children[0].classList.add('rotated')
            }

        }

        if (dones === doneCount) {
            const clickValue = document.querySelector('.clickValue').innerText;
            const timeValue = document.querySelector('.timeValue').innerText;
            finish(clickValue, timeValue)
        }

    }

    const drawGame = (paths, row, col, orders) => {
        const colArr = []
        let rowLen = row
        let colLen = col;

        for (let i = 0; i < colLen; i++) { colArr.push(i + 1) }
        let result = []
        let orderIndex = 0;
        for (let i = 0; i < rowLen; i++) {
            let items = [];
            const baseItem = createElement('div', { className: 'row', key: i, },
                colArr.forEach((e, index) => {
                    const item = createElement('div', { className: 'flip-box', key: index, order: orders[orderIndex], onClick: gameControl },
                        createElement('div', { className: 'flip-box-inner' },
                            createElement('div', { className: 'flip-box-front' },
                                createElement('div', { className: 'circle-shape' }, <BsCircleFill />)
                            ),
                            createElement('div', { className: 'flip-box-back' }, <img src={paths[orders[orderIndex]]} />),

                        )
                    )
                    orderIndex++
                    items.push(item)
                }),

                items
            )

            result.push(baseItem)
        }

        return result

    }

    function createRandomArray(value) {
        let arr = [];
        for (let i = 1; i <= value / 2; i++) {
            arr.push(i);
            arr.push(i);
        }

        return arr;
    }

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }


    const counter = e => {
        if (e.target.tagName === 'SPAN' || e.target.tagName === 'BUTTON') {
            setCount(0)
        } else {
            setCount(count + 1)

        }
    }

    function finish(timeValue, clickValue) {
        const boxCount = document.querySelectorAll('.flip-box').length
        const pointVal = (boxCount * 10) - parseInt(timeValue) - parseInt(clickValue);
        document.querySelector('.point').innerText = `${pointVal} PUAN`;
        document.querySelector('.finish').classList.add('opened-finish')
        setTimeControl(0)
        setTime(0)
        setPoint(pointVal)
    }

    const again = e => {
        setGameAgain('again');
        document.querySelector('.finish').classList.remove('opened-finish')
        const dones = document.querySelectorAll('.done')
        const rotateds = document.querySelectorAll('.rotated')
        dones.forEach(item => item.classList.remove('done'))
        rotateds.forEach(item => item.classList.remove('rotated'))
        setImages(shuffle(images))
    }

    const nextLevel = e => {
        const mod = gameConfig.gameMod;
        const level = 'level' + gameConfig.level;
        const object = {};
        object.mod = mod;
        object.level = level;
        object.point = point
        updateScoreByUserId(auth.currentUser.id, object)

        const levelObject = {};
        levelObject.mod = mod;
        if (gameConfig.level < 12) {
            levelObject.level = gameConfig.level + 1;
        }

        updateLevelByUserId(auth.currentUser.id, levelObject)
        window.location = 'http://localhost:3000/'
    }



    return (
        <div className='game' onClick={counter}>
            <div className='time'>Süre: <span className="timeValue">{time}</span></div>
            <div className='clickCount' >Tıklama Sayısı: <span className="clickValue">{count}</span></div>
            {draw}
            <div className='finish'>
                <div className='point'></div>
                <div className="actions">
                    <Button type="primary" onClick={again}>Tekrar oyna</Button>
                    <Button type="danger" onClick={nextLevel}>Sonraki level</Button>
                </div>
            </div>
        </div>
    )
}
