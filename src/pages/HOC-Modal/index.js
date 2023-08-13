import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Modal() {
    let component = useSelector(state => state.modalReducer.Component)
    
    const dispatch = useDispatch()
    return (
        <div>
            {/* Modal */}
            <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        {component}
                        <button  type="button" className="close btn-close-trailer" data-dismiss="modal" aria-label="Close" onClick={()=>{
                            dispatch({
                               type:'CLOSE_FORM',
                               data:''
                            })
                        }}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
