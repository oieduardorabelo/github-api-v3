'use strict'

export default (user) => {
  var $body = document.body
  $body.innerHTML = `<img src="${user.avatar_url}">`
}
