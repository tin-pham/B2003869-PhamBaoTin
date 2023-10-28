import axios from 'axios';

export default class API {
  // user API
  // create user
  static async register(user) {
    const res = await axios.post('http://localhost:3000/user/register', user);
    return res.data;
  }
  // login
  static async Login(user) {
    const res = await axios.post('http://localhost:3000/user/login', user);
    return res.data;
  }

  // get user info
  static async info(token) {
    const res = await axios.post('http://localhost:3000/user/info', token);
    return res.data;
  }

  static async addProduct(cart) {
    const res = await axios.post(`http://localhost:3000/user/add`, cart);
    return res.data;
  }
  static async deleteProduct(info) {
    const res = await axios.post(`http://localhost:3000/user/delete`, info);
    return res.data;
  }
  static async buyProduct(info) {
    const res = await axios.post(`http://localhost:3000/user/buyProduct`, info);
    return res.data;
  }

  // products api
  static async getProducts(numberPage) {
    const res = await axios.get('http://localhost:3000/api/products', {
      params: numberPage,
    });
    return res.data;
  }

  static async getProduct(id) {
    const res = await axios.get(`http://localhost:3000/api/products/${id}`);
    return res.data;
  }

  static async getQuantity(info) {
    const res = await axios.get(`http://localhost:3000/api/products/Quantity`, {
      params: info,
    });
    return res.data;
  }
}
