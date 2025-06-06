import express from 'express';
import {
  get_products, get_product, create_product, update_product, delete_product
} from '../controllers/products.js';

const router = express.Router();

router.get('/', get_products);
router.get('/:id', get_product);
router.post('/', create_product);
router.put('/:id', update_product);
router.delete('/:id', delete_product);

export default router;
