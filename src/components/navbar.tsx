import React from 'react'
import Link from "next/link"
import LogoutForm from './logoutForm'
import { getSession } from '@/action'

const navbar = async () => {
    const session = await getSession()

    return (
        <nav>
            <Link href="/">Homepage</Link>
            <Link href="/premium">Premium</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/login">Login</Link>
            {session.isLoggedIn && <LogoutForm/>}
        </nav>
    )
}

export default navbar