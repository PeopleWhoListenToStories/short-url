import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
// import { ServeStaticModule } from '@nestjs/serve-static'
import { AppController } from '../controller/app.controller'
// import { SocketModule } from './socket/socket.module'
import { AppService } from '../service/app.service';

// 配置文件
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { file: envFilePath, config: envConfig } = require('../../config/env')

import { UniqueCode } from '../entities/unique-code'
import { ShortLongMap } from '../entities/short-long-map'
import { UniqueCodeService } from '../service/unique-code.service';
import { ShortLongMapService } from '../service/short-long-map.service';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: path.join(__dirname, '../', 'client/dist'),
    // }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envFilePath] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [UniqueCode, ShortLongMap],
        host: configService.get('DB_HOST', envConfig.DB_HOST),
        port: configService.get<number>('DB_PORT', envConfig.DB_PORT),
        username: configService.get('DB_USER', envConfig.DB_USER),
        password: configService.get('DB_PASSWD', envConfig.DB_PASSWD),
        database: configService.get('DB_DATABASE', envConfig.DB_DATABASE),
        charset: 'utf8mb4',
        timezone: '+08:00',
        // migrationsRun: true,
        synchronize: true,
      }),
    })
  ],
  controllers: [AppController],
  providers: [AppService, UniqueCodeService, ShortLongMapService],
})
export class AppModule {}
