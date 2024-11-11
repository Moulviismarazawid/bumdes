import withAuth from '@/middlewares/withAuth'
import { NextResponse } from 'next/server'

export function mainMiddleWare(){
    const res = NextResponse.next()
    return res;
}

export default withAuth(mainMiddleWare,['admin','auth','member'])