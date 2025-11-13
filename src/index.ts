import { AppDataSource } from './data-source';

AppDataSource.initialize()
    .then(() => {
        console.log('✅ Conectado a PostgreSQL');
    })
    .catch((err) => {
        console.error('❌ Error de conexión:', err);
    });
