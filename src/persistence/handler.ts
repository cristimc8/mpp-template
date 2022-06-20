import { QueryRunner } from "typeorm";

export async function transactionWrapper<T>(
    transaction: () => Promise<T>,
    queryRunner: QueryRunner
): Promise<T> {

  await queryRunner.startTransaction();
  try {
    const entity = await transaction();
    await queryRunner.commitTransaction();
    return entity;
  } catch (e) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
}
