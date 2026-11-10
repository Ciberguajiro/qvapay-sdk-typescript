# QvaPay SDK para TypeScript/JavaScript

[![CI](https://github.com/qvapay/qvapay-ts-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/qvapay/qvapay-ts-sdk/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SDK oficial (comunitario) para interactuar con la API de [QvaPay](https://api.qvapay.com), diseñado para ser utilizado con Bun, Node.js o en el navegador.

## 🚀 Características

- **Soporte completo de la API**: Incluye endpoints de las versiones v1 y v2.
- **Tipado fuerte**: Escrito íntegramente en TypeScript para una mejor experiencia de desarrollo.
- **Validación integrada**: Comprobaciones básicas antes de enviar peticiones a la API.
- **Gestión de errores**: Sistema de errores detallado para facilitar la depuración.
- **Multiservicio**: Dividido en módulos lógicos (Auth, App, P2P, Tienda, etc.).

## 📦 Instalación

Para instalar el SDK en tu proyecto:

```bash
# Con Bun (Recomendado)
bun add sdk-qvapay

# Con NPM
npm install sdk-qvapay

# Con Yarn
yarn add sdk-qvapay
```

## 🛠️ Configuración Inicial

Necesitarás tu `app_id` y `app_secret`, los cuales puedes obtener creando una aplicación en el panel de desarrollador de QvaPay.

```typescript
import { QvaPaySDK } from "sdk-qvapay";

const qvapay = new QvaPaySDK({
  appId: "tu_app_id",
  appSecret: "tu_app_secret",
});
```

## 📖 Ejemplos de Uso

### Crear una Factura (v2)

Esta es la forma recomendada para integrar pagos en tu sitio web.

```typescript
const invoice = await qvapay.app.createInvoice({
  amount: 5.00,
  description: "Pago de suscripción Premium",
  remote_id: "order_12345",
  webhook: "https://tu-sitio.com/webhook"
});

console.log(`Paga aquí: ${invoice.url}`);
```

### Autenticación de Usuario

Puedes permitir que los usuarios inicien sesión en QvaPay a través de tu aplicación.

```typescript
try {
  const { user, token } = await qvapay.auth.login({
    email: "usuario@ejemplo.com",
    password: "tu_password"
  });

  console.log(`Bienvenido, ${user.name}. Tu balance es: ${user.balance}`);
} catch (error) {
  console.error("Error al iniciar sesión", error.message);
}
```

### Consultar Balance (Merchant)

```typescript
const balance = await qvapay.app.getBalance();
console.log(`Balance de la App: ${balance} QUSD`);
```

### Mercado P2P

Listar ofertas disponibles en el mercado.

```typescript
const offers = await qvapay.p2p.list();
offers.forEach(offer => {
  console.log(`[${offer.type}] ${offer.amount} QUSD por ${offer.receive} ${offer.coin}`);
});
```

## 📂 Estructura del SDK

El SDK está organizado en servicios accesibles desde la instancia principal:

- `qvapay.auth`: Registro, login, gestión de sesiones y PIN.
- `qvapay.app`: Información del comercio, balance y facturación v2.
- `qvapay.apps`: Gestión de aplicaciones del usuario, botones de pago, logs y mini-apps.
- `qvapay.transactions`: Historial, comentarios, detalle y estado de transacciones.
- `qvapay.user`: Perfil, KYC, métodos de pago, Lightning Address, contactos, empresas y verificación CIP/CPF/SSN.
- `qvapay.withdraw`: Retiros, lookup de rutas ABA bancarias y zonas de efectivo.
- `qvapay.p2p`: Ofertas P2P, promedios, comprobantes, pausas, promocionadas y feed/stream.
- `qvapay.store`: Catálogo de vouchers, paquetes de telefonía, eSIM de viaje, compras y pagos PIX.
- `qvapay.coins`: Categorías, monedas v2 e histórico de precios.
- `qvapay.stocks`: Trading de acciones, cotización extendida y portafolio.
- `qvapay.saving`: Cuenta de ahorro, depósitos, extracciones y redondeo automático.
- `qvapay.energy`: Cotización y alquiler de energía de la red TRON.
- `qvapay.market`: Marketplace (tiendas, productos, variantes, órdenes y compras).
- `qvapay.support`: Sistema de tickets de atención al cliente y respuestas.
- `qvapay.push`: Notificaciones push, tokens de dispositivo y bandeja de entrada.
- `qvapay.miniapps`: Catálogo de mini-apps móviles y permisos.
- `qvapay.paymentLinks`: Enlaces de cobro rápido.
- `qvapay.invoices` *(deprecado)*: Facturas v1 (se recomienda usar `qvapay.app`).
- `qvapay.me` *(deprecado)*: Perfil y transferencias (se recomienda usar `qvapay.user` y `qvapay.transactions`).

## 🔄 Tabla de Cambios y Sincronización (v0.1.0)

| Módulo | Endpoint / Cambio | Descripción |
|---|---|---|
| **Auth** | `POST /auth/login` | Soporte para `remember`, `twoFactorCode` y respuesta 202 (2FA requerido). |
| **Auth** | `POST /auth/register` | Actualizado a los parámetros oficiales (`name`, `lastname`, `email`, etc.). |
| **Auth** | `POST /auth/confirm-registration` | Ruta corregida (antes `/register/confirmation`). |
| **Auth** | `POST/DELETE /auth/logout` | Cierre de sesión individual y múltiple mediante POST / DELETE. |
| **Auth** | `POST /auth/request-pin` | Ruta corregida (antes `/request_pin`). |
| **Auth** | `checkAuth()` | Deprecado (sunset 2026-07-15), reimplementado con `GET /user`. |
| **Transactions** | `GET /transaction` | Corregida ruta singular (antes `/transactions`) y migrado a `userHttp`. |
| **Transactions** | `/transaction/:uuid/comments` | Listar, crear y borrar comentarios de una transacción. |
| **Transactions** | `GET /api/transaction/:uuid/status` | Consulta ligera de estado para polling. |
| **P2P** | `userHttp` / App credentials | Cliente migrado a autenticación Bearer por defecto. |
| **P2P** | `GET /p2p/averages` & `/p2p/completed_pairs_average` | Promedios generales e individuales de pares P2P. |
| **P2P** | `GET /p2p/featured` & `/p2p/promo` | Ofertas destacadas y puestos promocionados. |
| **P2P** | `/p2p/:uuid/attachments` | Gestión de comprobantes de pago. |
| **P2P** | SSE helpers | Generación de URL y headers para stream P2P y chat stream. |
| **Coins** | `GET /coins/v2` & `/coins/price-history/:tick` | Listado v2 con filtros y cotizaciones históricas. |
| **Withdraw** | `GET /withdraw/:id` & `/withdraw/bank-lookup` | Detalle de retiro y verificación ABA de bancos en EE. UU. |
| **Withdraw** | `GET /withdraw/cash-zones` | Zonas y tarifas de entrega en efectivo (USDCASH). |
| **Withdraw** | `POST /withdraw` | Campos de `idempotencyKey`, `destLabel` y `compliance` (OFAC/CACR). |
| **User** | `PATCH /user/payment-methods` | Edición de métodos de pago guardados. |
| **User** | `GET /user/cip`, `/verify-cpf`, `/verify-ssn` | Verificación de identidad CIP, CPF brasileño y SSN estadounidense. |
| **User** | `GET /user/deposit-eligibility` | Consulta de elegibilidad para depósitos CARD, PAYPAL y BANK. |
| **User** | `GET /user/company` & `/api/user/company` | Solicitudes de cuenta corporativa y ONG. |
| **Store** | `GET /store/my` & `/store/my/:id` | Historial de compras y obtención de credenciales/códigos. |
| **Store** | `/store/esim-catalog` & `/store/esim/purchase` | Catálogo y compra de eSIMs para más de 190 países. |
| **Store** | `/pix/eligibility` & `/pix/checkout` | Pagos instantáneos con PIX en reales desde Brasil. |
| **Apps** | `/app/:uuid/pay-buttons` | CRUD de botones de pago integrados. |
| **Apps** | `/app/:uuid/miniapp` & `/miniapp/messages` | Hilo de conversación para revisión de mini-apps. |
| **Servicios Nuevos** | `Support`, `Push`, `Saving`, `Energy`, `Market`, `MiniApps` | Implementación completa de los 6 nuevos módulos documentados. |
| **Errores** | `QvaPayApiError.code` | Exposición de código de error de la API y soporte de rate limit (429). |

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor, lee nuestras [guías de contribución](CONTRIBUTING.md) para empezar.

1. Haz un Fork del proyecto.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -m 'Añade nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

Desarrollado con ❤️ para la comunidad de QvaPay.
