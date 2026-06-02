const { createClient } = require('@supabase/supabase-js');
const pool = require('../../db/pool');

let database;

if (process.env.DATABASE_MODE === 'local') {
  console.log('[Database Mode] Menggunakan PostgreSQL Lokal');

  database = {
    from(tableName) {
      return {
        async select(columns = '*') {
          try {
            const queryColumns = columns === '*' ? '*' : columns;
            const queryText = `SELECT ${queryColumns} FROM "${tableName}"`;
            
            const { rows } = await pool.query(queryText);
            return { data: rows, error: null };
          } catch (err) {
            console.error(`[Adapter Error] Gagal melakukan SELECT pada tabel ${tableName}:`, err.message);
            return { data: null, error: err };
          }
        },

        insert(values) {
          const isArray = Array.isArray(values);
          const records = isArray ? values : [values];

          const executeInsert = async () => {
            if (records.length === 0) return { data: [], error: null };

            const keys = Object.keys(records[0]);
            const columns = keys.map(k => `"${k}"`).join(', ');

            let paramIndex = 1;
            const valuePlaceholders = [];
            const queryValues = [];

            for (const record of records) {
              const placeholders = [];
              for (const key of keys) {
                placeholders.push(`$${paramIndex++}`);
                let val = record[key];

                if (val !== null && typeof val === 'object' && !(val instanceof Date)) {
                  val = JSON.stringify(val);
                }
                queryValues.push(val);
              }
              valuePlaceholders.push(`(${placeholders.join(', ')})`);
            }

            const queryText = `INSERT INTO "${tableName}" (${columns}) VALUES ${valuePlaceholders.join(', ')} RETURNING *`;
            const { rows } = await pool.query(queryText, queryValues);
            return { data: rows, error: null };
          };

          const promise = (async () => {
            try {
              return await executeInsert();
            } catch (err) {
              console.error(`[Adapter Error] Gagal melakukan INSERT pada tabel ${tableName}:`, err.message);
              return { data: null, error: err };
            }
          })();

          promise.select = function () {
            return promise;
          };

          return promise;
        }
      };
    }
  };
} else {
  console.log('[Database Mode] Menggunakan Supabase Cloud');
  database = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
}

module.exports = database;
