const isString = (v: unknown): v is string => typeof v === 'string'

export const isStringOrNumber = (v: unknown): v is string | number =>
  typeof v === 'string' || typeof v === 'number'

export const hasProp = <K extends string>(o: unknown, k: K): o is Record<K, unknown> =>
  typeof o === 'object' && o !== null && k in o

/**
 * Достаём id пользователя из ответа me:
 * поддерживаем и me.userId, и me.id. Возвращаем строку или null.
 */
export const extractUserId = (me: unknown): string | null => {
  if (hasProp(me, 'userId') && isStringOrNumber(me.userId)) return String(me.userId)
  if (hasProp(me, 'id') && isStringOrNumber(me.id)) return String(me.id)
  return null
}

export const extractUserName = (me: unknown): string | null => {
  if (hasProp(me, 'username') && isString(me.username)) return me.username
  if (hasProp(me, 'login') && isString(me.login)) return me.login
  if (hasProp(me, 'name') && isString(me.name)) return me.name
  return null
}
