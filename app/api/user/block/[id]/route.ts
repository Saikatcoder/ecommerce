import mongoose from "mongoose";
const db = `${process.env.DB_URL}/${process.env.DB_NAME}`;

import IdInterface from "@/interface/id.interface";
import serverCatchError from "@/lib/server-catch-error";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse as res } from "next/server";
import UserModel from "@/models/user.model";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

mongoose.connect(db);
import dns from 'dns'
dns.setServers(['1.1.1.1','8.8.8.8'])

export const PUT = async (
  req: NextRequest,
  context: IdInterface
) => {
  try {
    const session =
      await getServerSession(authOptions);

    if (!session)
      return res.json(
        { message: "Unauthorized" },
        { status: 401 }
      );

    // ONLY SUPERADMIN
    if (
      session.user.role !== "superadmin"
    )
      return res.json(
        { message: "Unauthorized" },
        { status: 401 }
      );

    const { id } = await context.params;

    const body = await req.json();

    await UserModel.updateOne(
      { _id: id },
      {
        isBlocked: body.isBlocked
      }
    );

    return res.json({
      message:
        body.isBlocked
          ? "User blocked"
          : "User unblocked"
    });

  } catch (err) {
    return serverCatchError(err);
  }
};