const fs = require('fs');

const dbFile = 'subjects.json'

class ProductsService {
    getProducts() {
        return new Promise((res, rej) => {
            fs.readFile(dbFile, (err, data) => {
                if (err) {
                    return res(false);
                }
                return res(JSON.parse(data));
            });
        });
    }

    createProduct(data) {
        return new Promise((res, rej) => {
            fs.writeFile(
                dbFile,
                JSON.stringify(data),
                (err, response) => {
                    if (err) return res(false);

                    return res({
                        message: 'Product created.',
                    });
                }
            );
        });
    }

    deleteProduct(data) {
        return new Promise((res, rej) => {
            fs.writeFile(
                dbFile,
                JSON.stringify(data),
                (err, response) => {
                    if (err) return res(false);

                    return res({
                        message: 'Product deleted.',
                    });
                }
            );
        });
    }
}

module.exports = new ProductsService();