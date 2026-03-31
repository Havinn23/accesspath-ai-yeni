import { GoogleGenerativeAI } from '@google/generative-ai'
import { useEffect, useMemo, useState } from 'react'
import type { Obstacle, ViewMode } from '../../types'

function classNames(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

type ObstacleCategory =
  | 'kaldırım_sorunu'
  | 'merdiven'
  | 'rampa_yok'
  | 'çukur'
  | 'yüzey_bozuk'
  | 'geçit_yok'
  | 'diğer'

type AiObstacleResult = {
  kategori: ObstacleCategory | string
  acıklama: string
}

async function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('File read failed'))
    reader.onload = () => resolve(String(reader.result))
    reader.readAsDataURL(file)
  })

  const match = dataUrl.match(/^data:(.*?);base64,(.*)$/)
  if (!match) throw new Error('Invalid data URL')
  return { mimeType: match[1] ?? file.type, base64: match[2] }
}

function extractJson(text: string): string | null {
  const fenced = text.match(/```json\s*([\s\S]*?)\s*```/i)
  if (fenced?.[1]) return fenced[1].trim()

  const firstBrace = text.indexOf('{')
  const lastBrace = text.lastIndexOf('}')
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1).trim()
  }
  return null
}

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

export function PhotoPanel({
  mode,
  fileInputId,
  imageUrl,
  imageFile,
  onPickFile,
  onClear,
  onAddObstacle,
}: {
  mode: ViewMode
  fileInputId: string
  imageUrl: string | null
  imageFile: File | null
  onPickFile: (file: File | null) => void
  onClear: () => void
  onAddObstacle: (obstacle: Omit<Obstacle, 'id' | 'timestamp'>) => void
}) {
  const visible = mode === 'split' || mode === 'camera'
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)
  const [aiResult, setAiResult] = useState<AiObstacleResult | null>(null)
  const [note, setNote] = useState('')

  const showAnalyze = Boolean(imageFile)
  const canAnalyze = Boolean(imageFile) && !aiLoading
  const canAddToMap = Boolean(imageFile)

  const apiKey = useMemo(() => import.meta.env.VITE_GEMINI_API_KEY as string | undefined, [])

  useEffect(() => {
    // Fotoğraf değiştiğinde önceki sonucu temizle.
    setAiError(null)
    setAiResult(null)
    setNote('')
  }, [imageUrl])

  if (!visible) return null

  async function onAnalyze() {
    if (!imageFile) return
    if (!apiKey) {
      setAiError('Analiz başarısız')
      return
    }

    setAiLoading(true)
    setAiError(null)
    try {
      const { base64, mimeType } = await fileToBase64(imageFile)
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

      const prompt = `Bu fotoğraftaki yol engelini analiz et. Şu kategorilerden birini seç:
kaldırım_sorunu | merdiven | rampa_yok | çukur | yüzey_bozuk | geçit_yok | diğer.
Ayrıca 1 cümle Türkçe açıklama yaz. Şu JSON formatında döndür: { "kategori": "...", "acıklama": "..." }`

      const result = await model.generateContent([
        { text: prompt },
        { inlineData: { data: base64, mimeType } },
      ])

      const text = result.response.text()
      const jsonText = extractJson(text)
      if (!jsonText) throw new Error('No JSON in response')

      const parsed = JSON.parse(jsonText) as Partial<AiObstacleResult>
      if (!parsed.kategori || !parsed.acıklama) throw new Error('Invalid JSON shape')

      setAiResult({
        kategori: parsed.kategori,
        acıklama: parsed.acıklama,
      })
    } catch {
      setAiError('Analiz başarısız')
      setAiResult(null)
    } finally {
      setAiLoading(false)
    }
  }

  async function onAddToMap() {
    if (!imageUrl) return

    if (!('geolocation' in navigator)) return

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const kategori = aiResult?.kategori ? String(aiResult.kategori) : 'diğer'
        onAddObstacle({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          imageUrl,
          note: note.trim(),
          kategori,
        })
      },
      () => {
        // Sessizce vazgeç (requirements: hata fırlatma).
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 15_000,
      },
    )
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-tight">
            Fotoğraf / Kamera
          </div>
          <div className="text-xs text-white/60">
            Engel fotoğrafını çek veya yükle (MVP)
          </div>
        </div>
        <label
          htmlFor={fileInputId}
          className="cursor-pointer rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 hover:bg-white/15"
        >
          Dosya Seç
        </label>
      </div>

      <div className="grid gap-3 px-4 pb-4 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-3">
          <div className="text-xs font-semibold text-white/80">
            Hızlı Yükleme
          </div>
          <div className="mt-2 grid gap-2">
            <input
              id={fileInputId}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
            />

            <label
              htmlFor={fileInputId}
              className={classNames(
                'flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl',
                'border border-dashed border-white/20 bg-white/5',
                'text-center text-sm text-white/70 hover:bg-white/10',
              )}
            >
              <span className="font-medium text-white/80">
                Dokun ve fotoğraf çek / yükle
              </span>
              <span className="mt-1 text-xs text-white/50">
                Mobilde kamera açılır, masaüstünde dosya seçilir
              </span>
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!canAddToMap}
                onClick={onAddToMap}
                className={classNames(
                  'rounded-lg px-3 py-2 text-xs font-semibold transition',
                  canAddToMap
                    ? 'bg-indigo-500/80 text-white hover:bg-indigo-500'
                    : 'bg-white/10 text-white/40 cursor-not-allowed',
                )}
              >
                Haritaya Ekle
              </button>
              {showAnalyze && (
                <button
                  type="button"
                  disabled={!canAnalyze}
                  onClick={onAnalyze}
                  className={classNames(
                    'rounded-lg px-3 py-2 text-xs font-semibold transition',
                    canAnalyze
                      ? 'bg-emerald-500/80 text-white hover:bg-emerald-500'
                      : 'bg-white/10 text-white/40 cursor-not-allowed',
                  )}
                >
                  {aiLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white/90" />
                      Analiz ediliyor
                    </span>
                  ) : (
                    'AI Analiz Et'
                  )}
                </button>
              )}
              <button
                type="button"
                className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 hover:bg-white/15"
                onClick={onClear}
              >
                Temizle
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-white/80">Önizleme</div>
            {imageUrl && (
              <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-[11px] text-emerald-200">
                Hazır
              </span>
            )}
          </div>

          <div className="mt-2 overflow-hidden rounded-xl border border-white/10 bg-black/30">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Yüklenen fotoğraf önizlemesi"
                className="h-56 w-full object-cover md:h-64"
              />
            ) : (
              <div className="flex h-56 w-full items-center justify-center text-sm text-white/50 md:h-64">
                Henüz fotoğraf yok
              </div>
            )}
          </div>

          <div className="mt-3 grid gap-2">
            <input
              type="text"
              placeholder="Kısa not (örn. kaldırım yüksek, rampa yok)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-indigo-400/60 focus:outline-none"
            />

            {(aiResult || aiError) && (
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                {aiResult && (
                  <div className="flex flex-wrap items-start gap-2">
                    <span
                      className={classNames(
                        'inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-semibold',
                        categoryBadgeClasses(String(aiResult.kategori)),
                      )}
                    >
                      {String(aiResult.kategori)}
                    </span>
                    <span className="text-sm text-white/80">
                      {aiResult.acıklama}
                    </span>
                  </div>
                )}
                {aiError && (
                  <div className="text-sm font-medium text-rose-200">
                    Analiz başarısız
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between gap-2 text-xs text-white/50">
              <span>Konum: otomatik (yakında)</span>
              <span>Etiket: AI önerisi (yakında)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

