import { Module } from '@nestjs/common';
import { DbRepository } from './db.repository';

@Module({
  imports: [],
  providers: [DbRepository],
  exports: [DbRepository],
})
export class dbModule {}
