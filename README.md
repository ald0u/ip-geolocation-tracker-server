# IP Geolocation Tracker - Backend

API REST para geolocalización de direcciones IP.

## Tecnologías

- Node.js
- Express 5
- Prisma ORM
- PostgreSQL
- ipapi.co API

## Instalación

```bash
npm install
```

## Base de Datos

```bash
npx prisma migrate dev
npx prisma generate
```

## Desarrollo

```bash
npm run dev
```

## Producción

```bash
npm run build
npm start
```

## Variables de Entorno

Crear `.env`:
```
DATABASE_URL="postgresql://..."
PORT=5000
```

## Endpoints

- `GET /api/ips` - Listar IPs con paginación y filtros
- `POST /api/ips` - Crear IP desde búsqueda externa
- `DELETE /api/ips/:id` - Eliminar IP
- `GET /api/ips/stats` - Estadísticas (total, por país, por nivel de amenaza)

## Arquitectura

- **Controladores**: Lógica de negocio separada
- **Servicios**: Integración con APIs externas (ipapi.co)
- **Middlewares**: Logging de requests, manejo de errores
- **Validadores**: Validación de IPs y datos
- **Modelos Prisma**: ORM para PostgreSQL

## Características

- Validación de direcciones IP (IPv4/IPv6)
- Integración con ipapi.co para geolocalización
- Paginación y filtros avanzados
- Manejo de errores centralizado
- Logging de requests
- Migraciones de base de datos con Prisma
- Estadísticas en tiempo real