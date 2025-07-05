import { auth, db } from './firebase.js';
import { 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import {
  collection, addDoc, query, getDocs
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

window.register = async function() {
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;

  console.log("Email entered during registration:", email);
  console.log("Password entered during registration:", password);

  if (!email || !email.includes('@')) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!password || password.length < 6) {
    alert("Please enter a password with at least 6 characters.");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registered Successfully!");
    console.log("Registered Successfully");
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
};


window.login = async function() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged In Successfully");
    loadEvents();
  } catch (error) {
    console.error(error.message);
  }
}

window.logout = async function() {
  await signOut(auth);
  console.log("Logged Out");
}

window.addEvent = async function() {
  const eventName = document.getElementById('eventName').value;
  const eventCity = document.getElementById('eventCity').value;
  const eventCategory = document.getElementById('eventCategory').value;
  const eventTime = document.getElementById('eventTime').value;

  try {
    await addDoc(collection(db, "sports_events"), {
      name: eventName,
      city: eventCity,
      category: eventCategory,
      time: eventTime
    });
    console.log("Event Added");
    loadEvents();
  } catch (error) {
    console.error(error);
  }
}

async function loadEvents() {
  const q = query(collection(db, "sports_events"));
  const querySnapshot = await getDocs(q);
  const eventsList = document.getElementById('eventsList');
  eventsList.innerHTML = '';
  querySnapshot.forEach((doc) => {
    const li = document.createElement('li');
    li.textContent = `${doc.data().name} - ${doc.data().city} - ${doc.data().category} - ${doc.data().time}`;
    eventsList.appendChild(li);
  });
}

onAuthStateChanged(auth, user => {
  if (user) {
    console.log("User logged in: ", user.email);
    loadEvents();
  } else {
    console.log("User logged out");
  }
});
