import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      success: true,
      message: 'DMS Platform API is running',
      data: {
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      },
    };
  }
}
