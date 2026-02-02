"use client"

export default function Loading({ isActive }: { isActive: boolean }) {
    return (
        <div className={`${isActive ? 'flex' : 'hidden'} min-h-screen justify-center items-center`}>
            <h1 className="text-2xl animate-pulse">Loading...</h1>
        </div>
    )
}