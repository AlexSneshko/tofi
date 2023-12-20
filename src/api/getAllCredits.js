import { supabaseClient } from "../config/supabase";

export const getAllCredits = async () => {
    const userResponse = await supabaseClient.auth.getUser();

  const profile_id = userResponse.data.user.id;

  const { data, error } = await supabaseClient
  .from('credits')
  .select('*')
  .eq('profile_id', profile_id)

  if (error) throw Error(error)

  return data
}