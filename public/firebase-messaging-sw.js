importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// پیکربندی Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBVtKyIzcD0xVEMOjeMYjDdNRozFVVrmRo",
  authDomain: "liom-31952.firebaseapp.com",
  databaseURL: "https://liom-31952.firebaseio.com",
  projectId: "liom-31952",
  storageBucket: "liom-31952.firebasestorage.app",
  messagingSenderId: "518322220404",
  appId: "1:518322220404:web:09527c8a42f2f017d89021",
  measurementId: "G-TVWYWYEH1D"
};

// مقداردهی Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// دریافت پیام‌ها در پس‌زمینه
messaging.onBackgroundMessage(async (payload) => {
  console.log('پیام پس‌زمینه دریافت شد: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icons/favicon.ico",
    data: {
      url: payload.data.url || "/login" // ذخیره URL یا داده اضافی
    }
  };

  // نمایش نوتیفیکیشن
  try {
    await self.registration.showNotification(notificationTitle, notificationOptions);
  } catch (error) {
    console.error("خطا در نمایش نوتیفیکیشن: ", error);
  }
});

// رویداد کلیک روی نوتیفیکیشن
self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const notificationData = notification.data; // داده‌های نوتیفیکیشن

  // بستن نوتیفیکیشن
  notification.close();

  // اگر داده URL وجود داشت، باز کردن URL
  if (notificationData && notificationData.url) {
    event.waitUntil(
      clients.openWindow(notificationData.url) // باز کردن URL
    );
  } else {
    // اگر URL نبود، می‌تونی کار دیگری انجام بدی (مثلاً نمایش صفحه اصلی)
    event.waitUntil(clients.openWindow('/'));
  }
});
