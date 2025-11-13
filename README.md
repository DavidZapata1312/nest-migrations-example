# NestJS + TypeORM + PostgreSQL — Ejemplo de Migración y Seeders

Este repositorio es un ejemplo educativo para mostrar cómo trabajar con **migraciones** y **seeders** en un proyecto **TypeScript** usando **TypeORM (DataSource API)** con **PostgreSQL**.
Está diseñado para entender el flujo completo: crear tablas mediante migraciones y poblar datos iniciales mediante seeders.

Incluye:

* Una migración que crea la tabla `users`.
* Un seeder que inserta un usuario administrador por defecto.
* Scripts funcionales para ejecutar migraciones y seeders con `ts-node`.

> ⚙️ Este proyecto no es un boilerplate de NestJS completo, sino una base ligera para aprender migraciones/seeders con TypeORM.
> Puedes integrarlo fácilmente en un módulo `DatabaseModule` de NestJS más adelante.

---

## 🧱 Estructura del proyecto

```
nest-migrations-example/
├─ src/
│  ├─ database/
│  │  └─ seeders/
│  │     ├─ UserSeeder.ts
│  │     └─ seed.ts
│  ├─ migrations/
│  │  └─ 1699999999999-CreateUsersTable.ts
│  └─ user/
│     └─ user.entity.ts
├─ src/data-source.ts
├─ package.json
├─ tsconfig.json
├─ .gitignore
└─ README.md
```

---

## 🚀 Requisitos previos

* Node.js ≥ 18
* PostgreSQL instalado y corriendo localmente
* Una base de datos creada manualmente (ej. `nest_migrations_db`)
* npm o yarn
* `npx ts-node` disponible (se instala automáticamente con TypeORM)

---

## ⚙️ Instalación

```bash
# Clona el repositorio
git clone https://github.com/DavidZapata1312/nest-migrations-example.git

cd nest-migrations-example

# Instala las dependencias
npm install
```

Asegúrate de que en tu archivo `src/data-source.ts` tengas tu configuración de Postgres similar a esta:

```ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'tu_contraseña',
  database: 'nest_migrations_db',
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: ['src/migrations/*.ts'],
});

export default AppDataSource;
```

> 💡 La base de datos **debe existir antes de correr las migraciones**.
> Si no existe, créala con:
>
> ```bash
> createdb nest_migrations_db
> ```

---

## 🧰 Scripts disponibles

```json
{
  "scripts": {
    "migration:generate": "npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/migrations/CreateUsersTable -d src/data-source.ts",
    "migration:run": "npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/data-source.ts",
    "migration:revert": "npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:revert -d src/data-source.ts",
    "seed": "npx ts-node src/database/seeders/seed.ts"
  }
}
```

| Script                       | Acción                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------ |
| `npm run migration:generate` | Genera una nueva migración a partir de los cambios detectados en las entidades |
| `npm run migration:run`      | Ejecuta todas las migraciones pendientes en PostgreSQL                         |
| `npm run migration:revert`   | Revierte la última migración aplicada                                          |
| `npm run seed`               | Ejecuta los seeders para poblar datos iniciales                                |

---

## 📜 Paso a paso — Ejemplo práctico de migración y seed

### 1️⃣ Crear la base de datos

Asegúrate de tener PostgreSQL corriendo y crea la base:

```bash
createdb nest_migrations_db
```

### 2️⃣ Ejecutar la migración

Crea la tabla `users` en la base de datos:

```bash
npm run migration:run
```

Si todo va bien, verás algo como:

```
Migration CreateUsersTable1699999999999 has been executed successfully.
```

### 3️⃣ Ejecutar el seeder

Corre el seeder para insertar el usuario administrador:

```bash
npm run seed
```

Deberías ver:

```
✅ Admin user created.
✅ Seeders finished.
```

### 4️⃣ Verificar los datos

Conéctate a tu base:

```bash
psql -d nest_migrations_db
```

Y revisa:

```sql
SELECT * FROM users;
```

---

## 🧠 Diferencias clave: migraciones vs seeders

| Concepto       | Migraciones                                                              | Seeders                                           |
| -------------- | ------------------------------------------------------------------------ | ------------------------------------------------- |
| Propósito      | Cambiar la estructura de la base de datos (crear tablas, columnas, etc.) | Insertar o actualizar datos iniciales o de prueba |
| Cuándo se usan | Cuando cambia el esquema del modelo                                      | Después de ejecutar migraciones                   |
| Ejemplo        | Crear tabla `users`                                                      | Insertar usuario admin                            |
| Método TypeORM | `migration:run`, `migration:revert`                                      | Script custom que usa `Repository.save()`         |

---

## 🆚 Diferencia entre “migrar un proyecto” y “migraciones de base de datos”

| Tipo de migración                        | Qué implica                                                                                                                                                                       |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Migración de proyecto**                | Pasar código o arquitectura de un lenguaje o framework a otro (por ejemplo, migrar de Express a NestJS o de Java a Node). Involucra cambios de código y dependencias.             |
| **Migración de base de datos (TypeORM)** | Son scripts versionados que modifican la estructura del esquema (tablas, relaciones, etc.) en la base de datos. No cambian la lógica del código, solo la estructura de los datos. |

---

## ✅ Buenas prácticas

* Nunca actives `synchronize: true` en producción.
* Mantén migraciones y seeders en carpetas separadas.
* Versiona tus migraciones (no las borres).
* Crea un seeder maestro que ejecute varios seeders en orden.
* Asegúrate de correr migraciones antes de los seeders.

---

## 🧩 Próximos pasos

* Integrar este flujo en un proyecto NestJS real con `TypeOrmModule.forRootAsync()`.
* Crear un `DatabaseModule` que centralice la conexión.
* Añadir `dotenv` para variables de entorno (`.env`).
* Crear nuevos seeders para datos como roles o permisos.

---

## 🥅 Goals (GOS)

| Paso | Objetivo                                                     |
| ---- | ------------------------------------------------------------ |
| 🥇 1 | Crear la base de datos `nest_migrations_db` en PostgreSQL    |
| 🥈 2 | Ejecutar `npm run migration:run` para crear la tabla `users` |
| 🥉 3 | Ejecutar `npm run seed` para insertar el usuario admin       |
| 🏅 4 | Verificar los datos en PostgreSQL con `SELECT * FROM users;` |
| 🏆 5 | Revertir la migración (opcional): `npm run migration:revert` |
