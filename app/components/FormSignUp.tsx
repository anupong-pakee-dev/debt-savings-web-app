'use client'

import React from 'react'

function FormSignUp() {
  return (
    <form>
        <div>
            <label>อีเมล์:</label>
            <input type="email" name="" id="" />
        </div>
        <div>
            <label>รหัสผ่าน:</label>
            <input type="password" name="" id="" />
        </div>
        <div>
            <label>ยืนยันรหัสผ่านอีกครั้ง:</label>
            <input type="password" name="" id="" />
        </div>
        <button type="submit">เริ่มต้นใช้งาน</button>
    </form>
  )
}

export default FormSignUp