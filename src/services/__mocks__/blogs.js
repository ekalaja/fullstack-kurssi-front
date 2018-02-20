let token = null

const blogs = [
  {
    id: "5a797504a280d37113c0aa43",
    user: {
      _id: "5a79688827f1fb6dd26e5cc6",
      username: "jeppe",
      name: "jesse jessinen"
    },
    likes: 65,
    title: "blokiTokeninKera",
    author: "blokkeri",
    url: "osjfiosjdfos.fi"
  },
  {
    id: "5a797597b1ce3e71405c009d",
    user: {
      _id: "5a79688827f1fb6dd26e5cc6",
      username: "jeppe",
      name: "jesse jessinen"
    },
    likes: 36,
    title: "blokiTokeninKera2",
    author: "blokkeri",
    url: "osjfiosjdfos.fi"
  },
  {
    id: "5a79a09a7d1fe275d975d70f",
    user: {
      _id: "5a799f5c7d1fe275d975d70d",
      username: "ukko",
      name: "Ukko Nooa"
    },
    likes: 40,
    title: "tarina2",
    author: "hurjaBlokittaja",
    url: "joisdjofjsdofjj.com"
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs: blogs }
