import Cookies from "universal-cookie";

const cookies = new Cookies();
cookies.set("userName", "", { path: "/" });

const signIn = (name) => {
  cookies.set("userName", name, { path: "/" });
};

const signOut = () => {
  cookies.set("userName", "", { path: "/" });
};

export { cookies, signIn, signOut };
