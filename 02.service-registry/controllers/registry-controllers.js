const { HttpCodes } = require('../helpers/constants');

class RegistryControllers {
  constructor(registry) {
    this.registry = registry;
  }

  find(req, res) {
    const { servicename } = req.params;

    const service = this.registry.get(servicename);

    if (!service)
      return res
        .status(HttpCodes.NOT_FOUND)
        .json({ result: 'Service not found' });

    return res.json(service);
  }

  register(req, res) {
    const { servicename, serviceport } = req.params;

    const serviceip = req.socket.remoteAddress.includes('::')
      ? `[${req.socket.remoteAddress}]`
      : req.socket.remoteAddress;

    const serviceKey = this.registry.register(
      servicename,
      serviceip,
      serviceport,
    );

    return res.json({ result: serviceKey });
  }

  unregister(req, res) {
    const { servicename, serviceport } = req.params;

    const serviceip = req.socket.remoteAddress.includes('::')
      ? `[${req.socket.remoteAddress}]`
      : req.socket.remoteAddress;

    const serviceKey = this.registry.unregister(
      servicename,
      serviceip,
      serviceport,
    );

    return res.json({ result: `Deleted ${serviceKey}` });
  }
}

module.exports = RegistryControllers;
