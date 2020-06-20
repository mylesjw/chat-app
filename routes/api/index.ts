import express from 'express';
import messageRoutes from './messages';
import userRoutes from './users';
import channelRoutes from  './channels'

const router = express.Router();

router.use('/messages', messageRoutes);
router.use('/users', userRoutes);
router.use('/channels', channelRoutes);

export default router;