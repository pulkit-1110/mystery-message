import { NextRequest, NextResponse } from 'next/server'
import UserModel from '@/model/User'
import { getServerSession } from 'next-auth/next'
import dbConnect from '@/lib/dbConnect'
import { authOptions } from '../../auth/[...nextauth]/options'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ messageid: string }> }
): Promise<NextResponse> {
  const { messageid } = await params

  if (!messageid) {
    return NextResponse.json(
      { success: false, message: 'Message ID is required' },
      { status: 400 }
    )
  }

  await dbConnect()
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    )
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: session.user._id },
      { $pull: { messages: { _id: messageid } } }
    )

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Message not found or already deleted' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Message deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting message:', error)
    return NextResponse.json(
      { success: false, message: 'Error deleting message' },
      { status: 500 }
    )
  }
}
