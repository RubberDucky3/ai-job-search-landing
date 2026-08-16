import { supabase } from "./supabase"

export async function signUp(email: string, password: string, name: string, plan: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name, plan: plan || "free" },
    },
  })

  if (authError) throw authError

  let stripeCustomerId: string | null = null

  if (plan && plan !== "free") {
    const { data: stripeSession, error: stripeError } = await supabase.functions.invoke("stripe-checkout", {
      body: JSON.stringify({ plan }),
    })

    if (stripeError) throw stripeError
    return { user: authData.user, stripeSession: stripeSession }
  }

  // Create free user record
  const { error: dbError } = await supabase.from("users").insert({
    id: authData.user?.id,
    email,
    name,
    plan: plan || "free",
    applications_used: 0,
  })

  if (dbError) throw dbError

  return { user: authData.user }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null

  const { data, error: dbError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single()

  if (dbError) return null
  return data as any
}
