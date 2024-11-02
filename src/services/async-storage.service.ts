export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

export interface EntityWithId {
  _id: string | number
}
function query<T>(entityType: string, delay = 500): Promise<T[]> {
  const storedData = localStorage.getItem(entityType)
  const entities: T[] = storedData ? JSON.parse(storedData) : []
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay))
}

async function get<Type extends EntityWithId>(
  entityType: string,
  entityId: string | number
): Promise<Type> {
  try {
    const entities: Type[] = await query<Type>(entityType)

    const foundEntity = entities.find((e: Type) => e._id === entityId)

    if (!foundEntity) {
      throw new Error(
        `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    }

    return foundEntity
  } catch (err) {
    if (err instanceof Error) console.error(err.message)
    throw new Error("Sorry, couldn't get the entity")
  }
}

async function post<T>(entityType: string, newEntity: T): Promise<T> {
  newEntity = { ...newEntity, _id: _makeId() }
  try {
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
  } catch (err) {
    if (err instanceof Error) console.error(err.message)
    throw new Error("Sorry coudn't add product")
  }
}

async function put<T extends EntityWithId>(
  entityType: string,
  updatedEntity: T
): Promise<T> {
  try {
    const entities = (await query(entityType)) as EntityWithId[]
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    if (idx < 0)
      throw new Error(
        `Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`
      )
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  } catch (err) {
    if (err instanceof Error) console.error(err.message)
    throw new Error("Sorry coudn't update product")
  }
}

async function remove(entityType: string, entityId: string | number) {
  try {
    const entities = (await query(entityType)) as EntityWithId[]
    const idx = entities.findIndex((entity) => entity._id === entityId)
    if (idx < 0)
      throw new Error(
        `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    entities.splice(idx, 1)
    _save(entityType, entities)
  } catch (err) {
    if (err instanceof Error) console.error(err.message)
    throw new Error("Sorry coudn't remove product")
  }
}

// Private functions

function _save<T>(entityType: string, entities: T) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5): string {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
