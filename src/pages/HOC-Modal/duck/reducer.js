import React from "react"
const modalState = {
    Component: '',
    pause: true
}

const modalReducer = (state = modalState, action) => {
    switch (action.type) {
        case 'OPEN_FORM':
            state.Component = action.data
            state.pause = true
            return { ...state }
        case 'CLOSE_FORM':
            state.Component = action.data
            state.pause = false
            return { ...state }

        default:
            return { ...state }
    }
}

export default modalReducer;