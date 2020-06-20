import express from 'express';
import Message from "../../models/Message";

const router = express.Router();

router.get('/', (req, res) => {
  Message.find().then((data) => res.json(data));
})

router.post('/', (req, res) => {
  console.log(req.body)
  const { contents, date, userId, channelId } = req.body;
  new Message({
    contents,
    date,
    userId,
    channelId
  }).save()
    .then(() => res.status(200));

});

router.get('/:id', (req, res) => {
  Message.find({channelId: req.params.id})
          .then(data => res.json(data))
  console.log(req.params.id)
})

export default router;