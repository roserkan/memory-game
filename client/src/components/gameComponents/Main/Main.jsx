import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Select } from "antd";
import "./Main.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { getAll as getGameTypes } from "../../../services/gameTypeService";
import { getAll as getGameModes } from "../../../services/gameModService";
import { getByUserId as getLevelByUserId } from "../../../services/levelService";
import { setGameConfig } from "../../../store/actions/gameConfigAction";

const { Option } = Select;

export default function Main() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const currentUser = useSelector((state) => state.authReducer.currentUser);

  const baseUrl = "http://localhost:5000/";
  const [gameTypes, setGameTypes] = useState([]);
  const [gameModes, setGameModes] = useState([]);
  const [levels, setLevels] = useState({});
  const [slideIndex, setSlideIndex] = useState(1);
  const [currentType, setCurrentType] = useState("");
  const [currentMod, setCurrentMod] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [currentTypeId, setCurrentTypeId] = useState("");
  const [maxLevel, setMaxLevel] = useState(1);

  useEffect(() => {
    getGameTypes().then((res) => {
      setGameTypes(res.data.data);
      setCurrentTypeId(res.data.data[0]._id);
      showSlide(slideIndex);
    });

    getGameModes().then((res) => {
      setGameModes(res.data.data);
      setCurrentMod(res.data.data[0].gameMod);
    });

    getLevelByUserId(currentUser.id).then((res) =>
      setLevels(res.data.data.level)
    );
  }, []);

  useEffect(() => {
    showSlide(slideIndex);
  }, [slideIndex]);

  const showSlide = (n) => {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((item) => item.classList.remove("visible"));
    slides.forEach((item, index) => {
      if (index + 1 === n) {
        item.classList.add("visible");
        setCurrentType(item.children[1].innerText);
        let type = gameTypes.filter(
          (type) => type.gameType === item.children[1].innerText
        )[0];
        if (type) setCurrentTypeId(type._id);
      }
    });
  };

  const moveSlide = (n) => {
    if (slideIndex + n > gameTypes.length) {
      setSlideIndex(1);
    } else if (slideIndex + n < 1) {
      setSlideIndex(gameTypes.length);
    } else {
      setSlideIndex(slideIndex + n);
    }
  };

  const selectedLevel = (e) => {
    document.querySelector(".play").classList.add("show-play");
    document
      .querySelectorAll(".level")
      .forEach((item) => item.classList.remove("selected-level"));
    e.target.classList.add("selected-level");
    setCurrentLevel(parseInt(e.target.getAttribute("level")));
  };

  function handleChange(value) {
    setCurrentMod(value);
    let max = levels[value];
    document.querySelector(".levels").classList.add("show-levels");

    const levelItems = document.querySelectorAll(".level");
    levelItems.forEach((item) => {
      if (parseInt(item.getAttribute("level")) > max) {
        item.classList.add("disabled-level");
      }
    });
  }

  const play = (e) => {
    const config = {
      gameMod: currentMod,
      gameType: currentType,
      level: currentLevel,
      typeId: currentTypeId,
    };
    dispatch(setGameConfig(config));
    navigate("game");
  };

  return (
    <div className="main">
      <div className="best-players">
        <Link to="en-iyi-oyuncular">En iyi oyuncular</Link>
      </div>

      <div className="carousel">
        <IoIosArrowBack
          className="previous arrow"
          onClick={() => moveSlide(-1)}
        />

        {gameTypes.map((item, index) => (
          <div className="slide" key={index}>
            {
              <img
                src={baseUrl + item.imagePath}
                style={{ width: "120px" }}
                alt="image"
              />
            }
            <div className="gameType" val="gameType">
              {item.gameType}
            </div>
          </div>
        ))}
        <IoIosArrowForward
          className="next arrow"
          onClick={() => moveSlide(1)}
        />
      </div>

      <div className="gameMod">
        <Select
          placeholder="Oyun modu"
          style={{ width: 350 }}
          onChange={handleChange}
        >
          {gameModes.map((item, index) => (
            <Option value={item.gameMod} key={index}>
              {item.gameMod}
            </Option>
          ))}
        </Select>
      </div>
      <div className="levels">
        <div className="level" level="1" onClick={selectedLevel}>
          3x2
        </div>
        <div className="level" level="2" onClick={selectedLevel}>
          4x3
        </div>
        <div className="level" level="3" onClick={selectedLevel}>
          4x4
        </div>
        <div className="level" level="4" onClick={selectedLevel}>
          5x4
        </div>
        <div className="level" level="5" onClick={selectedLevel}>
          6x5
        </div>
        <div className="level" level="6" onClick={selectedLevel}>
          8x5
        </div>
        <div className="level" level="7" onClick={selectedLevel}>
          8x6
        </div>
        <div className="level" level="8" onClick={selectedLevel}>
          9x6
        </div>
        <div className="level" level="9" onClick={selectedLevel}>
          10x7
        </div>
        <div className="level" level="10" onClick={selectedLevel}>
          10x8
        </div>
        <div className="level" level="11" onClick={selectedLevel}>
          11x8
        </div>
        <div className="level" level="12" onClick={selectedLevel}>
          12x8
        </div>
      </div>

      <div className="play">
        <Button onClick={play} type="danger" style={{ width: "120px" }}>
          Oyna
        </Button>
      </div>
    </div>
  );
}
