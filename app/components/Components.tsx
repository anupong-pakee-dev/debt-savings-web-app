import React from 'react'

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button {...props} className={`rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 ${className}`}>{children}</button>
  )
}

export const Input = props => {
  return (
    <input className='w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-slate-400 focus:outline-none' />
  )
}