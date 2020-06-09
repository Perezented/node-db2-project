exports.up = function (knex) {
    return knex.schema.createTable("cars", (tbl) => {
        tbl.increments("carID");
        tbl.string("make").notNullable();
        tbl.string("model").notNullable();
        tbl.string("vin", 17).notNullable().unique();
        tbl.integer("mileage").notNullable();
        tbl.string("transmission");
        tbl.string("titleStatus");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("cars");
};
