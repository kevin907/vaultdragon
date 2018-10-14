
exports.up = function(knex, Promise) {
	return knex.raw(`
		CREATE TABLE objects (
			"key" varchar(10) NOT NULL,
			value text NULL,
			created_at timestamptz NOT NULL DEFAULT NOW(),
			updated_at timestamptz NOT NULL DEFAULT NOW()
		);
		CREATE INDEX keys_key_idx ON objects ("key");
	`)
};

exports.down = function(knex, Promise) {
	return knex.raw(`
		DROP TABLE objects
	`)
};
