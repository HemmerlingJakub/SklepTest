import { Product } from '../models/product.model';

export const productCatalog: Product[] = [
  {
    id: 1,
    name: 'Mechanical Keyboard',
    description: 'RGB keyboard with red switches',
    longDescription: 'A mechanical keyboard with red switches and RGB lighting. A practical choice for everyday typing and gaming.',
    price: 299.99,
    imageUrl: '/images/keyboard.png',
    tags: ['electronics', 'gaming'],
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Gaming Mouse',
    description: '16000 DPI optical mouse',
    longDescription: 'An optical gaming mouse with sensitivity up to 16000 DPI. Adjust the sensitivity to suit your preferred way of playing.',
    price: 159.99,
    imageUrl: '/images/Mouse.png',
    tags: ['electronics', 'gaming'],
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'Headphones',
    description: 'Wireless headphones',
    longDescription: 'Wireless headphones designed for listening at your desk or on the go. Enjoy your audio without being tied to your device by a cable.',
    price: 249.99,
    imageUrl: '/images/Headphones.png',
    tags: ['electronics', 'audio'],
    category: 'Electronics'
  },
  {
    id: 4,
    name: 'Webcam',
    description: '1080p webcam with built-in microphone',
    longDescription: 'A 1080p webcam with a built-in microphone for video calls, online meetings, and streaming.',
    price: 99.99,
    imageUrl: '/images/Webcam.png',
    tags: ['electronics', 'video'],
    category: 'Electronics'
  },
  {
    id: 5,
    name: 'Monitor',
    description: '27-inch 4K monitor',
    longDescription: 'A 27-inch monitor with 4K resolution, offering a detailed display for work, entertainment, and gaming.',
    price: 499.99,
    imageUrl: '/images/Monitor.png',
    tags: ['electronics', 'display'],
    category: 'Electronics'
  },
  {
    id: 6,
    name: 'Laptop Stand',
    description: 'Adjustable laptop stand',
    longDescription: 'An adjustable stand that raises your laptop to a more convenient viewing position and helps organize your desk.',
    price: 49.99,
    imageUrl: '/images/LaptopStand.png',
    tags: ['electronics', 'accessories'],
    category: 'Electronics'
  },
  {
    id: 7,
    name: 'External Hard Drive',
    description: '2TB external hard drive',
    longDescription: 'An external 2TB hard drive for storing and backing up your files, photos, and other data.',
    price: 89.99,
    imageUrl: '/images/ExternalHardDrive.png',
    tags: ['electronics', 'storage'],
    category: 'Electronics'
  },
  {
    id: 8,
    name: 'USB Hub',
    description: '7-port USB hub',
    longDescription: 'A seven-port USB hub that lets you connect multiple compatible devices to your computer from one place.',
    price: 29.99,
    imageUrl: '/images/ExternalHub.png',
    tags: ['electronics', 'accessories'],
    category: 'Electronics'
  }
];