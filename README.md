# Crypto Tracker App

Una aplicación móvil de React Native para rastrear criptomonedas en tiempo real, con alertas de precio personalizadas y visualización de gráficos históricos.

## 📋 Descripción del Proyecto

Esta aplicación permite a los usuarios monitorear precios de criptomonedas en tiempo real utilizando la API de Finnhub. Los usuarios pueden:
- Ver una lista de criptomonedas con sus precios actualizados en tiempo real
- Ver detalles y gráficos históricos de cada criptomoneda
- Configurar alertas de precio personalizadas
- Recibir notificaciones cuando los precios alcanzan niveles específicos

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico

- **Framework**: React Native 0.79.2
- **Lenguaje**: TypeScript 5.0.4
- **UI Framework**: React 19.0.0
- **Estado Global**: Redux Toolkit 2.8.1
- **Navegación**: React Navigation 7.x (Native Stack Navigator)
- **API de Datos**: Finnhub API (REST + WebSocket)
- **Gráficos**: react-native-gifted-charts 1.4.64

### Dependencias Principales

```json
{
  "@react-navigation/native": "^7.1.9",
  "@react-navigation/native-stack": "^7.3.13",
  "@reduxjs/toolkit": "^2.8.1",
  "react-redux": "^9.2.0",
  "react-native-gifted-charts": "^1.4.64",
  "react-native-linear-gradient": "^2.8.3",
  "react-native-haptic-feedback": "^2.3.3",
  "react-native-svg": "^15.13.0"
}
```

## 📁 Estructura del Proyecto

```
src/
├── components/              # Componentes reutilizables
│   ├── Error/              # Componente para mostrar errores
│   ├── HeaderButton/       # Botón personalizado para el header
│   └── Loading/            # Indicador de carga
├── screens/                # Pantallas de la aplicación
│   ├── Home/               # Pantalla principal con lista de cryptos
│   │   └── components/     # Componentes específicos de Home
│   │       └── CryptoItem/ # Item individual de criptomoneda
│   ├── Details/            # Pantalla de detalles con gráficos
│   └── AddAlert/           # Pantalla para crear alertas de precio
├── services/               # Servicios externos
│   ├── cryptoData.ts       # Servicio REST API para datos de crypto
│   └── finnhubSocket.ts    # WebSocket para actualizaciones en tiempo real
├── store/                  # Redux state management
│   ├── crypto/             # Slice de Redux para datos de crypto
│   ├── alerts/             # Slice de Redux para alertas
│   └── store.ts            # Configuración del store
└── constants.ts            # Constantes y configuración global
```

## 🔧 Configuración del Proyecto

### Requisitos Previos

- **Node.js**: >= 18
- **Ruby**: Para CocoaPods (iOS)
- **Xcode**: Para desarrollo iOS
- **Android Studio**: Para desarrollo Android
- **React Native CLI**: Instalado globalmente

### Variables de Configuración

El proyecto utiliza las siguientes configuraciones en `src/constants.ts`:

```typescript
// API Key de Finnhub
FINNHUB_API_KEY: string

// Símbolos de criptomonedas soportados
CURRENCIES: string[] // Formato: 'BINANCE:BTCUSDT'

// Mapas de iconos y colores por criptomoneda
ICON_MAP: { [key: string]: string }
COLOR_MAP: { [key: string]: string }
```

## 🌐 API y Servicios

### Finnhub API

La aplicación utiliza dos tipos de conexiones con Finnhub:

#### 1. REST API (`cryptoData.ts`)
- **Endpoint**: `https://finnhub.io/api/v1/quote`
- **Propósito**: Obtener datos iniciales de precios
- **Datos obtenidos**:
  - Precio actual (c)
  - Cambio de precio (d)
  - Porcentaje de cambio (dp)
  - Precio más alto (h)
  - Precio más bajo (l)
  - Precio de apertura (o)
  - Precio de cierre anterior (pc)

#### 2. WebSocket (`finnhubSocket.ts`)
- **Endpoint**: `wss://ws.finnhub.io`
- **Propósito**: Actualizaciones de precio en tiempo real
- **Eventos**:
  - `subscribe`: Suscripción a símbolos
  - `trade`: Datos de transacciones en tiempo real

### Criptomonedas Soportadas

- Ethereum (ETH)
- Solana (SOL)
- Cardano (ADA)
- Dogecoin (DOGE)
- Polygon (MATIC)
- Binance Coin (BNB)

## 🗄️ Gestión de Estado (Redux)

### Store Structure

```typescript
{
  crypto: {
    data: { [id: string]: CryptoData },
    loading: boolean,
    error: string | null
  },
  alerts: {
    alerts: Alert[]
  }
}
```

### Slices

#### Crypto Slice
- **State**: Maneja datos de criptomonedas, estados de carga y errores
- **Actions**:
  - `setCryptoData`: Establece datos completos de crypto
  - `updatePrice`: Actualiza precio individual en tiempo real
  - `setLoading`: Maneja estado de carga
  - `setError`: Maneja errores

#### Alerts Slice
- **State**: Maneja alertas de precio configuradas por el usuario
- **Actions**:
  - `addAlert`: Agrega nueva alerta
  - `removeAlert`: Elimina alerta existente

## 🧭 Navegación

### Stack Navigator

La aplicación utiliza React Navigation con Native Stack Navigator:

```typescript
type RootStackParamList = {
  Home: undefined;
  Detail: {
    name: string;
    price: string;
    icon: string;
    color: string;
    percentageChange?: string;
  };
  AddAlert: undefined;
};
```

### Pantallas

1. **Home** (`/src/screens/Home`)
   - Lista de criptomonedas
   - Precios en tiempo real
   - Navegación a detalles
   - Botón para agregar alertas

2. **Detail** (`/src/screens/Details`)
   - Información detallada de la criptomoneda
   - Gráfico de precios históricos
   - Indicadores de cambio porcentual

3. **AddAlert** (`/src/screens/AddAlert`)
   - Formulario para crear alertas de precio
   - Selector de criptomoneda
   - Configuración de precio objetivo

## ✨ Características

### Funcionalidades Principales

- ✅ **Precios en Tiempo Real**: WebSocket para actualizaciones instantáneas
- ✅ **Visualización de Gráficos**: Gráficos históricos con react-native-gifted-charts
- ✅ **Alertas de Precio**: Sistema de alertas personalizables
- ✅ **Feedback Háptico**: Retroalimentación táctil en interacciones
- ✅ **Gradientes Lineales**: UI moderna con gradientes personalizados por crypto
- ✅ **Manejo de Errores**: Sistema robusto de manejo de errores
- ✅ **Estados de Carga**: Indicadores de carga mientras se obtienen datos

### UI/UX

- Diseño responsivo con Safe Area Context
- Colores branded por criptomoneda
- Iconos oficiales de criptomonedas
- Transiciones suaves entre pantallas
- Feedback visual inmediato


## 🔍 Troubleshooting

### Problemas Comunes

#### WebSocket no conecta
- Verifica que la API key de Finnhub sea válida
- Asegúrate de que el dispositivo/simulador tenga conexión a internet
- Revisa los logs para mensajes de error específicos

#### Precios no se actualizan
- El WebSocket puede tardar unos segundos en establecer conexión
- Verifica que los símbolos en `CURRENCIES` sean válidos
- Revisa la consola para errores de API

#### Error al instalar pods (iOS)
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install --repo-update
```

#### Error de build en Android
```bash
cd android
./gradlew clean
cd ..
npm run android
```

#### Metro bundler issues
```bash
npm start -- --reset-cache
```

### Logs y Debugging

Para ver logs detallados:

**iOS**:
```bash
npx react-native log-ios
```

**Android**:
```bash
npx react-native log-android
```

## 🛠️ Desarrollo

### Buenas Prácticas

1. **TypeScript**: Siempre tipar correctamente los componentes y funciones
2. **Redux**: Usar los hooks tipados de Redux (`useAppDispatch`, `useAppSelector`)
3. **Estilos**: Mantener los estilos en archivos separados (`styles.ts`)
4. **Componentes**: Crear componentes reutilizables cuando sea posible
5. **Manejo de Errores**: Siempre manejar errores en llamadas a API

### Scripts Disponibles

```bash
# Iniciar Metro
npm start

# Build Android
npm run android

# Build iOS
npm run ios

# Ejecutar linter
npm run lint

# Ejecutar tests
npm test
```

### Agregar Nuevas Criptomonedas

Para agregar más criptomonedas al tracker:

1. Agregar el símbolo en `src/constants.ts` en el array `CURRENCIES`:
```typescript
export const CURRENCIES = [
  // ... existentes
  'BINANCE:BTCUSDT', // nuevo
];
```

2. Agregar el icono correspondiente en `ICON_MAP`:
```typescript
export const ICON_MAP = {
  // ... existentes
  'BINANCE:BTCUSDT': 'URL_DEL_ICONO',
};
```

3. Agregar el color de marca en `COLOR_MAP`:
```typescript
export const COLOR_MAP = {
  // ... existentes
  'BINANCE:BTCUSDT': '#F7931A',
};
```

### Modificar el Intervalo de Actualización

El WebSocket actualiza automáticamente los precios en tiempo real. Si necesitas cambiar el comportamiento de polling REST:

Edita `src/services/cryptoData.ts` y ajusta el intervalo en el componente que lo llama.

## 🔐 Seguridad

### API Keys

⚠️ **IMPORTANTE**: La API key de Finnhub actualmente está hardcodeada en el código. Para producción:

1. Mover la API key a variables de entorno
2. Usar `react-native-config` o similar
3. Nunca commitear API keys en el repositorio

### Ejemplo con variables de entorno:

```typescript
// .env
FINNHUB_API_KEY=tu_api_key_aqui

// constants.ts
import Config from 'react-native-config';
export const FINNHUB_API_KEY = Config.FINNHUB_API_KEY;
```

## 📊 Performance

### Optimizaciones Implementadas

- **Memoización**: Componentes optimizados para evitar re-renders innecesarios
- **WebSocket**: Actualizaciones eficientes en tiempo real sin polling
- **Redux**: Estado centralizado para evitar prop drilling
- **Native Drivers**: Animaciones con native driver cuando es posible

### Métricas a Monitorear

- Tiempo de carga inicial
- Latencia de actualización de precios
- Uso de memoria durante WebSocket activo
- Frame rate durante scroll de la lista

## 🚀 Deployment

### Preparación para Producción

#### iOS

1. Actualizar version y build number en `ios/desingliTest/Info.plist`
2. Configurar signing en Xcode
3. Build para release:
```bash
npx react-native run-ios --configuration Release
```

#### Android

1. Actualizar `versionCode` y `versionName` en `android/app/build.gradle`
2. Generar keystore para signing
3. Build para release:
```bash
cd android
./gradlew assembleRelease
```

El APK estará en: `android/app/build/outputs/apk/release/`