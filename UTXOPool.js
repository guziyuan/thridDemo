import UTXO from './UTXO.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos = utxos;
  }

  addUTXO(publicKey, amount) {
    const utxo = new UTXO(publicKey, amount);
    this.utxos[utxo.id] = utxo;
  }

  clone() {
    return new UTXOPool({...this.utxos});}

  // 处理交易函数
  handleTransaction() {
    const spentOutputs = [];

    // 验证交易输入是否合法
    for (const input of tx.inputs) {
      const utxo = this.utxos[input.id];
      if (!utxo || utxo.publicKey !== input.publicKey || utxo.amount < input.amount) {
        return false;
      }
      spentOutputs.push(input.id);
    }

    // 处理交易输出
    for (const output of tx.outputs) {
      this.addUTXO(output.publicKey, output.amount);
    }

    // 从UTXO池中移除已经花费的output
    for (const id of spentOutputs) {
      delete this.utxos[id];
    }

    return true;
  }

  isValidTransaction() {  let inputSum = 0;
    let outputSum = 0;

    // 计算交易输入和输出的总金额
    for (const input of tx.inputs) {
      const utxo = this.utxos[input.id];
      if (!utxo || utxo.publicKey !== input.publicKey || utxo.amount < input.amount) {
        return false;
      }
      inputSum += input.amount;
    }

    for (const output of tx.outputs) {
      outputSum += output.amount;
    }

    // 验证余额是否正确
    return inputSum >= outputSum;
  }
}

export default UTXOPool

