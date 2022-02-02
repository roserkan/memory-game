import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Table, Modal, Input, Button, Form, Upload, Image } from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import { toastr } from "../../../utilities/toastr";
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { getById } from "../../../services/gameTypeService";
import { getByTypeId, add, remove, update, getById as getImageById } from "../../../services/gameImageService";


const { confirm } = Modal;

// TABLE 
const columns = [
    {
        title: 'Resim',
        dataIndex: 'image',
    },
    {
        title: 'Aksiyon',
        dataIndex: 'action',
    }
];

export default function GameImage() {

    let id = useParams().id;
    const [addForm] = Form.useForm()
    const [updateForm] = Form.useForm()
    // STATES
    const [tableData, setTableData] = useState([])
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [updateModalVisible, setUpdateModalVisible] = useState(false)
    const [currentId, setCurrentId] = useState()
    const [gameType, setGameType] = useState('')

    // API
    const allData = () => {
        getByTypeId(id)
            .then(res => {
                const data = []
                res.data.data.forEach((item, index) => {
                    const orjImage = item.imagePath.replace('uploads', '')
                    const dataItem = {
                        key: index,
                        image: <Image width={64} src={'http://localhost:5000/' + orjImage} alt='resim' />,
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
        getById(id).then(res => setGameType(res.data.data))
        allData()
    }, [id])






    // MODAL    
    const showModal = (e) => {
        if (e.target.tagName === 'svg') {
            setUpdateModalVisible(true)
            getImageById(e.target.getAttribute('target')).then(res => {
                document.querySelector('.oldImage').src = 'http://localhost:5000/' + res.data.data.imagePath
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
        values.gameTypeId = id;
        add(values)
            .then(res => {
                if (res.data.status === 200) {
                    toastr('success', 'Başarılı', 'Resim eklendi')
                    allData()
                    addForm.resetFields()
                } else {
                    toastr('success', 'Hata', 'Beklenmeyen hata!')
                }
            })
    };

    const updating = values => {
        update(currentId, values)
            .then(res => {
                if (res.data.status === 200) {
                    toastr('success', 'Başarılı', 'Resim güncellendi')
                    allData()
                }else {
                    toastr('success', 'Hata', 'Beklenmeyen hata!')
                }
            })
    };

    const deleting = (id) => {
        remove(id)
            .then(res => {
                if (res.data.status === 200) {
                    toastr('success', 'Başarılı', 'Resim silindi')
                    allData()
                } else {
                    toastr('success', 'Hata', 'Beklenmeyen hata!')
                }
            })
    };




    // FORM
    const imageRules = [
        { required: true, message: 'Zorunlu alan' },
    ]
    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        return e && e.fileList;
    };








    return (
        <div>
            <h4 style={{ color: '#ddd', textAlign: 'center' }}>{gameType.gameType}</h4>
            <Button onClick={showModal} style={{ marginBottom: '1rem' }}>Resim Ekle</Button>
            <Table columns={columns} dataSource={tableData} />

            <Modal title="Resim Ekle" visible={addModalVisible} onCancel={closeModel} footer={footer}>
                <Form form={addForm} onFinish={adding}>
                    <Form.Item name="image" rules={imageRules} valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload>
                            <Button icon={<UploadOutlined />}>Resim seç</Button>
                        </Upload >
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Ekle
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>


            <Modal title="Resim Düzenle" visible={updateModalVisible} onCancel={closeModel} footer={footer}>
                <Form form={updateForm} onFinish={updating}>

                    <Image src='x' className='oldImage' style={{marginBottom: '1rem'}}/>

                    <Form.Item name="image" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload maxCount={1}>
                            <Button icon={<UploadOutlined />}>Resmi değiştir</Button>
                        </Upload >
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













