import type { Request, Response, NextFunction } from 'express';

export function testUserMiddleware() {
  return (req: Request, _res: Response, next: NextFunction) => {
    const header = req.headers['x-test-user'];
    const isTest = header === 'true' || (req as any).user?.isTest === true;
    if (isTest) {
      (req as any).testExtras = {
        providers: [
          {
            id: 'test-provider-1',
            name: 'Test Provider (for testing)',
            latitude: 1.3521,
            longitude: 103.8198,
            overAllRating: 5
          }
        ]
      };
    }
    next();
  };
}
