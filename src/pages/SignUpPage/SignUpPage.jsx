import React from 'react'
import { SignUpForm } from '../../components/SignUpForm/SignUpForm'
import commonStyles from '../../styles/common.module.scss'

export const SignUpPage = () => {
  return (
    <section className={commonStyles.container}>
      <SignUpForm />
    </section>
  )
}
