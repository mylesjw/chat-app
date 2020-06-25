import express from 'express';
import Channel from '../../models/Channel';
const router = express.Router();

router.get('/', (req, res) => {
  Channel.find().then(data =>  res.json(data));
});

router.post('/', (req, res) => {
  new Channel({
    name: req.body.name
  }).save().then(() => {
      res.status(200)
    })
})


export default router;