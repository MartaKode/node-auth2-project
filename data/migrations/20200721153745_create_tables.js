
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
      tbl.increments()

      tbl.string('username', 128).unique().notNullable().index()
      tbl.string('password').notNullable()

      tbl.string('department', 128).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
