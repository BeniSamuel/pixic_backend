import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Booking } from './entities/booking.entity';
import { Message } from './entities/message.entity';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { NotificationModule } from './notification/notification.module';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "*BeNi@IsH1!SaMuEl!!^&HiRwa*%#4"
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432, 
      username: 'postgres',
      password: 'beni@ish',
      database: 'pixic',
      entities: [User, Message, Booking, Notification, History],
      synchronize: true, // Set to false in production
      logging: true,
    }),
    // Other import modules can be added here
    UserModule,
    AuthModule,
    BookingModule,
    NotificationModule,
    HistoryModule
  ]
})
export class AppModule {}
