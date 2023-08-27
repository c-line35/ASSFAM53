const express = require ('express');
const router = express.Router();
const agendaCtrl = require('../controllers/agenda')
const auth = require('../middleware/auth');

router.post("", auth, agendaCtrl.createEvent);
router.get("", agendaCtrl.getAllEvents);
router.get("/:id", auth, agendaCtrl.getOneEvent);
router.put("/:id", auth, agendaCtrl.updateEvent);
router.delete("/:id", auth, agendaCtrl.deleteEvent);

module.exports = router;