import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, signOut, sendEmailVerification } from "firebase/auth";
import initializeAuthentication from '../Pages/Login/Firebase/Firebase.init';
import swal from 'sweetalert';



initializeAuthentication();



const useFirebase = () => {
    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false)
    const [login, setLogin] = useState(false)
    console.log(user)


    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();


    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name };
                setUser(newUser);
                //Save user to the database
                saveUser(email, name, 'POST')
                // send name to firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                swal('REGESTERED SUCCESSFULLY')
                history.replace('/login');
                verifyEmail();
            })
            .catch((error) => {
                setAuthError(error.message);
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }

    const verifyEmail = () => {
         sendEmailVerification(auth.currentUser)
         .then((user) => {
            console.log(user)
         })
    }


    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLogin(true)
                const destination = location?.state?.from || '/';
                history.replace(destination);
                swal('Login Succesfully')
                setAuthError('');
                
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }


    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                console.log(user)
                setLogin(true)
                saveUser(user.email , user.displayName, 'PUT');
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
            }).catch((error) => {
                setAuthError(error.message);
            }).finally(() => setIsLoading(false));
    }

    // observer user state
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, []);

    useEffect(() => {
        fetch(`https://rn-tech-server-side-production.up.railway.app/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email])

    const logout = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setLogin(false)

        }).catch((error) => {

        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email,displayName,method) => {
        const user = {email,displayName};
        
        fetch('https://rn-tech-server-side-production.up.railway.app/users',{
            method:method,
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then()
    }

    return {
        user,
        isLoading,
        authError,
        admin,
        registerUser,
        loginUser,
        signInWithGoogle,
        login,
        logout,
    }
};

export default useFirebase;