const faker = require('faker');
const fs = require('fs');

// ngôn ngữ tiếng việt
faker.locale = 'vi';

const randomCategoryList = (n) => {
  if (n <= 0) return [];

  const categoryList = [];

  // tạo mảng mới qua n lần mảng chạy vòng lặp và push
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];

  const productList = [];

  // random data
  // ứng vơi từng category cho product, ứng từng n lần product => 2 loop
  for (const category of categoryList) {
    // ứng từng n lần product
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        categoryId: category.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        color: faker.commerce.color(),
        image: faker.image.imageUrl(400, 400),
        description: faker.commerce.productDescription(),
        price: Number.parseFloat(faker.commerce.price()),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      productList.push(product);
    });
  }

  return productList;
};

// IFFE
(() => {
  // random data
  const categoryList = randomCategoryList(5);
  const productList = randomProductList(categoryList, 12); // =60sp

  // chuẩn bị db obj
  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: 'Tinh',
    },
  };
  // viết db obj thành db.json
  fs.writeFile('db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully 😊');
  });
})();
