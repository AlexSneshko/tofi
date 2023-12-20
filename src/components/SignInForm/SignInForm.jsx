import React, { useEffect } from 'react'
import styles from './SignInForm.module.scss'
import { Button } from '../ui/Button/Button'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { supabaseClient } from '../../config/supabase';

export const SignInForm = () =>
 {
  const { register, handleSubmit, formState: {errors}} = useForm();


  const onSubmit = (data) => {
      supabaseClient.auth.signInWithOtp({
        email: data.email,
        options: {
          emailRedirectTo:'/home/'
        }
      })
      .then(() => {
        toast.success('Please check your email')
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
  }

  const onFormError = (data) => {
    toast.error('(((')
  }

  return (
    <>
    <h1>Sign In Form</h1>
      <form className={styles.SignInForm} onSubmit={handleSubmit(onSubmit, onFormError)}>
      <input className={errors.name && styles.error} placeholder='Email' {...register('email', {required: true})}/>
      <Button text={'Submit'}/>
    </form>
    </>

  )
}
