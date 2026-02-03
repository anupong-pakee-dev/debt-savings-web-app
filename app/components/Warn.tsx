'use client'

import React from 'react'
import { Button } from './Components'

export default function Warn() {
  const [active, setActive] = React.useState(true);
  return (
    <div className={`${active ? 'block' : 'hidden'} fixed top-0 left-0 w-full min-h-screen content-center justify-items-center backdrop-blur-xl cursor-pointer`}>
      <div className='w-[80%] p-6 border rounded-2xl'>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-semibold'>แจ้งเตือน</h1>
          <span>15-01-2569</span>
        </div>
        <div className='w-full h-0.5 bg-white mt-4 mb-4' />
        <div>
          <p>ขณะนี้เว็บไซต์เวอร์ชันนี้เป็น <strong>Preview Version</strong> เราเปิดให้ชมหน้าตาและประสบการณ์การใช้งานก่อน ระบบหลังบ้านและบางฟังก์ชันยังอยู่ระหว่างการพัฒนาจะแล้วเสร็จภายในเดือน <strong>กุมภาพันธ์ 2569</strong> ขอบคุณที่ช่วยทดลองใช้งาน</p>
        </div>
        <div className='text-end'>
          <Button className='mt-4 text-black cursor-pointer' onClick={() => setActive(!active)}>ปิด</Button>
        </div>
      </div>
    </div>
  )
}
