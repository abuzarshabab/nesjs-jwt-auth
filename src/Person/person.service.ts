import { Injectable } from '@nestjs/common';
import { DbRepository } from 'src/Database/db.repository';

@Injectable()
export class PersonService {
  constructor(private dbRepository: DbRepository) {}

  async register(name: string, age: number, email: string, password: string) {
    const userInfo = await this.dbRepository.addUser(
      name,
      age,
      email,
      password,
    );
    return userInfo;
  }
  /*this funcion return User's Id */
  async findByUserId(email: string) {
    const userId = await this.dbRepository.findUserByEmail(email);
    return userId;
  }
  /*This function add product into DB */
  async addProduct(title: string, productName: string, price: number) {
    const productInfo = await this.dbRepository.addProduct(
      title,
      productName,
      price,
    );
    return productInfo;
  }
  /*this funcion is use to find product id */
  async findProductId(productName: string) {
    return await this.dbRepository.findProductId(productName);
  }
  /*Here i store person ID and Product ID Inside the generateBill*/

  async genBill(userId, prodId) {
    const bill = this.dbRepository.genrateBill(userId, prodId);
    return bill;
  }
  // for Cookies
  // generateCookie(cookieName,token){
  //   return cookie(cookieName,token,{ httpOnly: true })
  // }
}
