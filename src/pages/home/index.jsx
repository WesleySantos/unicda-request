import React, { useState, useEffect } from 'react'
import { Dash } from '../../layout';
import { StudentHome } from './student';
import { OfficerHome } from './officer';
import debounceRender from 'react-debounce-render'

const Page = () => {
  const [currentUser, updateCurrentUser] = useState({})
  const [isSubscribed, updateIsSubscribed] = useState(false)

  useEffect(() => {
    if( !isSubscribed && JSON.parse(localStorage.getItem('user')) ) {
      updateCurrentUser(JSON.parse(localStorage.getItem('user')).creds.user)
    }

    return () => (updateIsSubscribed(true))
  }, [])

  return(
    <Dash>
      { currentUser.roles && currentUser.roles.findIndex( role => role.name === 'STUDENT') !== -1
        ? <StudentHome />
        : <OfficerHome />
      }
    </Dash>
  )
}

const Home = debounceRender(Page, 100, { leading: false })

export default Home
