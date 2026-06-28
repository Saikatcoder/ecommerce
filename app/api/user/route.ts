const db = `${process.env.DB_URL}/${process.env.DB_NAME}`
import mongoose from 'mongoose'
mongoose.connect(db)

import ServerCatchError from '@/lib/server-catch-error'
import UserModel from '@/models/user.model'
import { getServerSession } from 'next-auth'

import {
  NextRequest,
  NextResponse as res
} from "next/server"

import { authOptions } from '../auth/[...nextauth]/route'

export const GET = async (
  req: NextRequest
) => {
  try {
    const session =
      await getServerSession(authOptions)

    if (!session)
      return res.json(
        { message: "Unauthorized" },
        { status: 401 }
      )

    // admin OR superadmin allowed
    if (
      session.user.role !== 'admin' &&
      session.user.role !== 'superadmin'
    ) {
      return res.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const id = session.user.id

    const users = await UserModel.find(
      { _id: { $ne: id } },
      { password: 0 }
    ).sort({ createdAt: -1 })

    return res.json(users)

  } catch (error) {
    return ServerCatchError(error)
  }
}