import { type SelectOptionsProps } from '../../types/select-options.type';

export const states: SelectOptionsProps[] = [
  { value: 'alabama', name: 'Alabama' },
  { value: 'new-york', name: 'New York' },
  { value: 'san-francisco', name: 'San Francisco' },
  { value: 'los-angeles', name: 'Los Angeles' },
] as const;
