export const ELEMENT_TYPES = {
  HEADING: 'heading',
  TEXT: 'text',
  IMAGE: 'image',
  BUTTON: 'button',
  CONTAINER: 'container',
  LIST: 'list',
  COLUMNS: 'columns',
  MAP: 'map',
  LINK: 'link',
  HEADER: 'header',
  FOOTER: 'footer',
  SECTION: 'section',
  BACKGROUND: 'background'
} as const;

export type ElementType = typeof ELEMENT_TYPES[keyof typeof ELEMENT_TYPES];