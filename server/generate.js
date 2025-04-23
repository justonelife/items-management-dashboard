const { faker } = require('@faker-js/faker');

function createRandomItem() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    type: faker.commerce.department(),
    category: faker.commerce.productAdjective(),
    price: faker.commerce.price(),
    imageUrl: faker.image.urlLoremFlickr(),
    description: faker.commerce.productDescription(),
  }
}



let database = { items: [] };
for (let i = 1; i <= 100; i++) {
  database.items.push(createRandomItem())
}
console.log(JSON.stringify(database));

