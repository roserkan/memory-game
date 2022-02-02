import React, { useEffect, useState } from 'react'
import { Table, Modal, Input, Button, Form } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import { toastr } from "../../../utilities/toastr";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { add, remove, update, getAll, getById } from "../../../services/gameModService";

const { confirm } = Modal;

// TABLE 
const columns = [
    {
        title: 'Oyun Modu',
        dataIndex: 'gameMod',
        sorter: (a, b) => a.gameMod - b.gameMod,
    },
    {
        title: 'Aksiyon',
        dataIndex: 'action',
    }
];

export default function GameMod() {

    const [addForm] = Form.useForm()
    const [updateForm] = Form.useForm()

    // STATES
    const [tableData, setTableData] = useState([])
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [updateModalVisible, setUpdateModalVisible] = useState(false)
    const [initialValues, setInitialValues] = useState({})
    const [currentId, setCurrentId] = useState()

    // API
    const allData = () => {
        getAll()
            .then(res => {
                const data = []
                res.data.data.forEach((item, index) => {
                    const dataItem = {
                        key: index,
                        gameMod: item.gameMod,
                        action: <div className='table-action'>
                            <AiFillDelete className='table-icon table-item-delete' target={item._id} onClick={showDeleteConfirm} />
                            <GrUpdate className='table-item-update' target={item._id} onClick={showModal} />
                        </div>
                    }
                    data.push(dataItem);
                })
                setTableData(data)


            })
    }

    useEffect(() => {
        allData()

    }, [])

    useEffect(() => {
        updateForm.setFieldsValue(initialValues)
    }, [initialValues])


    // MODAL    
    const showModal = (e) => {
        if (e.target.tagName === 'svg') {
            setUpdateModalVisible(true)
            getById(e.target.getAttribute('target')).then(res => {
                
                setInitialValues({
                    gameMod: res.data.data.gameMod
                })
            })
            setCurrentId(e.target.getAttribute('target'))
        } else {
            setAddModalVisible(true)
        }
    }

    const closeModel = () => {
        setAddModalVisible(false)
        setUpdateModalVisible(false)
    }

    const footer = [<Button key="iptal" onClick={closeModel}>İptal</Button>]

    const showDeleteConfirm = (e) => {
        let target;
        if (e.target.tagName === 'path') {
            target = e.target.parentElement.getAttribute('target')
        } else {
            target = e.target.getAttribute('target')
        }

        confirm({
            title: 'Silmek istediğine emin misin?',
            icon: <ExclamationCircleOutlined />,
            content: 'Bu öge silinecek!',
            okText: 'Sil',
            okType: 'danger',
            cancelText: 'İptal',
            onOk() {
                deleting(target)
            },
        });
    }


    // CRUD
    const adding = values => {
        add(values)
            .then(res => {
                if (res.data.status === 200) {
                    toastr('success', 'Başarılı', 'Mod eklendi')
                    allData()
                    addForm.resetFields()
                } else if (res.data.message === 'UNIQUE ERROR') {
                    toastr('success', 'Hata', 'Bu mod zaten var!')
                } else {
                    toastr('success', 'Hata', 'Beklenmeyen hata!')
                }
            })
    };

    const updating = values => {
        update(currentId, values)
            .then(res => {
                if (res.data.status === 200) {
                    toastr('success', 'Başarılı', 'Mod güncellendi')
                    allData()
                } else if (res.data.message === 'UNIQUE ERROR') {
                    toastr('success', 'Hata', 'Bu mod zaten var!')
                } else {
                    toastr('success', 'Hata', 'Beklenmeyen hata!')
                }
            })
    };



    const deleting = (id) => {
        remove(id)
            .then(res => {
                if (res.data.status === 200) {
                    toastr('success', 'Başarılı', 'Mod silindi')
                    allData()
                } else {
                    toastr('success', 'Hata', 'Beklenmeyen hata!')
                }
            })
    };




    // FORM
    const gameModRules = [
        { required: true, message: 'Zorunlu alan' },
    ]








    return (
        <div>
            <Button onClick={showModal} style={{ marginBottom: '1rem' }}>Oyun Modu Ekle</Button>
            <Table columns={columns} dataSource={tableData} />

            <Modal title="Mod Ekle" visible={addModalVisible} onCancel={closeModel} footer={footer}>
                <Form form={addForm} onFinish={adding}>
                    <Form.Item name="gameMod" rules={gameModRules} >
                        <Input placeholder="Oyun Modu" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Ekle
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>


            <Modal title="Mod Düzenle" visible={updateModalVisible} onCancel={closeModel} footer={footer}>
                <Form form={updateForm} onFinish={updating}>
                    <Form.Item name="gameMod" rules={gameModRules} >
                        <Input placeholder="Oyun Modu" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Düzenle
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}













