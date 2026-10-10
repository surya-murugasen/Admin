import { NextResponse } from 'next/server'
import { processManager } from '@/lib/process-manager'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const result = processManager.stopProject(params.id)
  
  if (result.success) {
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }
}
