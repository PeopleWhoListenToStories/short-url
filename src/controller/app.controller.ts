import { BadRequestException, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Inject, Param, Query, Redirect, Res, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AppService } from '../service/app.service';
import { ShortLongMapService } from '../service/short-long-map.service';

@ApiTags('Api')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

    @Inject(ShortLongMapService)
    private shortLongMapService: ShortLongMapService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: '获取短链地址' })
  @ApiResponse({ status: 200, description: '获取短链地址' })
  @Get('/short-url')
  @HttpCode(HttpStatus.OK)
  async generateShortUrl(@Query('url') longUrl) {
    return this.shortLongMapService.generate(longUrl);
  }

  /**
   * @description 通过code重定向到长链url地址
   * @param code 短链code
   * @returns 
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: '通过code重定向到长链url地址' })
  @ApiResponse({ status: 200, description: '通过code重定向到长链url地址' })
  @Get('/:code')
  // @Redirect('https://docs.nestjs.com', 302)
  @HttpCode(HttpStatus.OK)
  async jump(@Param('code') code, @Res() res: Response) {
    const longUrl = await this.shortLongMapService.getLongUrl(code);
    if (!longUrl) {
      throw new BadRequestException('短链不存在');
    }
    // return {
    //   url: longUrl,
    //   code: 302,
    // };
    return res.redirect(`${longUrl}`)
    // return { url: 'https://docs.nestjs.com/v5/' };
  }
}
