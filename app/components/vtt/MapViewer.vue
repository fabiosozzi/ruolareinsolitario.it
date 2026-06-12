<script setup lang="ts">
import type { MapMarker, StoredMap } from '~/types/vtt'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogFooter, DialogHeader, DialogScrollContent, DialogTitle } from '@/components/ui/dialog'

const props = defineProps<{
  markerIcon?: string
}>()

const { t } = useI18n()
const { maps, loadMaps, saveMap, deleteMap, updateMarkers, updateMapMeta } = useMapStorage()

const isDragging = ref(false)
const selectedMap = ref<string | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const imgRef = ref<HTMLImageElement | null>(null)
const searchQuery = ref('')
const dialogOpen = ref(false)

interface PendingFile {
  file: File
  preview: string
  name: string
  description: string
}
const pendingFiles = ref<PendingFile[]>([])
const editingMap = ref<StoredMap | null>(null)

const imgRect = reactive({ x: 0, y: 0, w: 0, h: 0 })

onMounted(() => {
  loadMaps()
  const ro = new ResizeObserver(updateImgRect)
  if (containerRef.value) ro.observe(containerRef.value)
})

watch(dialogOpen, (open) => {
  if (!open) {
    for (const pf of pendingFiles.value) {
      URL.revokeObjectURL(pf.preview)
    }
    pendingFiles.value = []
    editingMap.value = null
  }
})

function updateImgRect() {
  if (!imgRef.value || !containerRef.value) return
  const cr = containerRef.value.getBoundingClientRect()
  const ir = imgRef.value.getBoundingClientRect()
  imgRect.x = ir.left - cr.left
  imgRect.y = ir.top - cr.top
  imgRect.w = ir.width
  imgRect.h = ir.height
}

function handleDrop(e: DragEvent) {
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    addFiles(Array.from(files))
  }
}

function handleFileInput(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    addFiles(Array.from(input.files))
  }
  input.value = ''
}

function addFiles(files: File[]) {
  const imageFiles = files.filter((f) => f.type.startsWith('image/'))
  if (imageFiles.length === 0) return
  pendingFiles.value = imageFiles.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
    name: file.name,
    description: '',
  }))
  editingMap.value = null
  dialogOpen.value = true
}

function savePendingFiles() {
  for (const pf of pendingFiles.value) {
    saveMap(pf.file, pf.description)
  }
  dialogOpen.value = false
}

function openEdit(map: StoredMap) {
  pendingFiles.value = []
  editingMap.value = { ...map }
  dialogOpen.value = true
}

function saveEdit() {
  if (!editingMap.value) return
  updateMapMeta(editingMap.value.id, {
    name: editingMap.value.name,
    description: editingMap.value.description,
  })
  dialogOpen.value = false
}

const activeMap = computed(() => {
  if (!selectedMap.value) return null
  return maps.value.find((m) => m.id === selectedMap.value) ?? null
})

function removeMap(id: string) {
  if (selectedMap.value === id) {
    selectedMap.value = null
  }
  deleteMap(id)
}

function handleMapClick(e: MouseEvent) {
  if (!activeMap.value || !props.markerIcon) return
  const rect = containerRef.value!.getBoundingClientRect()
  const xPercent = ((e.clientX - rect.left - imgRect.x) / imgRect.w) * 100
  const yPercent = ((e.clientY - rect.top - imgRect.y) / imgRect.h) * 100
  if (xPercent < 0 || xPercent > 100 || yPercent < 0 || yPercent > 100) return
  const existing = activeMap.value.markers?.[0]
  const marker: MapMarker = {
    id: existing?.id ?? crypto.randomUUID(),
    x: Math.round(xPercent * 100) / 100,
    y: Math.round(yPercent * 100) / 100,
  }
  updateMarkers(activeMap.value.id, [marker])
}

function getMarkerStyle(m: MapMarker) {
  const x = imgRect.x + (m.x / 100) * imgRect.w
  const y = imgRect.y + (m.y / 100) * imgRect.h
  return {
    left: `${x}px`,
    top: `${y}px`,
    transform: 'translate(-50%, -50%)',
  }
}

const filteredMaps = computed(() => {
  if (!searchQuery.value) return maps.value
  const q = searchQuery.value.toLowerCase()
  return maps.value.filter(
    (m) => m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
  )
})
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogScrollContent
      class="border-yellow-700/50 bg-neutral-900 text-yellow-100"
    >
      <DialogHeader>
        <DialogTitle class="text-yellow-400 font-heading">
          {{ editingMap ? t('vtt.maps.editModalTitle') : t('vtt.maps.uploadModalTitle') }}
        </DialogTitle>
      </DialogHeader>

      <div v-if="editingMap" class="space-y-3">
        <div>
          <label class="text-xs text-yellow-400/70 font-heading">{{ t('vtt.maps.fileName') }}</label>
          <input
            v-model="editingMap.name"
            class="mt-1 w-full px-3 py-1.5 text-sm bg-black/50 border border-yellow-700/50 rounded text-yellow-200 outline-none focus:border-yellow-500/60 transition-colors"
          />
        </div>
        <div>
          <label class="text-xs text-yellow-400/70 font-heading">{{ t('vtt.maps.description') }}</label>
          <textarea
            v-model="editingMap.description"
            rows="3"
            class="mt-1 w-full px-3 py-1.5 text-sm bg-black/50 border border-yellow-700/50 rounded text-yellow-200 outline-none focus:border-yellow-500/60 transition-colors resize-none"
          />
        </div>
      </div>

      <div v-else class="space-y-4 max-h-60 overflow-y-auto">
        <div
          v-for="(pf, i) in pendingFiles"
          :key="i"
          class="flex gap-3 p-2 border border-yellow-700/30 rounded"
        >
          <img
            :src="pf.preview"
            class="w-20 h-14 object-cover rounded shrink-0"
          />
          <div class="flex-1 space-y-2 min-w-0">
            <input
              v-model="pf.name"
              class="w-full px-2 py-1 text-xs bg-black/50 border border-yellow-700/50 rounded text-yellow-200 outline-none focus:border-yellow-500/60 transition-colors"
            />
            <textarea
              v-model="pf.description"
              rows="2"
              placeholder="..."
              class="w-full px-2 py-1 text-xs bg-black/50 border border-yellow-700/50 rounded text-yellow-200 outline-none focus:border-yellow-500/60 transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      <DialogFooter class="mt-4">
        <DialogClose as-child>
          <Button
            variant="outline"
            class="border-yellow-700/50 text-yellow-200 hover:bg-yellow-800/40"
          >
            {{ t('vtt.maps.cancel') }}
          </Button>
        </DialogClose>
        <Button
          class="bg-yellow-700/60 hover:bg-yellow-600/70 text-yellow-100 cursor-pointer"
          @click="editingMap ? saveEdit() : savePendingFiles()"
        >
          {{ t('vtt.maps.save') }}
        </Button>
      </DialogFooter>
    </DialogScrollContent>
  </Dialog>

  <div
    ref="containerRef"
    class="relative h-full bg-black/60 backdrop-blur-sm border border-yellow-700/50 rounded-lg overflow-hidden"
    @drop.prevent="handleDrop"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
  >
    <div v-if="!activeMap" class="h-full">
      <div
        v-if="isDragging"
        class="flex items-center justify-center h-full"
      >
        <div class="text-yellow-400 text-lg font-heading text-center">
          {{ t('vtt.maps.dragAndDrop') }}
        </div>
      </div>

      <div v-else class="flex flex-col h-full p-3 gap-3">
        <div class="flex items-center gap-2 p-2 bg-black/70 backdrop-blur-sm border border-yellow-700/50 rounded-lg">
          <input
            v-model="searchQuery"
            :placeholder="t('vtt.maps.search')"
            class="flex-1 px-3 py-1.5 text-xs bg-black/50 border border-yellow-700/50 rounded text-yellow-200 outline-none focus:border-yellow-500/60 transition-colors placeholder-yellow-200/30"
          />
          <label
            class="shrink-0 px-3 py-1.5 text-xs font-heading bg-yellow-800/40 hover:bg-yellow-700/60 border border-yellow-700/50 rounded transition-colors cursor-pointer"
          >
            {{ t('vtt.maps.upload') }}
            <input type="file" accept="image/*" multiple class="hidden" @change="handleFileInput" />
          </label>
        </div>

        <div v-if="maps.length" class="flex-1 overflow-y-auto space-y-2">
          <div
            v-for="map in filteredMaps"
            :key="map.id"
            class="group flex gap-3 p-2 rounded border border-yellow-700/30 cursor-pointer hover:border-yellow-500/60 transition-colors"
            @click="selectedMap = map.id"
          >
            <img
              :src="map.dataUrl"
              :alt="map.name"
              class="w-24 h-16 object-cover rounded shrink-0"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <div class="text-xs text-yellow-200 font-heading truncate">{{ map.name }}</div>
                <div class="flex gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span
                    class="text-yellow-400/70 hover:text-yellow-300 cursor-pointer text-xs"
                    @click.stop="openEdit(map)"
                  >✎</span>
                  <span
                    class="text-red-400 hover:text-red-300 cursor-pointer text-xs"
                    @click.stop="removeMap(map.id)"
                  >×</span>
                </div>
              </div>
              <p
                v-if="map.description"
                class="text-[10px] text-yellow-200/50 leading-tight line-clamp-2 mt-0.5"
              >
                {{ map.description }}
              </p>
            </div>
          </div>
        </div>

        <p v-else class="text-yellow-200/50 text-sm text-center mt-4">
          {{ t('vtt.maps.noMaps') }}
        </p>
      </div>
    </div>

    <div v-else class="relative h-full flex items-center justify-center" @click="handleMapClick">
      <img
        ref="imgRef"
        :src="activeMap.dataUrl"
        :alt="activeMap.name"
        class="max-h-full max-w-full"
        @load="updateImgRect"
      />

      <div v-if="markerIcon" class="absolute inset-0 pointer-events-none">
        <img
          v-for="m in activeMap.markers || []"
          :key="m.id"
          :src="markerIcon"
          :style="getMarkerStyle(m)"
          class="absolute w-10 h-10 pointer-events-none"
        />
      </div>

      <div class="absolute top-2 left-2 bg-black/70 text-xs text-yellow-200 px-2 py-1 rounded pointer-events-none max-w-[60%]">
        <div class="truncate font-heading">{{ activeMap.name }}</div>
        <p
          v-if="activeMap.description"
          class="text-[10px] text-yellow-200/60 mt-0.5 leading-tight line-clamp-3"
        >
          {{ activeMap.description }}
        </p>
      </div>
      <button
        class="absolute top-2 right-2 px-2 py-1 text-xs bg-black/70 text-yellow-400 hover:text-white rounded cursor-pointer z-20"
        @click.stop="selectedMap = null"
      >
        ✕ {{ t('vtt.sidebar.close') }}
      </button>
    </div>
  </div>
</template>
