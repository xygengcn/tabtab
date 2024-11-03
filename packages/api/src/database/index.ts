import { Prisma, PrismaClient } from './prisma';

const prismaClient = new PrismaClient();

prismaClient.$use(async (params, next) => {
  const start = new Date().getTime();
  try {
    const result = await next(params);
    return result;
  } catch (error: any) {
    // 错误日志记录
    console.error('[prisma] error', {
      params,
      time: new Date().getTime() - start,
      error
    });
  }
});

export { prismaClient, Prisma };
