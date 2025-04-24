const { faker } = require('@faker-js/faker');

function createRandomItem(categories, types) {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    type: types[Math.floor(Math.random() * types.length)].name,
    category: categories[Math.floor(Math.random() * categories.length)].name,
    price: faker.commerce.price(),
    imageUrl: faker.image.urlPicsumPhotos({ width: 100, height: 100 }),
    description: faker.commerce.productDescription(),
    status: faker.datatype.boolean() ? 'active' : 'delete',
  }
}

function createRandomCategory() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productAdjective(),
  }
}

function createRandomType() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.department(),
  }
}

function main() {
  let database = {
    items: [],
    categories: [],
    types: [],
  };

  //generate categories
  let existedCategories = [];
  while (database.categories.length < 20) {
    const category = createRandomCategory();
    if (!existedCategories.includes(category.name)) {
      database.categories.push(category);
      existedCategories.push(category.name);
    }
  }

  //generate types
  let existedType = [];
  while (database.types.length < 20) {
    const type = createRandomType();
    if (!existedType.includes(type.name)) {
      database.types.push(type);
      existedType.push(type.name);
    }
  }

  //generate items
  for (let i = 1; i <= 100; i++) {
    database.items.push(createRandomItem(database.categories, database.types))
  }


  console.log(JSON.stringify(database));

}

main();

