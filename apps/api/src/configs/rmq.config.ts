import { ConfigService } from '@nestjs/config';
import { IRMQServiceOptions } from 'nestjs-rmq';

export const getRMQConfig = (
  configService: ConfigService,
): IRMQServiceOptions => ({
  exchangeName: configService.get('AMQP_EXCHANGE') || 'fanout',
  connections: [
    {
      login: configService.get('AMQP_USER') || 'admin',
      password: configService.get('AMQP_PASSWORD') || 'admin',
      host: configService.get('AMQP_HOSTNAME') || 'hostname',
    },
  ],
  serviceName: 'api',
});
