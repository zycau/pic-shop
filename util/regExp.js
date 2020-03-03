const emailReg = /^(([^<>()\[\]\\. ,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const nameReg = /^[a-zA-Z0-9]{3,}$/
const passwordReg = /^.{6,12}$/

module.exports = {emailReg, nameReg, passwordReg}