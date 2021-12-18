import {
  getAllLanguages,
  getLanguageById,
} from '@src/services/languageService';

describe('languageService tests', () => {
  it('should return every language', async () => {
    const languages = await getAllLanguages();
    expect(languages).toBeDefined();
    expect(languages.length).toBeGreaterThan(0);
  });

  it('should return the first language in the database', async () => {
    const languageId = 1;

    const language = await getLanguageById(languageId);
    expect(language).toBeDefined();
    expect(language.languageId).toEqual(languageId);
  });
});
