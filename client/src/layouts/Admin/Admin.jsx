import React, { useState, useEffect } from 'react'
import { Menu, Button } from 'antd';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { SiAirtable } from 'react-icons/si';
import { BiCategory } from 'react-icons/bi';
import { getAll } from "../../services/gameTypeService";

import './Admin.css'


const { SubMenu } = Menu;

export default function Admin(props) {

    let navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false)
    const [current, setCurrent] = useState('mail')
    const [gameTypes, setGameTypes] = useState([])

    useEffect(() => {
        if (!props.isAuthenticated || props.claim != 'admin') {
            navigate('/login')
        }
        getAll().then(res => setGameTypes(res.data.data))
    }, [])

    useEffect(() => {
        const container = document.querySelector('.wrapper .container');
        const brandSpan = document.querySelector('.wrapper .container #brand span');
        const outlet = document.querySelector('.outlet-admin');

        if (collapsed) {
            container.classList.add('container-sm')
            brandSpan.classList.add('rm-text')
            outlet.classList.add('outlet-sm')
        } else {
            container.classList.remove('container-sm')
            brandSpan.classList.remove('rm-text')
            outlet.classList.remove('outlet-sm')
        }

    }, [collapsed])

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    };

    const handleClick = e => {
        setCurrent(e.key)
    };



    return (
        <div className='wrapper'>
            <Menu className='navbar' onClick={handleClick} mode="horizontal">

                <SubMenu key="SubMenu" icon={<UserOutlined />} title="Admin">
                    <Menu.ItemGroup title="Yönetici İşlemleri">
                        <Menu.Item key="setting:1">Yeni Yönetici Ekle</Menu.Item>
                        <Menu.Item key="setting:2">Yönetici Düzenle</Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="Oturum">
                        <Menu.Item key="setting:3">Güvenli Çıkış</Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
            </Menu>
            <div className='container'>
                <div id='brand'>
                    <Link to="/admin">
                        <img src='http://localhost:3000/images/logo.png' className='brand-image' />
                        <span style={{ color: '#ddd' }}>MERT</span>
                    </Link>
                </div>
                <Menu mode="inline" theme="dark" inlineCollapsed={collapsed} >
                    <Menu.Item key="1" icon={<SiAirtable />}>
                        <Link to="oyuntipi">Oyun Tipi</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<BiCategory />}>
                        <Link to="oyunmodu">Oyun Modu</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="Oyun Resimleri">
                        {
                            gameTypes.map((item, index) => (
                                <Menu.Item key={101 + index}>
                                    <Link to={'oyunresimleri/' + item._id}>{item.gameType} Resimleri</Link>
                                </Menu.Item>
                            ))
                        }
                    </SubMenu>
                </Menu>
                <Button id='collapsed-btn' type="primary" onClick={toggleCollapsed}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
            </div>
            <div className='outlet-admin'>
                <Outlet />
            </div>
        </div>
    )
}






