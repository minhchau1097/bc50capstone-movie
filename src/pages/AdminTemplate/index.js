import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


export default function AdminTemplate() {
    if (!localStorage.getItem('UserAdmin')) {
        return <Navigate to={'/auth'} replace />
    }
    return (
        <div>
            <h3>AdminTemplate</h3>
            <Outlet />
        </div>
    )
}
