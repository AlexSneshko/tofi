import { supabaseClient } from "../config/supabase";

export const createCredit = async (
  type,
  base,
  term_year,
  percent,
  total_sum
) => {
  const userResponse = await supabaseClient.auth.getUser();

  const profile_id = userResponse.data.user.id;

  const { data, error } = await supabaseClient.from("credits").insert({
    profile_id,
    type,
    base,
    term_year,
    percent,
    total_sum,
  });

  console.log(error);

  if (error) throw Error(error);

  return data;
};
