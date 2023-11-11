import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {

  private readonly logger = new Logger(HttpLoggingInterceptor.name);

  // HTTP request interceptor for debugging purposes
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, params, query, body } = req;

    this.logger.verbose({
      originalUrl,
      method,
      params,
      query,
      body,
    });

    return next.handle().pipe(tap(data => this.logger.verbose({ statusCode, data })));
  }
}
