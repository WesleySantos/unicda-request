const setRegister = async user => {
  return await fetch(`https://unicdarequests.herokuapp.com/api/auth/signUp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }).then( res => res.json())
}

const setLogin = async user => {

  return await fetch(`https://unicdarequests.herokuapp.com/api/auth/signIn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  .then(res => res.json())
}

const logout = () => {
  localStorage.removeItem('user')
}

export {
  setRegister,
  setLogin,
  logout,
}