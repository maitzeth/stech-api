# Stech API - Cloudflare Workers + Hono + Neon

## Tech Stack
- Drizzle ORM to manage migrations and as a query builder
- Cloudflare Worker (Cheap to run, Blazing fast and great DX)
- Hono.js lightweight fast framework for the edges (great with cloudflare workers)
- Neon.tech to manage serverless postgres

# Requirements
```bash
Nodejs >= 20
```

## Installation
```bash
npm install
```

## Running the app

```bash
npm run dev
```

> Dont forget to rename file called .env.vars.example > .env.vars.


## API Documentation

### Cable Modems

Este documento describe la API REST para la gestión de dispositivos. La API permite crear, consultar, actualizar y eliminar dispositivos del sistema.

## Recursos
La API dispone de los siguientes recursos:

`/cableModem:` Representa el recurso principal de dispositivos.
Métodos HTTP soportados
La API soporta los siguientes métodos HTTP:

- `GET:` Recupera información sobre los dispositivos.
- `POST:` Crea un nuevo dispositivo.
- `PUT:` Actualiza un dispositivo existente.
- `DELETE:` Elimina un dispositivo existente (devuelve código de estado 204 No Content).

## Autenticación:
`N/A`

## Schema

```json
{
  "id": "string" (opcional),
  "name": "string",
  "description": "string",
  "status": "string",
  "validSince": "string (YYYY-MM-DDTHH:mm:ss.sssZ)",
  "tags": ["string", ...]
}
```

- `id:` uuid del dispositivo en la base de datos (opcional)
- `name:` nombre del dispositivo
- `description:` descripcion del dispositivo
- `status:` Estado del dispositivo (ej: "activo", "suspendido", etc).
- `validSince:` Fecha y hora en formato UTC desde la cual el dispositivo es válido (ej: "2024-05-05T21:26:23.758Z")
- `tags:` Arreglo de etiquetas asociadas al dispositivo

## Response Body

### GET
- Codigo de estado:
  - 200: La solicitud se realizo con exito
  - 500: Error en la solicitud

- Estructura
```json
[
  {
    "id": "string (UUID)",
    "name": "string",
    "description": "string",
    "status": "string",
    "validSince": "string (YYYY-MM-DDTHH:mm:ss.sssZ)",
    "tags": ["string", ...]
  },
  ...
]
```

#### Params: ?q="string"
```json
[
  {
    "id": "string (UUID)",
    "name": "string",
    "description": "string",
    "status": "string",
    "validSince": "string (YYYY-MM-DDTHH:mm:ss.sssZ)",
    "tags": ["string", ...]
  },
  ...
]
```

### GET/:id
- Codigo de estado:
  - 200: La solicitud se realizo con exito
  - 404: Not Found
  - 500: Error en la solicitud


#### Response
```json
{
  "id": "string (UUID)",
  "name": "string",
  "description": "string",
  "status": "string",
  "validSince": "string (YYYY-MM-DDTHH:mm:ss.sssZ)",
  "tags": ["string", ...]
}
```


### POST
- Codigo de estado:
  - 201: La solicitud se realizo con exito
  - 400: Bad Request
  - 500: Error en la solicitud

- Estructura

#### Request
```json
{
  "name": "string",
  "description": "string",
  "status": "string",
  "validSince": "string (YYYY-MM-DDTHH:mm:ss.sssZ)",
  "tags": ["string", ...]
}
```

#### Response 

```json
{
  "id": "string (UUID)",
  "name": "string",
  "description": "string",
  "status": "string",
  "validSince": "string (YYYY-MM-DDTHH:mm:ss.sssZ)",
  "tags": ["string", ...]
}
```

### PUT/:id

- Codigo de estado:
  - 200: La solicitud se realizo con exito
  - 400: Bad Request
  - 500: Error en la solicitud

- Estructura

#### Request
```json
{
  "name": "string",
  "description": "string",
  "status": "string",
  "validSince": "string (YYYY-MM-DDTHH:mm:ss.sssZ)",
  "tags": ["string", ...]
}
```

#### Response 

```json
{
  "id": "8d7c86d0-b18e-49e7-90b8-2a8f7200fc44",
  "name": "string",
  "description": "string",
  "status": "string",
  "validSince": "string (YYYY-MM-DDTHH:mm:ss.sssZ)",
}
```

### DELETE

- Codigo de estado:
  - 204: No Content
  - 404: Not found