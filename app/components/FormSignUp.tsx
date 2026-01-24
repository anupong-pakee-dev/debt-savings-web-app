"use client"

import React from 'react';
import axios from 'axios';
import { z } from 'zod';
import { Button, Input } from './Components';

export default function FormSignUp() {
  const [data, setData] = React.useState({
    email: z.email(),
  })
  const [language, setLanguage] = React.useState<string | null>("");

  React.useEffect(() => {
    const lang = localStorage.getItem("language");
    setLanguage(lang == null ? "th" : lang);
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await axios.post(process.env.NEXT_PUBLIC_DOMAIN_URL + "/api/signup/" + language, data)
      .then((res) => console.log(res.data))
      .catch((res) => console.error(res))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center p-2 mb-4 border-2 rounded-2xl">
        <label className='text-sm w-18 md:w-16'>อีเมล์: </label>
        <Input type="email" name="email" className="pl-2" placeholder="example@example.com" onChange={handleChange} />
      </div>
      <Button type="submit" className='cursor-pointer text-black'>สมัครใช้งาน</Button>
    </form>
  )
}
