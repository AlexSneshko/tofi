import { supabaseClient } from "../config/supabase";

export const payForCredit = async (credit_id, prevSum, newSum) => {
  const { data, error } = await supabaseClient.from("credits").update({
    sum: prevSum + newSum,
  }).eq('id', credit_id);

  console.log(error);

  if (error) throw Error(error);

  return data;
};
