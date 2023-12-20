import { supabaseClient } from "../config/supabase";

export const makeTransaction = async (fromAccountId, toAccountId, sum) => {
  const { data, error } = await supabaseClient
    .from("transactions")
    .insert({
      from_account_id: fromAccountId,
      to_account_id: toAccountId,
      sum,
    });

    console.log(error)

  if (error) throw Error(error)

  return data
};
