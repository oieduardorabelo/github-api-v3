import jsonp from 'jsonp'

class Github {
  constructor(user) {
    this.urlUser = `https://api.github.com/users/${user}`;
    this.urlRepos = `https://api.github.com/users/${user}/repos`;
  }

  loadUserInfo(cb) {
    new Promise((res, rej) => {
      jsonp(this.urlUser, (err, data) => {
        if (err) { return rej(err) }

        res(data.data)
      })
    }).then(cb)

    return this
  }

  loadReposInfo(cb) {
    new Promise((res, rej) => {
      jsonp(this.urlRepos, (err, data) => {
        if (err) { return rej(err) }

        res(data.data)
      })
    }).then(cb)

    return this
  }
}

export default Github
