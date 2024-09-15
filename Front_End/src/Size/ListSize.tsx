import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL, LOCALHOST, MAPPING_URL } from '../APIs/API'
import Table, { ColumnsType } from 'antd/es/table'
import { SizeResponse } from '../Interface/interface'
import moment from 'moment'
import { Button, Modal } from 'antd'
import SizeForm from './SizeForm'
import { EditOutlined } from '@ant-design/icons'

const ListSize: React.FC = () => {

    const [sizes, setSizes] = useState<SizeResponse[]>([])

    const [isModalOpenSize, setIsModalSize] = useState(false);
    const [selectedSize, setSelectedSize] = useState<number | null>(null);

    const findAllSize = async () => {
        const res = await axios.get(LOCALHOST + MAPPING_URL.SIZE + API_URL.SIZE.FIND_ALL_SIZE)
        setSizes(res.data)
    }

    const showModalSize = () => {
        setSelectedSize(null);
        setIsModalSize(true);
    }

    const showModalSizeById = (record: SizeResponse) => {
        setSelectedSize(record.id);
        setIsModalSize(true);
    }

    const handleCancelSize = () => {
        setIsModalSize(false);
        setSelectedSize(null);
        findAllSize();
    }

    const columns: ColumnsType<SizeResponse> = [
        {
            title: 'Size name',
            dataIndex: 'sizeName',
            key: 'sizeName',
        },
        {
            title: 'Create date',
            dataIndex: 'createDate',
            key: 'createDate',
            render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Update date',
            dataIndex: 'updateDate',
            key: 'updateDate',
            render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <span>
                    <EditOutlined
                        style={{ cursor: 'pointer', float: 'left' }}
                        onClick={() => showModalSizeById(record)}
                    />
                </span>
            ),
        },
    ]

    useEffect(() => {
        findAllSize()
    }, [])

    return (
        <>
            <Button style={{ float: 'right', marginBottom: 10 }} onClick={showModalSize}>
                New size +
            </Button>
            <Modal
                open={isModalOpenSize}
                onCancel={handleCancelSize}
                footer={null}
            >
                <SizeForm
                    handleCancelSizeModal={handleCancelSize}
                    selectedSize={selectedSize}
                />
            </Modal>
            <Table<SizeResponse>
                dataSource={sizes}
                columns={columns}
                pagination={false}
                rowKey="id"
            />
        </>
    )
}

export default ListSize