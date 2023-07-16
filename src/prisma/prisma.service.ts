import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { environmentVariables } from '../config/env.variables';

@Injectable({})
export class PrismaService extends PrismaClient {
  constructor() {
    const config = {
      datasources: {
        db: { url: environmentVariables.dbUrl },
      },
    };
    super(config);
  }

  cleanDb() {
    return this.$transaction([this.bookmark.deleteMany(), this.user.deleteMany()]);
  }
}
