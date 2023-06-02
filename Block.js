import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数

  constructor(MyChain,previousHash,height,hash) {
    this.MyChain=MyChain
    this.previousHash=previousHash
    this.height=height
    this.nonce=""
    this.hash=hash
  }

  isValid() {
    let cnt=0;
    for(let i of this.nonce){
      if(i!="0")break;
      cnt++;
    }
    return cnt>=DIFFICULTY
  
  }

  setNonce(nonce) {
    this.nonce=nonce
  }
  mine(difficulty){
    while(true){
        this.hash = this.computeHash()
        if(this.hash.substring(0, difficulty) !== this.getAnswer(difficulty)){
            this.nonce++
        }else{
            break
        }
    }
}

getAnswer(difficulty){
    // 开头前n位为0的hash
    let answer = ''
    while(difficulty-- !== 0){
        answer += '0'
    }
    return answer
}
  
}
export default Block
const SHA256 = require('crypto-js/sha256');
function CalculateHash(index, previousHash, timestap, data){
  return SHA256(index + previousHash + timestap + data).toString();
}
