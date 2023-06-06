class BasketController{
    async Show(req, res)
    {
        let {userId, deviceId} = req.query
        let devices;

        const basketDevicePair = await BasketDevice.findAndCountAll(
            {
                where: {userId, deviceId}
            }
        )

        const device = await Device.findAndCountAll(
            {
                where: {deviceId}, 
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )

        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async AddDevice(req, res)
    {
        const {deviceId} = req.params
        try {
            let {basketId} = req.body

            const basketDevice = await BasketDevice.create({deviceId, basketId});


            return res.json(basketDevice)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController()