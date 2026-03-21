import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import {
  writeBatch,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  limit,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import usersData from "./data/user.json" with { type: "json" };
import { createMovie } from "@dataconnect/generated";

const firebaseConfig = {
  apiKey: "AIzaSyABBvW0pfykgQkMcJGZXNSYULnL1Q29znk",
  authDomain: "myproject-63a54.firebaseapp.com",
  projectId: "myproject-63a54",
  storageBucket: "myproject-63a54.firebasestorage.app",
  messagingSenderId: "730668236613",
  appId: "1:730668236613:web:3d8925761e36c53b6ac82c",
  measurementId: "G-PHTQ5WC9T4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function queryData() {
  try {
    const q = query(
      collection(db, "users"),
      where("edad", ">", 30),
      orderBy("edad", "desc"),
      limit(10),
    );

    const users = await getDocs(q);
    users.forEach((user) => {
      console.log(user.data()?.email, user.data()?.edad);
    });
  } catch (error) {
    console.log("error", error);
  }
}

async function setPost(postId) {
  try {
    await setDoc(doc(db, "post", postId), {
      name: "mi nuevo post 2",
      description: "para todas las charlas 2",
      userId: "ABC",
    });
    console.log("Se ha creado el post", postId);
  } catch (error) {
    console.log("Error", error);
  }
}

async function updatePost(id) {
  const post = doc(db, "post", "POSTD123");
  try {
    await updateDoc(post, {
      name: "DDD 1828",
      userId: "5449282",
    });
    console.log("se realizo la actuaizacion");
  } catch (error) {
    console.log(error);
  }
}

async function setUsersAll() {
  try {
    const batch = writeBatch(db);
    usersData.forEach((user) => {
      batch.set(doc(db, "users", user.id), user);
    });
    await batch.commit();
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(id) {
  try {
    await deleteDoc(doc(db, "users", id));
    console.log("se elimino");
  } catch (error) {
    console.log("error", error);
  }
}

async function updateProfile(id) {
  const user = await doc(db, "users", id);
  try {
    await updateDoc(user, {
      name: "Eduardo Ormeño",
    });
    console.log("se actualizo");
  } catch (error) {
    console.log(error);
  }
}

async function getUserProfile(id) {
  const user = await getDoc(doc(db, "users", id));
  if (user.exists()) {
    console.log("la data del usuario es", user.data());
  } else {
    console.log("la data del usuario no existe");
  }
}

async function setUsers() {
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    createdAt: new Date(),
    name: "Eduardo",
    role: "User",
  });

  console.log("Usuario creado y perfil guardado", user.email);
}

async function register() {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      "eduardo12978@yopmail.com",
      "123456",
    );
    console.log("usuario creado", userCredential.user);

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date(),
      name: "Eduardo",
      role: "User",
    });

    console.log("Usuario creado y perfil guardado", user.email);
  } catch (error) {
    console.log("error", error.message);
  }
}

async function login() {
  await signInWithEmailAndPassword(auth, "eduardo12978@yopmail.com", "123456");
  console.log("usuario logueado");
}

async function singOut() {
  try {
    await signOut(auth);
    console.log("se cerro la sesion");
  } catch (error) {
    console.log(error);
  }
}

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log("Bienvenido", user.email);
//   } else {
//     console.log("No hay usuario logueado");
//   }
// });

const unsuscribe = onSnapshot(collection(db, "users"), (snapshot) => {
  snapshot.forEach((doc) => {
    console.log("data del snapshot", doc.data());
  });
});

async function sendInvitationEmailUser(params) {
  try {
    console.log("auth ", auth);
    await sendEmailVerification(auth.currentUser);
    console.log("enviado");
  } catch (error) {
    console.log("error ", error);
  }
}

async function createMovieData() {
  try {
    const result = await createMovie({
      title: "Spiderman",
      genre: "accion",
      imageUrl: "https://chatgpt.com/c/69b583d1-205c-8325-bf9b-c509e7f77455",
    });
    console.log("crear movie", result);
  } catch (error) {
    console.log("error al crear ", error);
  }
}

unsuscribe();

async function main() {
  // await updatePost();
  // await register();
 // await login();
  // await sendInvitationEmailUser();
  // await createMovieData();
}

main();
