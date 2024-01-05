import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd';
export default function ModalTrailer() {
    let { Component, openModal, data } = useSelector(state => state.modalReducer)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true);
    useEffect(() => {
        setOpen(true)
    }, [openModal])
    return (
       
        <Modal
            destroyOnClose
            open={open && openModal}
            footer=''
            onCancel={() => {
                setOpen(false);
                dispatch({
                    type: 'CLOSE_FORM',

                })
            }}
            width={690}
            height={500}
        >
            {Component}
        </Modal>
    )
}
