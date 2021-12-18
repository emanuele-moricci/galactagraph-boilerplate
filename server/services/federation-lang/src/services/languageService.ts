import { prismaContext } from '@config/prismaConfig';
import { Language } from '@prisma/client';


/**
 * Function that returns all of the Languages present in the database.
 *
 * @async
 * @function getAllLanguages.
 * @returns {Promise<Language[]>} The Language List.
 */
export const getAllLanguages = async (): Promise<Language[]> => {
  return await prismaContext.prisma.language.findMany();
};


/**
 * Function that returns a Language by its ID.
 *
 * @param {number} languageId The language ID.
 *
 * @async
 * @function getLanguageById.
 * @returns {Promise<Language | null>} The found Language.
 */
export const getLanguageById = async (languageId: number): Promise<Language | null> => {
  return await prismaContext.prisma.language.findUnique({ where: { languageId } });
};

