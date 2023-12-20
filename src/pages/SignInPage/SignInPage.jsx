import React, { useEffect } from 'react'
import { SignInForm } from '../../components/SignInForm/SignInForm'
import commonStyles from '../../styles/common.module.scss'
import { getUserProfile } from '../../api/getUser'

export const SignInPage = () => {
  // useEffect(() => {
  //   getUserProfile()
  // }, [])

  return (
    <section className={commonStyles.container}>
      <SignInForm />
    </section>
  )
}

