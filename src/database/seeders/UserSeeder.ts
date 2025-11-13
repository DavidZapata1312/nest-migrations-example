import { DataSource } from 'typeorm';
import { User } from '../../user/user.entity';
import * as bcrypt from 'bcrypt';

export class UserSeeder {
    public async run(dataSource: DataSource): Promise<void> {
        const repo = dataSource.getRepository(User);

        // Verificar si ya existe el usuario admin
        const exists = await repo.findOne({ where: { email: 'admin@example.com' } });

        if (!exists) {
            // Encriptar la contraseña antes de guardar
            const hashedPassword = await bcrypt.hash('changeme', 10);

            const user = repo.create({
                name: 'Admin',
                email: 'admin@example.com',
                password: hashedPassword,
            });

            await repo.save(user);
            console.log('✅ Admin user created.');
        } else {
            console.log('ℹ️ Admin user already exists.');
        }
    }
}
