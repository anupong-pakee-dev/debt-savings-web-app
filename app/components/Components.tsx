import React from "react"

type CardProps = {
    children: React.ReactNode;
    className?: string;
}



export const Card = ({ children, className = "" }: CardProps) => {
    return (
        <div className={`rounded-2xl bg-white shadow-sm ${className}`}>
            {children}
        </div>
    )
}

export const CardContent = ({ children, className = ""}: CardProps) => {
    return (
        <div className={`p-6 ${className}`}>{children}</div>
    )
}

export const Button = ({ children, className = "", ...props}: React.ComponentProps<"button">) => {
    return (
        <button {...props} className={`px-4 py-2 rounded-xl font-semibold bg-white hover:bg-gray-100 shadow-lg ${className}`}>
            {children}
        </button>
    )
}

export const Input = ({className = "", ...props}) => {
    return (
        <input {...props} className={`w-full px-2 py-2 text-sm outline-none ${className}`} />
    )
}

export const Select = ({ children, ...props}: { children: React.ReactNode }) => {
    return (
        <select className="w-full rounded-xl border px-4 py-2 text-sm outline-none">{children}</select>
    )
}