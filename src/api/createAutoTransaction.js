import { supabaseClient } from "../config/supabase";
import { calculateOccurrences } from "../helpers/calculateOccurrences";

export const createAutoTransaction = async (from_account_id, to_account_id, sum, time, day_periodicity, lastDate) => {
    const total_count = calculateOccurrences(new Date(), new Date(lastDate), day_periodicity, time)

    const { data, error } = await supabaseClient
    .from("auto_transactions")
    .insert({
      from_account_id,
      to_account_id,
      sum,
      time,
      day_periodicity,
      last_date: new Date(lastDate).toISOString(),
      total_count
    }); 

    console.log(total_count)

  if (error) throw Error(error)

  console.log(error)

  return data
}