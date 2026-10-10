import { prisma } from './db'

export async function logAudit(
  action: string,
  entityType: string,
  entityId: string,
  opts?: {
    userId?: string
    oldValues?: any
    newValues?: any
    ipAddress?: string
  }
) {
  try {
    await prisma.auditLog.create({
      data: {
        action,
        entityType,
        entityId,
        userId: opts?.userId,
        oldValues: opts?.oldValues || null,
        newValues: opts?.newValues || null,
        ipAddress: opts?.ipAddress,
      },
    })
  } catch (error) {
    console.error('Failed to log audit:', error)
    // We typically don't want audit logging failures to break the main transaction,
    // but in some highly secure systems, you might want to throw here.
  }
}
