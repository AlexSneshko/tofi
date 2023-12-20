import { supabaseClient } from "../config/supabase";

export const getAllAutoTransactions = async () => {
  const userResponse = await supabaseClient.auth.getUser();

  const profileId = userResponse.data.user.id;

  const { data, error } = await supabaseClient
  .from('auto_transactions')
  // .select(`
  //   id,
  //   sum,
  //   created_at,
  //   from:from_account_id(profile_id),
  //   to:to_account_id(profile_id),
  //   time,
  //   day_periodicity,
  //   last_date
  // `)
  .select(`
  id,
  sum,
  created_at,
  from:from_account_id(profile_id),
  to:to_account_id(profile_id),
  time,
  day_periodicity,
  last_date,
  current_count,
  total_count,
  from_account_id,
  to_account_id
`)

  const res = data.filter(transaction => (transaction.from.profile_id === profileId) || (transaction.to.profile_id === profileId));

  return res
};
