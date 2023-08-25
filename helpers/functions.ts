import { faker, fakerPT_BR } from '@faker-js/faker';
import fakerBr from 'faker-br';

export type DocumentType = 'CPF' | 'CNPJ';

export async function createRandomPassword(length: number) {
  return faker.string.alphanumeric({ length: length - 2 }) + '1!';
}

export async function createFakeEmail(prefix: string) {
  const dateNow = Date.now().toString();
  const suffix = dateNow.substring(dateNow.length - 5);
  const email = prefix + suffix + '@eduzz.com';
  return email;
}

export async function createDocument(typeOfDocument: DocumentType) {
  if (typeOfDocument === 'CPF') {
    const document = await fakerBr.br.cpf();
    return document;
  }

  if (typeOfDocument === 'CNPJ') {
    const document = await fakerBr.br.cnpj();
    return document;
  }

  throw new Error('Must be CPF or CNPJ only');
}

export async function createFakeName() {
  const fakeName = fakerPT_BR.person.fullName({ lastName: 'Sbrubles' });
  return fakeName;
}
