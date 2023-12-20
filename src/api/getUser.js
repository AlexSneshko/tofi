import { supabaseClient } from "../config/supabase"

export const getUser = async () => {
    const {data: userData, error: userError} = await supabaseClient.auth.getUser()

    const {data, error} = await supabaseClient.from('profiles').select().eq('id', userData.user.id).single()

    const user = {
        ...userData.user,
        ...data
    }

    return user
}