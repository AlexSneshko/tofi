import { supabaseClient } from "../config/supabase";
import { makeTransaction } from "./makeTransaction"

export const makeAutoTransaction = async (transaction_id, from_account_id, to_account_id, sum, current_count) => {


    // const userResponse = await supabaseClient.auth.getUser();

    // const profile_id = userResponse.data.user.id;

    await makeTransaction(from_account_id, to_account_id, sum)
  
    const { data, error } = await supabaseClient.from("auto_transactions").update({
      current_count: current_count + 1,
    }).eq('id', transaction_id);
  
    console.log(error);
  
    if (error) throw Error(error);

    return data
}