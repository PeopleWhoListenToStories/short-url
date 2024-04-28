import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EntityManager } from 'typeorm';

import { generateRandomStr } from '../utils/tool';
import { UniqueCode } from '../entities/unique-code';

@Injectable()
export class UniqueCodeService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,

  ) {}

  /**
   * @description 生产随机code
   * @returns
   */
  // @Cron(CronExpression.EVERY_5_SECONDS)
  async generateCode() {
    let str = generateRandomStr(6);

    const uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
      code: str,
    });

    if (!uniqueCode) {
      const code = new UniqueCode();
      code.code = str;
      code.status = 0;

      return await this.entityManager.insert(UniqueCode, code);
    } else {
      return this.generateCode();
    }
  }

  /**
   * @description 每日1点生成20个code
   */
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async batchGenerateCode() {
    for (let i = 0; i < 20; i++) {
      this.generateCode();
    }
  }
}
