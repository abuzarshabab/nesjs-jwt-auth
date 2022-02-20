import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import {
  PersonDto,
  ProductDto,
  generateBill,
  LoginDto,
} from 'src/dto/person.dto';
import { PersonService } from './person.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth';
import { AuthService } from 'src/auth/service/auth.service';

@Controller()
export class PersonController {
  constructor(
    public personService: PersonService,
    private authService: AuthService,
  ) {}

  @Post('/register')
  async register(@Body() { name, age, email, password }: PersonDto) {
    return await this.personService.register(name, age, email, password);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async authenticateUser(@Body() { email }: LoginDto, @Res() res) {
    // User is valid, generate token
    await this.authService.login(email, res);
    return 'User is authenticated successfully';
  }

  @Post('/product')
  @UseGuards(JwtAuthGuard)
  async product(@Body() { title, productName, price }: ProductDto, @Res() res) {
    try {
      const productInfo = await this.personService.addProduct(
        title,
        productName,
        price,
      );
      console.log(productInfo);
      res.status(200).json({ Message: 'Product Added SuccessFully' });
    } catch (err) {
      console.error(err);
    }
  }
  @Post('/bill')
  async generateBill(@Body() { productName, email }: generateBill, @Res() res) {
    try {
      const personId = await this.personService.findByUserId(email);
      if (!personId) {
        new NotFoundException(`Sorry user Id not found`);
      }
      console.log('userID: ' + personId._id);

      const productId = await this.personService.findProductId(productName);
      if (!productId) {
        new NotFoundException(`Sorry Product Id not found`);
      }

      console.log('productID: ' + productId._id);
      const userId = personId._id;
      const prodId = productId._id;
      const bill = await this.personService.genBill(userId, prodId);
      res.status(200).json(userId, prodId, bill);
    } catch (err) {
      console.error(`This error show from bill route ${err}`);
    }
  }
  /*LogOut route */
  @UseGuards()
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res) {
    // res.clearCookie('jwtCookie');
    console.log(res);
    return {
      message: `Logout Successfully ✔`,
    };
  }
}
