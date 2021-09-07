import React from "react"
import { Redirect } from "react-router-dom"
import CenteredLoading from '../generic-components/CenteredLoading'

export default function withAuth(Component) {
  // wraps `Component` with authentication logic to check for token
  // verification before serving it

  return function(props) {

    const [loading, setLoading] = React.useState(true)
    const [redirect, setRedirect] = React.useState(false)

    React.useEffect(() => {
      async function checkToken() {
        const res = await fetch(`/verify-cookie`)
        if (res.status === 200) {
          setLoading(false)
        } else {
          // const error = new Error(res.error)
          // throw error
          setLoading(false)
          setRedirect(true)
        }
      }
      checkToken()
    }, [])

    if (loading) {
      return (
        <CenteredLoading />
      )
    }

    if (redirect) {
      return <Redirect to="/signin" />
    }

    return (
      <Component {...props}/>
    )
  }
}