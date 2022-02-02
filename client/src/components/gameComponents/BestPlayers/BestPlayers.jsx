import React, { useEffect } from "react";
import { Table } from "antd";
import './BestPlayers.css';
import { getAll } from "../../../services/bestPlayers";
import { useState } from "react";

const columns = [
  {
    title: "Oyuncu Adı",
    dataIndex: "username",
  },
  {
    title: "Puan",
    dataIndex: "point",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.point - b.point,
  },
];

const data = [
  {
    key: "1",
    username: "John Brown",
    point: 32,
  },
  {
    key: "2",
    username: "Jim Green",
    point: 42,
  },
];




export default function BestPlayers() {

  const [bestPlayers, setBestPlayers] = useState([]);

  useEffect(() => {
    getAll().then(res => {
      let tableData = [];
      res.data.forEach((d, index) => {
        let item = {
          key: index + 1,
          username: d.username,
          point: d.point
        }
        tableData.push(item);
      })
      console.log(tableData);
      setBestPlayers(tableData);
    })
  }, []);

  


  return (
    <div className="best-player-container">
      <Table columns={columns} dataSource={bestPlayers} />
    </div>
  );
}
