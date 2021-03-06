import React, { useEffect, useState } from 'react'
import { Table, Modal, Input, Button, Form, Upload, Image } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import { toastr } from "../../../utilities/toastr";
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { add, remove, update, getAll, getById } from "../../../services/gameTypeService";

const { confirm } = Modal;

// TABLE 
const columns = [
    {
        title: 'Resim',
        dataIndex: 'image',
    },
    {
        title: 'Oyun Tipi',
        dataIndex: 'gameType',
    },
    {
        title: 'Aksiyon',
        dataIndex: 'action',
    }
];

export default function GameType() {

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
                        gameType: item.gameType,
                        image: <Image width={64} src={'http://localhost:5000/'+item.imagePath} alt='resim'/>,
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
                    gameType: res.data.data.gameType
                })
                document.querySelector('.oldImage').src = 'http://localhost:5000/'+res.data.data.imagePath
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

    const footer = [<Button key="iptal" onClick={closeModel}>??ptal</Button>]

    const showDeleteConfirm = (e) => {
        let target;
        if (e.target.tagName === 'path') {
            target = e.target.parentElement.getAttribute('target')
        } else {
            target = e.target.getAttribute('target')
        }

        confirm({
            title: 'Silmek istedi??ine emin misin?',
            icon: <ExclamationCircleOutlined />,
            content: 'Bu ??ge silinecek!',
            okText: 'Sil',
            okType: 'danger',
            cancelText: '??ptal',
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
                    toastr('success', 'Ba??ar??l??', 'Oyun Tipi eklendi')
                    allData()
                    addForm.resetFields()
                } else if (res.data.message === 'UNIQUE ERROR') {
                    toastr('success', 'Hata', 'Bu oyun tipi var!')
                } else {
                    toastr('success', 'Hata', 'Beklenmeyen hata!')
                }
            })
    };

    const updating = values => {
        update(currentId, values)
            .then(res => {
                if (res.data.status === 200) {
                    toastr('success', 'Ba??ar??l??', 'Oyun tipi g??ncellendi')
                    allData()
                } else if (res.data.message === 'UNIQUE ERROR') {
                    toastr('success', 'Hata', 'Bu oyun tipi zaten var!')
                } else {
                    toastr('success', 'Hata', 'Beklenmeyen hata!')
                }
            })
    };

    const deleting = (id) => {
        remove(id)
            .then(res => {
                if (res.data.status === 200) {
                    toastr('success', 'Ba??ar??l??', 'Oyun tipi silindi')
                    allData()
                } else {
                    toastr('success', 'Hata', 'Beklenmeyen hata!')
                }
            })
    };




    // FORM
    const gameTypeRules = [
        { required: true, message: 'Zorunlu alan' },
    ]

    const imageRules = [
        { required: true, message: 'Zorunlu alan' },
    ]
    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        return e && e.fileList;
    };








    return (
        <div>
            <Button onClick={showModal} style={{ marginBottom: '1rem' }}>Oyun Tipi Ekle</Button>
            <Table columns={columns} dataSource={tableData} />

            <Modal title="Oyun Tipi Ekle" visible={addModalVisible} onCancel={closeModel} footer={footer}>
                <Form form={addForm} onFinish={adding}>
                    <Form.Item name="gameType" rules={gameTypeRules} >
                        <Input placeholder="Oyun tipi" />
                    </Form.Item>
                    <Form.Item name="image" rules={imageRules} valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload maxCount={1}>
                            <Button icon={<UploadOutlined />}>Resim se??</Button>
                        </Upload >
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Ekle
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>


            <Modal title="Oyun Tipi D??zenle" visible={updateModalVisible} onCancel={closeModel} footer={footer}>
                <Form form={updateForm} onFinish={updating}>
                    <Form.Item name="gameType" rules={gameTypeRules} >
                        <Input placeholder="Oyun tipi" />
                    </Form.Item>
                    <Form.Item name="gameType" rules={gameTypeRules} >
                        <Image width={64} alt='resim' className='oldImage'/>
                    </Form.Item>
                    <Form.Item name="image" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload maxCount={1}>
                            <Button icon={<UploadOutlined />}>Resmi de??i??tir</Button>
                        </Upload >
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            D??zenle
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}













