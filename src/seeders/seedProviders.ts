import { faker } from '@faker-js/faker';
import { sequelize, Provider } from '../models/index.js';

async function seedProviders(count = 1000) {
  console.log(`Seeding ${count} fake providers...`);
  await sequelize.authenticate();

  const providers = [];
  for (let i = 0; i < count; i++) {
    // Since the example app is Singapore-centric, I selected coordinates around Singapore
    const lat = 1.3521 + faker.number.float({ min: -0.05, max: 0.05 });
    const lon = 103.8198 + faker.number.float({ min: -0.05, max: 0.05 });

    providers.push({
      name: faker.person.fullName(),
      latitude: lat,
      longitude: lon,
      overAllRating: faker.number.float({ min: 1, max: 5, multipleOf: 0.1 }),
      location: { type: 'Point', coordinates: [lon, lat] }
    });
  }

  try {
    await Provider.bulkCreate(providers);
    console.log(`Successfully seeded ${count} providers`);
  } catch (err) {
    console.error('Error seeding:', err);
  } finally {
    await sequelize.close();
  }
}

const countArg = process.argv[2] ? Number(process.argv[2]) : 1000;
seedProviders(countArg);
