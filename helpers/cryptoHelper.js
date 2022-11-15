const CryptoJS = require('crypto-js')
const { PASSWORD_SECRET } = require('../config/index')

exports.hashingPassword = (password) => {
    return CryptoJS.AES.encrypt(password, PASSWORD_SECRET).toString()
}

exports.unHashingPassword = (password) => {
  return CryptoJS.AES.decrypt(password, PASSWORD_SECRET).toString(CryptoJS.enc.Utf8);
}