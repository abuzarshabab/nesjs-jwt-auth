import { Injectable } from '@nestjs/common';
import { DbRepository } from 'src/Database/db.repositery';

@Injectable()
export class PersonService {
  constructor(private dbRepository: DbRepository) {}

  async register(name: string, age: number, email: string, password: string) {
    let userInfo = await this.dbRepository.addUser(name, age, email, password);
    return userInfo;
  }
  /*this funcion return User's Id */
  async findUserId(email: string) {
    let userId = await this.dbRepository.findUserId(email);
    return userId;
  }
  /*This function add product into DB */
  async addProduct(title: string, productName: string, price: number) {
    let productInfo = await this.dbRepository.addProduct(
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
    let bill = this.dbRepository.genrateBill(userId, prodId);
    return bill;
  }
}
