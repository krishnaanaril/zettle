import { SubCategory } from './sub-category';
export interface Category {
    name: string;
    subCategories: Array<SubCategory>;
}
