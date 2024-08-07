'use server'

import { NextResponse } from "next/server"

const authenticate = (email: string, password: string) => {
  NextResponse.json({message: "this is a server side action"});
}


export default authenticate;