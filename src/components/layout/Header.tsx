import { useId } from 'react'
import type { ViewMode } from '../../types'

function classNames(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function ModeButton({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        'rounded-full px-3 py-1 text-xs font-medium transition',
        'border backdrop-blur-md',
        active
          ? 'bg-white/90 text-slate-900 border-white/60 shadow-sm'
          : 'bg-white/40 text-slate-700 border-white/40 hover:bg-white/60',
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  )
}

export function Header({
  mode,
  onModeChange,
}: {
  mode: ViewMode
  onModeChange: (mode: ViewMode) => void
}) {
  const appTitleId = useId()
  const appDescId = useId()

  return (
    <header
      className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/40 backdrop-blur-xl"
      aria-labelledby={appTitleId}
      aria-describedby={appDescId}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-400 to-fuchsia-400 shadow-sm" />
            <div className="min-w-0">
              <div
                id={appTitleId}
                className="truncate text-sm font-semibold tracking-tight"
              >
                AccessPath AI
              </div>
              <div id={appDescId} className="truncate text-xs text-white/60">
                Erişilebilir rota + canlı fotoğraf katkısı (MVP)
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ModeButton
            active={mode === 'map'}
            label="Sadece Harita"
            onClick={() => onModeChange('map')}
          />
          <ModeButton
            active={mode === 'camera'}
            label="Sadece Kamera"
            onClick={() => onModeChange('camera')}
          />
          <ModeButton
            active={mode === 'split'}
            label="İkisi Birden"
            onClick={() => onModeChange('split')}
          />
        </div>
      </div>
    </header>
  )
}

