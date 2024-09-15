import React, { useEffect, useState } from 'react'
import { ColorResponse } from '../Interface/interface'
import axios from 'axios'
import { API_URL, LOCALHOST, MAPPING_URL } from '../APIs/API'
import Table, { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import { EditOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import ColorForm from './ColorForm'

const ListColor: React.FC = () => {

    const [colors, setColors] = useState<ColorResponse[]>([])

    const [isModalOpenColor, setIsModalColor] = useState(false);
    const [selectedColor, setSelectedColor] = useState<number | null>(null);

    const findAllColor = async () => {
        const res = await axios.get(LOCALHOST + MAPPING_URL.COLOR + API_URL.COLOR.FIND_ALL_COLOR)
        setColors(res.data)
    }

    const showModalColor = () => {
        setSelectedColor(null);
        setIsModalColor(true);
    }

    const showModalColorById = (record: ColorResponse) => {
        setSelectedColor(record.id);
        setIsModalColor(true);
    }

    const handleCancelColor = () => {
        setIsModalColor(false);
        setSelectedColor(null);
        findAllColor();
    }

    const columns: ColumnsType<ColorResponse> = [
        {
            title: 'Color name',
            dataIndex: 'colorName',
            key: 'colorName',
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
                        onClick={() => showModalColorById(record)}
                    />
                </span>
            ),
        },
    ]

    useEffect(() => {
        findAllColor()
    }, [])

    return (
        <>
            <Button style={{ float: 'right', marginBottom: 10 }} onClick={showModalColor}>
                New color +
            </Button>
            <Modal
                open={isModalOpenColor}
                onCancel={handleCancelColor}
                footer={null}
            >
                <ColorForm
                    handleCancelColorModal={handleCancelColor}
                    selectedColor={selectedColor}
                />
            </Modal>
            <Table<ColorResponse>
                dataSource={colors}
                columns={columns}
                pagination={false}
                rowKey="id"
            />
        </>
    )
}

export default ListColor