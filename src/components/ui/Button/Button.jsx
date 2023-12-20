import React from 'react'
import styles from './Button.module.scss'

export const Button = ({text, onClick, ...props}) => {
  return (
    <button className={styles.Button} onClick={onClick} {...props}>{text}</button>
  )
}

