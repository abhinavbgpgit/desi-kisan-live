import animalCare from '../assets/category/animal_care.png';
import animalFeed from '../assets/category/animal_feed.png';
import bioPesticide from '../assets/category/bio_pestiside.png';
import desiSeeds from '../assets/category/desi_seeds.png';
import fertilizer from '../assets/category/fertilizer.png';
import irrigation from '../assets/category/Irrigation_Items.png';
import plants from '../assets/category/Plants_&_Saplings.png';
import storage from '../assets/category/Storage_&_Packaging.png';
import tools from '../assets/category/Tools_&_Machinery.png';

export const categories = [
  {
    id: 1,
    name: 'Desi Seeds',
    image: desiSeeds,
    route: '/category/desi-seeds'
  },
  {
    id: 2,
    name: 'Bio Pesticide',
    image: bioPesticide,
    route: '/category/bio-pesticide'
  },
  {
    id: 3,
    name: 'Fertilizer',
    image: fertilizer,
    route: '/category/fertilizer'
  },
  {
    id: 4,
    name: 'Animal Feed',
    image: animalFeed,
    route: '/category/animal-feed'
  },
  {
    id: 5,
    name: 'Animal Care',
    image: animalCare,
    route: '/category/animal-care'
  },
  {
    id: 6,
    name: 'Plants & Saplings',
    image: plants,
    route: '/category/plants-saplings'
  },
  {
    id: 7,
    name: 'Irrigation Items',
    image: irrigation,
    route: '/category/irrigation'
  },
  {
    id: 8,
    name: 'Tools & Machinery',
    image: tools,
    route: '/category/tools-machinery'
  },
  {
    id: 9,
    name: 'Storage & Packaging',
    image: storage,
    route: '/category/storage-packaging'
  }
];