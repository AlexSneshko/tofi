import React, { useEffect, useState } from "react";
import styles from "./SignUpForm.module.scss";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../ui/Button/Button";
import { supabaseClient } from "../../config/supabase";
// import { supabaseClient } from "../../config/supabase";

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState();

  const onSubmit = (data) => {
    supabaseClient.auth.signUp({
      email: '007alex03@gmail.com',
      password: 'good password 123',
      options: {
        data: {
          name: 'alex',
          surname: 'alexxx',
        }
      }
    })
    .then(({data, error}) => {
      if (error) {
        toast.error(error);
      } else {
        console.log(data)
        toast.success("Profile create successfully");
      }
    }).catch((error) => {
      console.log(error.message)
    })
  };

  const loadData = async () => {
    // let { data, error } = await supabaseClient
    //   .from("roles")
    //   .select("*");
    // console.log(data);
  };

  const onFormError = (data) => {
    toast.error("(((");
  };

  // const load = supabaseClient

  // useEffect(() => {
  //   const res = supabaseClient.from('roles').select('*')
  //   console.log(res)
  // }, [])

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <p>{error}</p>
      <h1>Sign Up Form</h1>
      <form
        className={styles.SignUpForm}
        onSubmit={handleSubmit(onSubmit, onFormError)}
      >
        <input
          className={errors.name && styles.error}
          placeholder="Name"
          {...register("name", { required: true })}
        />
        <input
          className={errors.surname && styles.error}
          placeholder="Surname"
          {...register("surname", { required: true })}
        />
        <input
          className={errors.email && styles.error}
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <input
          placeholder="Password"
          className={errors.password && styles.error}
          type="password"
          {...register("password", { required: true })}
        />
        <Button text={"Submit"} />
      </form>
    </>
  );
};
