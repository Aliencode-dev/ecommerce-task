"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Sample Product",
          description: "This is a sample product.",
          price: 19.99,
          imageURL: "http://example.com/image.jpg",
          createdBy: 1, // This should correspond to an existing user ID
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
