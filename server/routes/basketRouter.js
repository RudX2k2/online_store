const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/:id', basketController.AddDevice)
router.get('/', basketController.Show)

module.exports = router
