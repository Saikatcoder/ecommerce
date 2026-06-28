import mongoose from "mongoose";
const db = `${process.env.DB_URL}/${process.env.DB_NAME}`;

import IdInterface from "@/interface/id.interface";
import serverCatchError from "@/lib/server-catch-error";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse as res } from "next/server";
import UserModel from "@/models/user.model";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

mongoose.connect(db);

export const PUT = async (req: NextRequest,context: IdInterface) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return res.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ONLY SUPERADMIN
    if (session.user.role !== "superadmin") {
      return res.json(
        { message: "Only superadmin allowed" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const body = await req.json();

    const targetUser = await UserModel.findById(id);

    if (!targetUser) {
      return res.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // protect superadmin
    if (targetUser.role === "superadmin") {
      return res.json(
        { message: "Cannot modify superadmin" },
        { status: 403 }
      );
    }

    await UserModel.updateOne(
      { _id: id },
      { role: body.role }
    );

    return res.json({
      message: "Role changed successfully"
    });

  } catch (err) {
    return serverCatchError(err);
  }
};


export const DELETE = async (req: NextRequest,context: IdInterface) => {
  try {
    const session =
      await getServerSession(authOptions)

    if (!session)
      return res.json(
        { message: "Unauthorized" },
        { status: 401 }
      )

    if (
      session.user.role !== "superadmin"
    )
      return res.json(
        { message: "Unauthorized" },
        { status: 401 }
      )

    const { id } = await context.params

    const user =
      await UserModel.findByIdAndDelete(id)

    if (!user)
      return res.json(
        { message: "User not found" },
        { status: 404 }
      )

    return res.json({
      message:
        "User deleted permanently"
    })

  } catch (err) {
    return serverCatchError(err)
  }
}