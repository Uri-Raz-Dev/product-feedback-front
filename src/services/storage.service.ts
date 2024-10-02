export const localStoargeService = {
  loadFromStorage,
  saveToStorage,
}

function saveToStorage<Type>(key: string, val: Type) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage<Type>(key: string): Type | null {
  const val = localStorage.getItem(key)
  if (!val) return null
  try {
    return JSON.parse(val) as Type
  } catch (err) {
    console.error('Error parsing JSON from storage:', err)
    return null
  }
}
