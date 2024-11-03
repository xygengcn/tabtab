import { prismaClient } from '@/database';
import { TabtabGrids } from '@/database/prisma';
import { Controller, Param, Post } from 'koa-api-plus';

@Controller()
export default class IndexController {
  /**
   * 修改或者创建面板
   * @param content
   * @returns
   */
  @Post('/grid/save')
  public createOrUpdateGrid(@Param.Body() content: TabtabGrids) {
    if (typeof content?.name !== 'string' || content?.name.length < 1) {
      console.error('[grid] save', content);
      return new Error('name is required');
    }
    return prismaClient.tabtabGrids
      .upsert({
        where: {
          id: content.id
        },
        update: {
          ...content,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        create: {
          ...content,
          updatedAt: new Date(),
          createdAt: new Date()
        }
      })
      .catch((e) => {
        console.error('[grid] save', e);
        throw new Error('保存失败', e);
      });
  }
  /**
   * 拉取面板
   * @param content
   * @returns
   */
  @Post('/grid/query/userId')
  public queryGridByUserId(@Param.Body('userId') userId: string) {
    if (typeof userId !== 'string' || !userId) {
      console.error('[grid] query', userId);
      return new Error('userId is required');
    }
    return prismaClient.tabtabGrids
      .findMany({
        where: {
          userId
        }
      })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.error('[grid] query', e);
        return [];
      });
  }

  /**
   * 拉取面板
   * @param content
   * @returns
   */
  @Post('/grid/delete')
  public deleteGrid(@Param.Body('id') id: number) {
    console.log('[grid] delete', id);
    if (typeof id !== 'number' || !id) {
      console.error('[grid] delete', id);
      return new Error('id is required');
    }
    return prismaClient.tabtabGrids
      .delete({ where: { id } })
      .then((result) => {
        console.log('[grid] delete success', result);
        return { result: true };
      })
      .catch((e) => {
        console.error('[grid] delete', e);
        return { result: false };
      });
  }
}
