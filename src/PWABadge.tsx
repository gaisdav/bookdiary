import css from './PWABadge.module.css';
import { useRegisterSW } from 'virtual:pwa-register/react';

// TODO написать статью про кастомную модалку (установки и обновления) для PWA
function PWABadge() {
  // check for updates every hour
  const period = 60 * 60 * 1000;

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker;
          if (sw.state === 'activated') registerPeriodicSync(period, swUrl, r);
        });
      }
    },
  });

  function close() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  return (
    <div className={css.PWABadge} role="alert" aria-labelledby="toast-message">
      {(offlineReady || needRefresh) && (
        <div className={css['PWABadge-toast']}>
          <div className={css['PWABadge-message']}>
            {offlineReady ? (
              <span id="toast-message">App ready to work offline</span>
            ) : (
              <span id="toast-message">New updates available</span>
            )}
          </div>
          <div className={css['PWABadge-buttons']}>
            {needRefresh && (
              <button
                className={css['PWABadge-toast-button']}
                onClick={() => updateServiceWorker(true)}
              >
                Update
              </button>
            )}
            <button
              className={css['PWABadge-toast-button']}
              onClick={() => close()}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PWABadge;

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(
  period: number,
  swUrl: string,
  r: ServiceWorkerRegistration,
) {
  if (period <= 0) return;

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine) return;

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        cache: 'no-store',
        'cache-control': 'no-cache',
      },
    });

    if (resp?.status === 200) await r.update();
  }, period);
}
