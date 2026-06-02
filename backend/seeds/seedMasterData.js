const pool = require('../db/pool');

const {
  FALLBACK_ROLES,
  FALLBACK_SKILLS,
} = require('../src/data/constants');

const seedMasterData = async () => {
  try {
    await pool.query(
      `
      INSERT INTO roles (name)
      SELECT UNNEST($1::text[])
      ON CONFLICT (name) DO NOTHING
      `,
      [FALLBACK_ROLES]
    );

    await pool.query(
      `
      INSERT INTO skills (name)
      SELECT UNNEST($1::text[])
      ON CONFLICT (name) DO NOTHING
      `,
      [FALLBACK_SKILLS]
    );

    console.log('Master data seeded successfully');
  } catch (error) {
    console.error('Failed to seed master data:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

seedMasterData();