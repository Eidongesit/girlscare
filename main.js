// Firebase Imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut,onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaWsuVR8bqjyNROV6UH8jjMe9kBn3smsk",
  authDomain: "natalcare-3c799.firebaseapp.com",
  databaseURL: "https://natalcare-3c799-default-rtdb.firebaseio.com",
  projectId: "natalcare-3c799",
  storageBucket: "natalcare-3c799.appspot.com",
  messagingSenderId: "362770937542",
  appId: "1:362770937542:web:afa58bf6c7fd8fca8349c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Close the modal when the user clicks anywhere outside of the modal

const authTitle = document.getElementById('auth-title');
const authForm = document.getElementById('auth-form');
const authButton = document.getElementById('auth-button');
const toggleText = document.getElementById('toggle-text');
const confirmPasswordContainer = document.getElementById('confirm-password-container');
const authError = document.getElementById('auth-error');
const authSuccess = document.getElementById('auth-success');

let isSignUp = false;

const toggleAuthMode = () => {
    isSignUp = !isSignUp;
    authTitle.textContent = isSignUp ? 'Sign Up' : 'Sign In';
    authButton.textContent = isSignUp ? 'Sign Up' : 'Sign In';
    confirmPasswordContainer.style.display = isSignUp ? 'block' : 'none';
    toggleText.innerHTML = isSignUp
        ? `Already have an account? <button type="button" id="toggle-btn" class="btn btn-link">Sign In</button>`
        : `Don't have an account? <button type="button" id="toggle-btn" class="btn btn-link">Sign Up</button>`;
    document.getElementById('toggle-btn').addEventListener('click', toggleAuthMode);
};

document.getElementById('toggle-btn').addEventListener('click', toggleAuthMode);

authForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = isSignUp ? document.getElementById('confirmPassword').value : '';

    if (isSignUp && password !== confirmPassword) {
        authError.textContent = 'Passwords do not match.';
        authError.style.display = 'block';
        return;
    }

    authError.style.display = 'none';
    authSuccess.style.display = 'none';

    try {
        if (isSignUp) {
            // Sign up the user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create a Firestore document for the user
            await setDoc(doc(db, 'users', user.uid), {
                email: email,
                userId: user.uid,
                name: "",
                dob: "",
                contact: "",
                address: "",
                emergencyContact: "",
                emergencyContactName:"",
                gender: "Female",
                insurance: "",
               medicalHistory:"",
               medications:"",
               allergies:"",
               healthReview:"",
        

            });

            authSuccess.textContent = 'Account created successfully.';
            authSuccess.style.display = 'block';
            console.log('Sign-up successful, redirecting to account.html');
            setTimeout(() => {
                window.location.href = 'calculator.html'; 
            }, 300);
        } else {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            authSuccess.textContent = 'Signed in successfully.';
            authSuccess.style.display = 'block';
            console.log('Sign-in successful, redirecting to account.html');
            setTimeout(() => {
                window.location.href = 'symtopm.html'; 
            }, 300);
        }
    } catch (error) {
        authError.textContent = `Error: ${error.message}`;
        authError.style.display = 'block';
    }
});


// Add JavaScript for animations or other interactive features
// Handle user authentication state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            
            document.getElementById('profile-name').textContent=userData.name||"Please fill in your name";
            document.getElementById('profile-dob').textContent =userData.dob || 'Not provided';
            document.getElementById('profile-contact').textContent = userData.contact || 'Not provided';
            document.getElementById('profile-address').textContent = userData.address || 'Not provided';
            document.getElementById('emergency-contact-name').textContent = userData.emergencyContactName || 'Not provided';
            document.getElementById('emergency-contact').textContent = userData.emergencyContact || 'Not provided';
            document.getElementById('medical-history').textContent = userData.medicalHistory || 'Not provided';
            document.getElementById('medications').textContent = userData.medications || 'Not provided';
            document.getElementById('allergies').textContent = userData.allergies || 'Not provided';
            document.getElementById('health-review').textContent = userData.healthReview || 'Not provided';
        } else {
            console.log('No such document!');
        }
    } else {
        console.log('No user is signed in.');
        // Optionally, redirect to the login page
        
    }
});

// Log out user
function logOutUser() {
    signOut(auth).then(() => {
        console.log('User signed out successfully.');
        alert('You are signed out');
        // Redirect to the login page or homepage
        window.location.href = 'index.html'; // Adjust this URL to your login page or homepage
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
}

// Attach event listener to the logout button
document.getElementById('logoutButton').addEventListener('click', logOutUser);


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, (error) => {
        console.log('ServiceWorker registration failed: ', error);
      });
    });
  }
  
