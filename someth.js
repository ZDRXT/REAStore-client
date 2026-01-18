/**
 * LiqPay Data & Signature Generator
 * 
 * Запуск: node liqpay-generator.js
 */

const crypto = require('crypto');

// ========================================
// 🔑 НАЛАШТУВАННЯ - ВВЕДИ СВОЇ КЛЮЧІ ТУТ
// ========================================

const PUBLIC_KEY = 'sandbox_i78145946008';
const PRIVATE_KEY = 'sandbox_lcYvsQJtsTxn8CzuK80quipnKOYHwG9Zj6GuLP8n';

// ========================================
// 📋 ДАНІ ПЛАТЕЖУ - НАЛАШТУЙ ПІД СЕБЕ
// ========================================

// const paymentData = {
//   version: 3,
//   public_key: PUBLIC_KEY,
//   action: 'reports',  // reports, pay, status
// };

// Для створення платежу розкоментуй це:

const paymentData = {
  version: 3,
  public_key: PUBLIC_KEY,
  action: 'pay',
  amount: 50,
  currency: 'UAH',
  description: 'Тестовий платіж',
  order_id: `order_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
  result_url: 'http://localhost:3000'
};

// Для перевірки статусу платежу:
/*
const paymentData = {
  version: 3,
  public_key: PUBLIC_KEY,
  action: 'status',
  order_id: 'твій_order_id',
};
*/

// Для callback тесту (успішний платіж):
/*
const paymentData = {
  version: 3,
  public_key: PUBLIC_KEY,
  action: 'pay',
  amount: 100,
  currency: 'UAH',
  description: 'Тест',
  order_id: 'test_callback_001',
  status: 'success',
  transaction_id: 123456789,
  sender_card_mask2: '424242****4242',
  payment_id: 987654321,
};
*/

// ========================================
// 🔐 ГЕНЕРАЦІЯ DATA ТА SIGNATURE
// ========================================

// Конвертуємо об'єкт в JSON (БЕЗ пробілів!)
const jsonString = JSON.stringify(paymentData);

// Кодуємо в Base64
const data = Buffer.from(jsonString).toString('base64');

// Створюємо підпис: SHA1(private_key + data + private_key)
const signString = PRIVATE_KEY + data + PRIVATE_KEY;
const signature = crypto
  .createHash('sha1')
  .update(signString)
  .digest('base64');

// ========================================
// 📤 ВИВІД РЕЗУЛЬТАТУ
// ========================================

console.log('\n======================================');
console.log('LiqPay Data & Signature Generated');
console.log('======================================\n');

console.log('JSON:');
console.log(jsonString);
console.log('');

console.log('data:');
console.log(data);
console.log('');

console.log('signature:');
console.log(signature);
console.log('');

console.log('======================================');
console.log('Copy these to Postman:');
console.log('======================================');
console.log('Key: data');
console.log('Value:', data);
console.log('');
console.log('Key: signature');
console.log('Value:', signature);
console.log('======================================\n');

// Додатково: прямий URL для платежу (якщо action = 'pay')
if (paymentData.action === 'pay') {
  const directUrl = `https://www.liqpay.ua/api/3/checkout?data=${encodeURIComponent(data)}&signature=${encodeURIComponent(signature)}`;
  console.log('Direct Payment URL:');
  console.log(directUrl);
  console.log('');
}
