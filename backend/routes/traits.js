import express from 'express';
import {
  get_traits, get_trait, create_trait, update_trait, delete_trait
} from '../controllers/traits.js';

const router = express.Router();

router.get('/', get_traits);
router.get('/:id', get_trait);
router.post('/', create_trait);
router.put('/:id', update_trait);
router.delete('/:id', delete_trait);

export default router;
