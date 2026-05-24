export interface MenuItem {
  id: string;
  name: string;
  arabicName: string;
  price: number;
  secondaryPrice?: {
    label: string;
    price: number;
  }[]; // e.g. [{ label: 'Small', price: 5 }, { label: 'Large', price: 10 }] or [{label: 'Normal', price: 10}, {label: 'Special', price: 15}]
  category: MenuCategory;
  description: string;
  arabicDescription: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
}

export type MenuCategory =
  | 'breakfast'
  | 'soups'
  | 'salads'
  | 'appetizers'
  | 'specials'
  | 'grilled'
  | 'sandwiches'
  | 'shawarma'
  | 'pastries'
  | 'plates'
  | 'beverages';

export interface CategoryInfo {
  id: MenuCategory;
  name: string;
  arabicName: string;
  icon: string; // lucide icon name
  description: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedPriceIndex?: number; // if has secondaryPrice options
  specialInstructions?: string;
}

export interface OrderDetails {
  customerName: string;
  customerPhone?: string;
  orderType: 'delivery' | 'pickup' | 'dinein';
  notes?: string;
}
