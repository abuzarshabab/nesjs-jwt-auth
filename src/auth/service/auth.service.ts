import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DbRepository } from 'src/Database/db.repository';
// import { PersonService } from 'src/Person/person.service';

@Injectable()
export class AuthService {
  constructor(
    private db: DbRepository,
    private readonly jwtService: JwtService, // @Inject(forwardRef(() => PersonService)) // private personService: PersonService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.db.findUserByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, res) {
    const payload = { email };
    const token = this.jwtService.sign(payload) as string;
    res.set({ Authorization: `Bearer ${token}` }).json({ hello: 'world' });
  }
}
