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
    pgm.createTable('prediction_history', {
        id: {
        type: 'bigserial',
        primaryKey: true,
        generated: { always: false, identity: true },
        },
        created_at: {
        type: 'timestamptz',
        notNull: true,
        default: pgm.func("timezone('utc', now())"),
        },

        role: {
        type: 'text',
        notNull: true,
        },
        experience_level: {
        type: 'text',
        notNull: true,
        },
        skills: {
        type: 'jsonb',
        notNull: true,
        default: '[]',
        },
        description: {
        type: 'text',
        },
        country: {
        type: 'text',
        },
        client_rating: {
        type: 'numeric',
        },
        client_review_count: {
        type: 'integer',
        },

        predicted_rate: {
        type: 'numeric',
        notNull: true,
        },
        rate_range: {
        type: 'text',
        },
        confidence: {
        type: 'integer',
        },
        skill_recommendations: {
        type: 'jsonb',
        default: '[]',
        },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('prediction_history');
};
