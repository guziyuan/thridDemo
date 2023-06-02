export default class UTXO {
  constructor(address, value, scriptPubKey) {
    this.address = address;
    this.value = value;
    this.scriptPubKey = scriptPubKey;
  }
}