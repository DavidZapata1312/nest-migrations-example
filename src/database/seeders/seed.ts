import { AppDataSource } from '../../data-source';
import { UserSeeder } from './UserSeeder';

async function runSeeders() {
  await AppDataSource.initialize();
  console.log('🌱 Running seeders...');

  try {
    await new UserSeeder().run(AppDataSource);
  } catch (err) {
    console.error(err);
  } finally {
    await AppDataSource.destroy();
    console.log('✅ Seeders finished.');
  }
}

runSeeders();
