// خدمة عامل بسيطة — مطلوبة فقط لعرض إشعارات التذكير بالدواء.
// لا تقوم بأي تخزين مؤقت (offline caching) في هذه النسخة الأولى.

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

// النقر على الإشعار يفتح التطبيق مباشرة
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      if (clients.length > 0) {
        return clients[0].focus();
      }
      return self.clients.openWindow('./');
    })
  );
});
