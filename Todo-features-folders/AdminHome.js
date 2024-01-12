import React from 'react'
import NavBar from '../features/navbar/NavBar'
import AdminProductList from '../features/admin/components/AdminProductList'

export default function AdminHome() {
  return (
    <div>
        <NavBar>
            <AdminProductList />
        </NavBar>
    </div>
  )
}