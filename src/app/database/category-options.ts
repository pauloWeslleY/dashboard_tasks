import { type SelectOptionsProps } from '../_components/types/select-options.type';

export enum CATEGORIES {
  ESTUDOS = 'estudos',
  TRABALHOS = 'trabalhos',
  OUTROS = 'outros',
}

export const CATEGORY = {
  ESTUDOS: 'estudos',
  TRABALHOS: 'trabalhos',
  OUTROS: 'outros',
} as const;

export const loadCategoryOptions: SelectOptionsProps[] = [
  { value: CATEGORIES.ESTUDOS, name: 'Estudos' },
  { value: CATEGORIES.TRABALHOS, name: 'Trabalhos' },
  { value: CATEGORIES.OUTROS, name: 'Outros' },
];
