import React from "react"
const modalState = {
    Component: '',
    pause: true,
    openModal: false,
    data:null,
}

const modalReducer = (state = modalState, action) => {
    switch (action.type) {
        case 'OPEN_FORM':
            state.Component = action.data
            state.pause = true
            state.openModal = action.open
            return { ...state }
        case 'CLOSE_FORM':
            state.Component = null
            state.pause = false
            state.openModal = false
            state.data = null
            return { ...state }
        case 'PAUSE_VIDEO':
            state.data = action.data
            return { ...state }
        default:
            return { ...state }
    }
}

export default modalReducer;