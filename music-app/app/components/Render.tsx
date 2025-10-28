"use client" 

import { useSession } from "next-auth/react"
import Body from "./Body"
import Main from './Main'

export default function Render(){
    const session = useSession()
    return (
        <>
            {session.data?.user ? <Main/> : <Body/>}
        </>
    )
}