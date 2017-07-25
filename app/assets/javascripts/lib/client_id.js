const uuidv4 = require("uuid/v4")

const storage_key = "client_id"

module.exports = class ClientId {
  constructor() {
    this.id = this.load() || this.generate_and_store()
  }

  load() {
    return localStorage.getItem(storage_key)
  }

  generate_and_store() {
    return this.store(this.generate())
  }

  store(client_id) {
    try {
      localStorage.setItem(storage_key, client_id)
    }
    finally {
      return client_id
    }
  }

  generate() {
    return uuidv4()
  }
}
