/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('roles', {
        id: {
        type: 'bigserial',
        primaryKey: true,
        generated: { always: false, identity: true },
        },
        name: {
        type: 'text',
        notNull: true,
        unique: true,
        },
        created_at: {
        type: 'timestamptz',
        notNull: true,
        default: pgm.func("timezone('utc', now())"),
        },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('roles');
};
