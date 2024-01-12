import React from 'react'
import AdminProductDetail from '../features/admin/components/AdminProductDetails'
import NavBar from '../features/navbar/NavBar'

export default function AdminProductDetailPage() {
  return (
    <div>
        <NavBar>
          <AdminProductDetail />
        </NavBar>
    </div>
  )
}
