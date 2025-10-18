import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import fetch from 'node-fetch';
import { faker } from '@faker-js/faker';
import app from '../src/index';
import { sequelize } from '../src/models';

let server: any;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const providerCount = 10;
  for (let i = 0; i < providerCount; i++) {
    const latitude = 1.3 + Math.random() * 0.1;
    const longitude = 103.8 + Math.random() * 0.1;
    const name = faker.company.name();
    const rating = faker.number.float({ min: 1, max: 5, multipleOf: 0.1 });

    await sequelize.query(
      "INSERT INTO providers (name, latitude, longitude, location, overAllRating) VALUES (?, ?, ?, ST_GeomFromText(?), ?)",
      {
        replacements: [
          name,
          latitude,
          longitude,
          `POINT(${longitude} ${latitude})`,
          rating
        ]
      }
    );
  }

  server = app.listen(4001);
});

afterAll(async () => {
  server.close();
  await sequelize.close();
});

it('returns nearby providers', async () => {
  const res = await fetch('http://localhost:4001/providers/nearby', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      latitude: 1.3521,
      longitude: 103.8198,
      limit: 5,
      distance: 10,
      sortby: 'distance'
    })
  });

  const json = (await res.json()) as any;

  expect(Array.isArray(json.data)).toBeTruthy();
  expect(json.data.length).toBeGreaterThanOrEqual(1);
  expect(json.data[0]).toHaveProperty('name');
  expect(json.data[0]).toHaveProperty('distance_km');
});
