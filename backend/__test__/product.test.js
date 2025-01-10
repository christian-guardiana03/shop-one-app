import request from 'supertest';
import app from '../server.js';

describe('Product Endpoints', () => {
    it('should fetch all products', async () => {
      // Act
      const res = await request(app)
        .get('/api/products')
        .expect(200);

      // Assert
      const response = res.body;

      expect(Array.isArray(response.data)).toBe(true);
      // check every product if it has property name, price and image
      response.data.forEach(product => {
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('image');
      });
    });

    it('should create a new product', async() => {
        const imageUrl = 'https://www.cnet.com/a/img/resize/ef6793231464c98cdb3e5e9ffb780405eb2a8427/hub/2021/10/23/80425069-0d3e-4c67-9085-a66e6177fc60/macbook-pro-2021-cnet-review-12.jpg?auto=webp&fit=crop&height=362&width=644';

        // Arrange
        const newProduct = {
            name: 'Macbook Pro M4',
            price: 2199.99,
            image: imageUrl
        }

        // Act
        const res = await request(app)
            .post('/api/products')
            .send(newProduct)
            .expect(201);
        
        // Assert
        const response = res.body;
        expect(response).toHaveProperty('success');
        expect(response.data.name).toBe(newProduct.name);
        expect(response.data.price).toBe(newProduct.price);
        expect(response.data.image).toBe(newProduct.image);
    });

    it('should update a product', async() => {
      const imageUrl = "https://images.unsplash.com/photo-1736191550786-46a46aa47394?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGlwaG9uZSUyMDE1JTIwcHJvJTIwbWF4fGVufDB8fDB8fHww";

      // Arrage
      const newProduct = {
        name: "Iphone 15 Pro Max",
        price: 1499.99,
        image: imageUrl
      }

      // Act for create response
      const createResponse = await request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(201);

      const productId = createResponse.body.data._id;

      const updatedProduct = {
        name: "Iphone 16 Pro Max",
        price: 1599.99,
        image: imageUrl
      }

      // Act
      const updateResponse = await request(app)
        .put(`/api/products/${productId}`)
        .send(updatedProduct)
        .expect(200);
      
      const updatedResponseData = updateResponse.body.data;

      // Assert
      expect(updatedResponseData.name).toBe(updatedProduct.name);
      expect(updatedResponseData.price).toBe(updatedProduct.price);
      expect(updatedResponseData.image).toBe(updatedProduct.image);
    });

    it('should delete a product', async() => {
      const imageUrl = "https://images.unsplash.com/photo-1736191550786-46a46aa47394?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGlwaG9uZSUyMDE1JTIwcHJvJTIwbWF4fGVufDB8fDB8fHww";

      // Arrage
      const newProduct = {
        name: "Iphone 15 Pro Max",
        price: 1499.99,
        image: imageUrl
      }

      // Act for create response
      const createResponse = await request(app)
        .post('/api/products')
        .send(newProduct)
        .expect(201);

      const productId = createResponse.body.data._id;

      // Act for delete
      const deleteResponse = await request(app)
        .delete(`/api/products/${productId}`)
        .expect(200);
      
      try {
        await request(app)
          .get(`/api/products/${productId}`)
          .expect(500); // Expect 404 Not Found
      } catch (error) {
        expect(error.status).toBe(500); // Assert the error status code
      }
    });
})