import { useEffect, useId, useState } from 'react'

function classNames(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

type ModalState = 'closed' | 'confirm' | 'sent'

export function CompanionButton() {
  const [modal, setModal] = useState<ModalState>('closed')
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    if (modal === 'closed') return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModal('closed')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [modal])

  return (
    <>
      <button
        type="button"
        onClick={() => setModal('confirm')}
        className={classNames(
          'fixed bottom-5 right-5 z-40',
          'rounded-2xl border border-white/15 bg-slate-950/70 backdrop-blur-xl',
          'shadow-2xl shadow-black/40',
          'px-4 py-3',
          'flex flex-col items-center gap-1',
          'hover:bg-slate-950/80 active:scale-[0.99] transition',
          'animate-pulse',
        )}
        aria-label="Yardım çağır"
      >
        <span className="text-2xl leading-none">🆘</span>
        <span className="text-xs font-semibold tracking-tight text-white/90">
          Yardım Çağır
        </span>
      </button>

      {modal !== 'closed' && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Modalı kapat"
            onClick={() => setModal('closed')}
          />

          <div className="relative mx-auto mt-24 w-[min(560px,calc(100%-2rem))]">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descId}
              className="rounded-2xl border border-white/10 bg-slate-950/90 p-5 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div id={titleId} className="text-sm font-semibold text-white">
                    Yol Arkadaşı Çağrısı
                  </div>
                  <div id={descId} className="mt-1 text-sm text-white/70">
                    Konumun paylaşılacak, yakındaki gönüllülere bildirim gidecek.
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-lg bg-white/10 px-2 py-1 text-xs font-semibold text-white/80 hover:bg-white/15"
                  onClick={() => setModal('closed')}
                >
                  Kapat
                </button>
              </div>

              {modal === 'sent' ? (
                <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-100">
                  Çağrın alındı, gönüllü aranıyor...
                </div>
              ) : (
                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/80">
                  Güvenliğin için lütfen yalnız değilsen çağrı göndermeden önce
                  çevrendekilerden destek al.
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
                <button
                  type="button"
                  className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/15"
                  onClick={() => setModal('closed')}
                >
                  İptal
                </button>
                <button
                  type="button"
                  className={classNames(
                    'rounded-xl px-4 py-2 text-sm font-semibold text-white',
                    'bg-rose-500/90 hover:bg-rose-500',
                    modal === 'sent' && 'opacity-60 cursor-not-allowed',
                  )}
                  disabled={modal === 'sent'}
                  onClick={() => setModal('sent')}
                >
                  Çağrı Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

