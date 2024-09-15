//auth.js
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDPGfGTg4-D4YHDHYmDcuKJKWptXI8CJ3E",
  authDomain: "webvishal-66256.firebaseapp.com",
  databaseURL: "https://webvishal-66256-default-rtdb.firebaseio.com",
  projectId: "webvishal-66256",
  storageBucket: "webvishal-66256.appspot.com",
  messagingSenderId: "65434992608",
  appId: "1:65434992608:web:2686b0dea20db0ee80b585",
  measurementId: "G-KFJYCNJQ2W"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const signUp = (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
    const passwordOfRegister = document.getElementById("password").value;
    const confirmPasswordOfRegister = document.getElementById("confirm-password").value;
    const errorMessage = document.getElementById("error-message");

    if (passwordOfRegister !== confirmPasswordOfRegister) {
      document.getElementById("confirm-password").setAttribute("pattern", passwordOfRegister);
      document.getElementById("confirm-password").setAttribute("title", "Confirm password does not match.");
        errorMessage.innerHTML = 'Confirm password does not match.';
        document.getElementById("confirm-password").classList.add("error-border");
        event.preventDefault();  // Prevent form submission
        return;
    } else {
        errorMessage.textContent = '';
        document.getElementById("confirm-password").classList.remove("error-border");
    }


  auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          document.getElementById("additionalInfoModal").style.display = "none";
          alert("User registered: " + user.email);
          document.getElementById("registerUser").style.display="none";
          document.getElementById("loginUser").style.display="block";

      })
      .catch((error) => {
          const errorMessage = error.message;
          alert("Registration failed: " + errorMessage);
      });
      
}




const signIn = (event) => {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          alert("Signed in successfully: " + user.email);
          window.location.href = "index.html";
      })
      .catch((error) => {
          const errorMessage = error.message;
          alert("Login failed: " + errorMessage);
      });
}

auth.onAuthStateChanged((user) => {
  if (user) {
      isAuthenticated = true;
      userId = user.uid;
      loadCartFromFirestore();
  } else {
      isAuthenticated = false;
      userId = null;
      loadCartFromLocalStorage();
  }
});

// Handle authentication state changes
auth.onAuthStateChanged((user) => {
  const signInButton = document.getElementById('signInButton');
  const welcomeMessage = document.getElementById('welcomeMessage');
  if (user) {
      signInButton.textContent = 'Sign Out';
      welcomeMessage.textContent = `Welcome ${user.email}`;
      signInButton.onclick = signOut;
      document.getElementById("profileButton").style.display = "block";
  } else {
      signInButton.textContent = 'Sign Up / Sign In';
      document.getElementById("profileButton").style.display = "none";
      welcomeMessage.textContent = 'Welcome to ShopMe';
      signInButton.onclick = redirectToAuthPage;
  }
});

// Functions to open and close the profile popup
const openProfilePopup = () => {
  document.getElementById("profilePopup").style.display = "block";
  loadUserProfile(); // Load user profile data into the form
  enableSaveButton(); // Enable the save button logi
};

const closeProfilePopup = () => {
  document.getElementById("profilePopup").style.display = "none";
};

function signOut() {
  auth.signOut().then(() => {
      alert('Signed out successfully!');
  }).catch((error) => {
      alert('Error signing out: ' + error.message);
  });
}




const togglePasswordVisibility = (checkbox, passwordField) => {
  const passwordInput = document.getElementById(passwordField);
  passwordInput.type = checkbox.checked ? "text" : "password";
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("registerForm").addEventListener("submit", signUp);
  document.getElementById("loginForm").addEventListener("submit", signIn);
  document.getElementById("showPassword").addEventListener("change", function() {
    togglePasswordVisibility(this, "password");
  });
  document.getElementById("showPassword").addEventListener("change", function() {
    togglePasswordVisibility(this, "confirm-password");
  });
  document.getElementById("showLoginPassword").addEventListener("change", function() {
    togglePasswordVisibility(this, "loginPassword");
  });
});

function showRegister() {
document.getElementById("registerUser").style.display="block";
document.getElementById("loginUser").style.display="none";

}


