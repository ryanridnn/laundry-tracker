self.addEventListener('activate', function() {
  console.log('Service Worker activated!');
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
    const { title, options, scheduledTime } = event.data;

    const delay = scheduledTime - Date.now();

    if (delay > 0) {
      setTimeout(() => {
        self.registration.showNotification(title, options);
        self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then((clients) => {
          clients.forEach((client) => {
            client.postMessage({ action: 'NOTIFICATION_TRIGGERED' });
          });
        });
      }, delay);
    }
  }
});
