import { supabaseClient } from "../config/supabase";

export const getUserAccounts = async () => {
    const userResponse = await supabaseClient.auth.getUser();

    const account = await supabaseClient.from('accounts').select('*').eq('profile_id', userResponse.data.user.id);
 
    return account.data
}