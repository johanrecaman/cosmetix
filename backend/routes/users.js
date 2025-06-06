import { Router } from 'express'
import express from 'express';
import {
  get_users, get_user, create_user, update_user, delete_user
} from '../controllers/users.js';

const router = express.Router();

router.get('/', get_users);
router.get('/:id', get_user);
router.post('/', create_user);
router.put('/:id', update_user);
router.delete('/:id', delete_user);

export default router;

