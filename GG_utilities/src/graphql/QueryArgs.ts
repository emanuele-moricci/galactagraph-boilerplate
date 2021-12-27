/**
 * Search Type compliant with the Prisma specs that can be used to query the database
 * using the `skip` and `take` parameters, while adding room for other custom parameters to be added.
 *
 * @tutorial https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting
 *
 * @type {PaginationAndSearchArgs}
 */
export type PaginationAndSearchArgs = {
  skip?: number;
  take?: number;
  [key: string]: any;
};
