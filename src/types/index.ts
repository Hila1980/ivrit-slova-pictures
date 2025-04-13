
export interface Word {
  id: string;
  hebrew: string;
  hebrewNikud: string;
  russian: string;
  image: string;
  audio: string;
  category: CategoryType;
}

export type CategoryType = 'בית' | 'גוף' | 'בית ספר' | 'צבעים' | 'מספרים' | 'אותיות' | 'משפחה' | 'אוכל' | 'חיות';
