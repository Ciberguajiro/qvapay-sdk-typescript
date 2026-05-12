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
- `qvapay.invoices`: Gestión de facturas v1.
- `qvapay.transactions`: Historial y detalles de transacciones.
- `qvapay.me`: Perfil del usuario autenticado y transferencias.
- `qvapay.p2p`: Creación y aplicación a ofertas P2P.
- `qvapay.store`: Tarjetas de regalo y paquetes de telefonía.
- `qvapay.coins`: Información de criptomonedas y tasas.
- `qvapay.stocks`: Trading de acciones.

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
