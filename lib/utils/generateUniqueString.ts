import shortid from 'shortid';

const generateUniqueString = (): string => shortid.generate();

export const mountRootId = `alert-container-${generateUniqueString()}`;

export default generateUniqueString;
