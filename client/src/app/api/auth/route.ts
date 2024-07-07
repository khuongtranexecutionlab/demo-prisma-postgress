import { auth } from '@/utils/auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export default async function handler() {
  const session = await auth()
  if (session) return NextResponse.json(session)
  return NextResponse.json('You must be logged in.')
}
