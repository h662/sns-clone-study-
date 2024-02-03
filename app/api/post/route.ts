import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    if (!page || isNaN(+page)) {
      return NextResponse.json(
        {
          message: "Not exist page.",
        },
        {
          status: 400,
        }
      );
    }

    const posts = await prismaClient.post.findMany({
      skip: (+page - 1) * 3,
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { content } = await request.json();
    const session = await getServerSession(authOptions);

    if (!content) {
      return NextResponse.json(
        {
          message: "Not exist content.",
        },
        {
          status: 400,
        }
      );
    }

    if (!session) {
      return NextResponse.json(
        {
          message: "Not exist session.",
        },
        {
          status: 400,
        }
      );
    }

    const post = await prismaClient.post.create({
      data: {
        content,
        userId: session.user.id,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
};
