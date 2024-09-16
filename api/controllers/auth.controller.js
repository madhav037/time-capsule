import bcrypt from "bcryptjs";
import { supabase } from "../index.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: { data: { displayName: username } },
    });
    const { data: data2, error: error2 } = await supabase
    .from("user")
    .insert([{ auth_userid: data.user.id, username: username, email: email }]);

    if (error2) throw error2;

    if (error) throw error;
    res.json({ msg: "user generated successfully", status: 200, "data" : data.user });
  } catch (err) {
    console.log("ERROR-signup", err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    
    if (error) throw error;
    res.json({"data":data.user, "msg": "user logged in successfully", status: 200});
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
