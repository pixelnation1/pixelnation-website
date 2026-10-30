export type ShopProduct = { slug: string; name: string; description: string; price: number; images: string[] };
export const products: ShopProduct[] = [
  {
    "slug": "wolverine",
    "name": "Wolverine Deck Box",
    "description": "White, black and yellow with bold claw-mask artwork.",
    "price": 3499,
    "images": [
      "/images/shop/wolverine.png"
    ]
  },
  {
    "slug": "dwarven",
    "name": "Dwarven Deck Box",
    "description": "Red and black dwarven throne artwork with a card-display window.",
    "price": 3499,
    "images": [
      "/images/shop/dwarven.png"
    ]
  },
  {
    "slug": "vault-33",
    "name": "Vault 33 Deck Box",
    "description": "Blue and yellow vault styling with a removable lid and card-display window.",
    "price": 3499,
    "images": [
      "/images/shop/vault-33.png"
    ]
  },
  {
    "slug": "hobbit-home",
    "name": "Hobbit Home Deck Box",
    "description": "A green round door, textured brown base and gold detailing.",
    "price": 3499,
    "images": [
      "/images/shop/hobbit-home.png"
    ]
  },
  {
    "slug": "purple-mage",
    "name": "Purple Mage Deck Box",
    "description": "Black and purple character artwork with a card-display window.",
    "price": 3499,
    "images": [
      "/images/shop/purple-mage.png"
    ]
  },
  {
    "slug": "eye-of-sauron",
    "name": "Eye of Sauron Deck Box",
    "description": "Dark textured panels, fiery orange details and gold trim.",
    "price": 3499,
    "images": [
      "/images/shop/eye-of-sauron.png"
    ]
  },
  {
    "slug": "forest",
    "name": "Forest Deck Box",
    "description": "Sculpted green tree and leaf texture with a card-display window.",
    "price": 3499,
    "images": [
      "/images/shop/forest.png"
    ]
  },
  {
    "slug": "spider-man",
    "name": "Spider-Man Deck Box",
    "description": "Red and black spider artwork, web details and a card-display window.",
    "price": 3499,
    "images": [
      "/images/shop/spider-man.png"
    ]
  },
  {
    "slug": "tolkien-book-stack",
    "name": "Tolkien Book Stack Deck Box",
    "description": "A green and gold book-stack design with detailed spines and cover.",
    "price": 3499,
    "images": [
      "/images/shop/tolkien-book-stack.png",
      "/images/shop/tolkien-book-stack-top.png"
    ]
  }
];
export const formatPrice = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
