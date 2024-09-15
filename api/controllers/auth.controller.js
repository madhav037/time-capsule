import bcrypt from "bcryptjs";
import { supabase } from "../index.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: hashedPassword,
      options: { data: { displayName: username } },
    });
    if (error) throw error;
    res.send("user generated successfully");
  } catch (err) {
    console.log("ERROR-signup", err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: hashedPassword,
    });
    if (error) throw error;
    res.send(session,user);
  } catch (err) {
    console.log("ERROR-login", err);
  }
};

export const logout = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    res.send("Logged out successfully");
  } catch (err) {
    console.log("ERROR-logout", err);
  }
};
