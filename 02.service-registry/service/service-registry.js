class ServiceRegistry {
  constructor() {
    this.services = {};
    this.timeout = 30;
  }

  get(name) {
    this.cleanup();

    const serviceList = Object.values(this.services).filter(
      service => service.name === name,
    );

    return serviceList[Math.floor(Math.random() * serviceList.length)];
  }

  register(name, ip, port) {
    this.cleanup();

    const key = name + ip + port;

    if (!this.services[key]) {
      this.services[key] = {};
      this.services[key].timestamp = Math.floor(new Date() / 1000);
      this.services[key].ip = ip;
      this.services[key].port = port;
      this.services[key].name = name;

      console.log(`Added service ${name} at ${ip}:${port}`);
      return key;
    }

    this.services[key].timestamp = Math.floor(new Date() / 1000);

    console.log(`Updated service ${name} at ${ip}:${port}`);

    return key;
  }

  unregister(name, ip, port) {
    const key = name + ip + port;

    delete this.services[key];

    console.log(`Unregistered service ${name} at ${ip}:${port}`);

    return key;
  }

  cleanup() {
    const now = Math.floor(new Date() / 1000);

    Object.keys(this.services).forEach(key => {
      if (this.services[key].timestamp + this.timeout < now) {
        delete this.services[key];

        console.log(`Removed service ${key}`);
      }
    });
  }
}

module.exports = ServiceRegistry;
