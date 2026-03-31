import { useEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { Obstacle, ViewMode } from '../../types'

function classNames(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function SetInitialView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])

  return null
}

function FollowPosition({
  position,
  zoom,
}: {
  position: [number, number] | null
  zoom: number
}) {
  const map = useMap()

  useEffect(() => {
    if (!position) return
    map.setView(position, zoom)
  }, [map, position, zoom])

  return null
}

const userDotIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 14px;
      height: 14px;
      border-radius: 9999px;
      background: rgba(59, 130, 246, 0.95);
      box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.18);
      border: 2px solid rgba(255,255,255,0.9);
    "></div>
  `,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

const obstacleIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 0;
      height: 0;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-bottom: 16px solid rgba(249, 115, 22, 0.95);
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35));
    "></div>
  `,
  iconSize: [18, 16],
  iconAnchor: [9, 16],
  popupAnchor: [0, -16],
})

function categoryBadgeClasses(category: string) {
  switch (category) {
    case 'kaldırım_sorunu':
      return 'bg-amber-500/20 text-amber-200 border-amber-400/30'
    case 'merdiven':
      return 'bg-rose-500/20 text-rose-200 border-rose-400/30'
    case 'rampa_yok':
      return 'bg-orange-500/20 text-orange-200 border-orange-400/30'
    case 'çukur':
      return 'bg-violet-500/20 text-violet-200 border-violet-400/30'
    case 'yüzey_bozuk':
      return 'bg-sky-500/20 text-sky-200 border-sky-400/30'
    case 'geçit_yok':
      return 'bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-400/30'
    case 'diğer':
    default:
      return 'bg-white/10 text-white/80 border-white/15'
  }
}

export function MapPanel({
  mode,
  center,
  obstacles,
}: {
  mode: ViewMode
  center: [number, number]
  obstacles: Obstacle[]
}) {
  const visible = mode === 'split' || mode === 'map'
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null)

  const mapHeightClass = useMemo(() => {
    if (mode === 'map') return 'h-[calc(100vh-160px)]'
    return 'h-full'
  }, [mode])

  if (!visible) return null

  const MapContainerUnsafe = MapContainer as unknown as (props: any) => any
  const MarkerUnsafe = Marker as unknown as (props: any) => any
  const PopupUnsafe = Popup as unknown as (props: any) => any
  const zoom = 13

  useEffect(() => {
    if (!('geolocation' in navigator)) return

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude])
      },
      () => {
        // Sessizce fallback konumda (İstanbul) kal.
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 15_000,
      },
    )
  }, [])

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />

      <div className="relative flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-tight">Harita</div>
          <div className="text-xs text-white/60">
            Canlı engeller ve rota burada görünecek
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/70">
          <span className="rounded-full bg-white/10 px-2 py-1">
            React-Leaflet
          </span>
          <span className="rounded-full bg-white/10 px-2 py-1">
            OpenStreetMap
          </span>
        </div>
      </div>

      <div className={classNames('relative', mapHeightClass)}>
        <MapContainerUnsafe zoomControl={false} className="h-full w-full">
          <SetInitialView center={center} zoom={zoom} />
          <FollowPosition position={userPosition} zoom={zoom} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />

          {userPosition && (
            <MarkerUnsafe position={userPosition} icon={userDotIcon} />
          )}

          {obstacles.map((o) => (
            <MarkerUnsafe
              key={o.id}
              position={[o.lat, o.lng]}
              icon={obstacleIcon}
            >
              <PopupUnsafe>
                <div className="w-56">
                  <div className="flex items-start gap-3">
                    <div className="h-14 w-14 overflow-hidden rounded-lg border border-white/10 bg-black/30">
                      <img
                        src={o.imageUrl}
                        alt="Engel fotoğrafı"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={classNames(
                            'inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-semibold',
                            categoryBadgeClasses(o.kategori),
                          )}
                        >
                          {o.kategori}
                        </span>
                        <span className="text-[11px] text-slate-600">
                          {new Date(o.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-slate-800">
                        {o.note || '—'}
                      </div>
                    </div>
                  </div>
                </div>
              </PopupUnsafe>
            </MarkerUnsafe>
          ))}
        </MapContainerUnsafe>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-2">
          <div className="pointer-events-auto rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 backdrop-blur-md">
            <div className="text-xs font-semibold">Hızlı Aksiyonlar</div>
            <div className="mt-1 flex gap-2">
              <button
                type="button"
                className="rounded-lg bg-white/10 px-2 py-1 text-xs text-white/80 hover:bg-white/15"
              >
                Konuma Git
              </button>
              <button
                type="button"
                className="rounded-lg bg-white/10 px-2 py-1 text-xs text-white/80 hover:bg-white/15"
              >
                Engel Ekle
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

