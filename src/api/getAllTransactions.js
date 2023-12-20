import { supabaseClient } from "../config/supabase";

export const getAllTransactions = async () => {
  const userResponse = await supabaseClient.auth.getUser();

  const profileId = userResponse.data.user.id;

  const { data, error } = await supabaseClient
  .from('transactions')
  .select(`
    id,
    sum,
    created_at,
    from:from_account_id(profile_id),
    to:to_account_id(profile_id)
  `)

  const res = data.filter(transaction => (transaction.from.profile_id === profileId) || (transaction.to.profile_id === profileId));

  return res
};
