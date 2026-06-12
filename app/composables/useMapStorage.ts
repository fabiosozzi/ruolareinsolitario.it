import type { StoredMap, MapMarker } from '~/types/vtt'

const DB_NAME = 'vtt-maps'
const STORE_NAME = 'maps'
const DB_VERSION = 2

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export function useMapStorage() {
  const maps = ref<StoredMap[]>([])

  async function loadMaps(): Promise<StoredMap[]> {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const request = store.getAll()
      request.onsuccess = () => {
        maps.value = request.result
          .map((m: StoredMap) => ({ ...m, description: m.description ?? '' }))
          .sort((a, b) => b.timestamp - a.timestamp)
        resolve(maps.value)
      }
      request.onerror = () => reject(request.error)
    })
  }

  async function saveMap(file: File, description: string = ''): Promise<StoredMap> {
    const dataUrl = await fileToDataUrl(file)
    const map: StoredMap = {
      id: crypto.randomUUID(),
      name: file.name,
      description,
      dataUrl,
      timestamp: Date.now(),
      markers: [],
    }
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      const request = store.put(map)
      request.onsuccess = () => {
        maps.value.unshift(map)
        resolve(map)
      }
      request.onerror = () => reject(request.error)
    })
  }

  async function updateMapMeta(id: string, data: { name?: string; description?: string }): Promise<void> {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      const getRequest = store.get(id)
      getRequest.onsuccess = () => {
        const map = getRequest.result as StoredMap | undefined
        if (!map) { resolve(); return }
        if (data.name !== undefined) map.name = data.name
        if (data.description !== undefined) map.description = data.description
        store.put(map)
        const idx = maps.value.findIndex((m) => m.id === id)
        if (idx !== -1) maps.value[idx] = map
        resolve()
      }
      getRequest.onerror = () => reject(getRequest.error)
    })
  }

  async function deleteMap(id: string): Promise<void> {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      const request = store.delete(id)
      request.onsuccess = () => {
        maps.value = maps.value.filter((m) => m.id !== id)
        resolve()
      }
      request.onerror = () => reject(request.error)
    })
  }

  async function updateMarkers(id: string, markers: MapMarker[]): Promise<void> {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      const getRequest = store.get(id)
      getRequest.onsuccess = () => {
        const map = getRequest.result as StoredMap | undefined
        if (!map) { resolve(); return }
        map.markers = markers
        store.put(map)
        const idx = maps.value.findIndex((m) => m.id === id)
        if (idx !== -1) maps.value[idx] = map
        resolve()
      }
      getRequest.onerror = () => reject(getRequest.error)
    })
  }

  function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(file)
    })
  }

  return {
    maps: readonly(maps),
    loadMaps,
    saveMap,
    updateMapMeta,
    deleteMap,
    updateMarkers,
  }
}
