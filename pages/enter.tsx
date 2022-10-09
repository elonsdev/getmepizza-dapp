import { auth,firestore, googleAuthProvider } from './libs/firebase';
import NavBar from './components/navbar';
import Image from 'next/image';
import Footer from './components/footer';
import { UserContext } from './libs/context';
import { useEffect, useState, useCallback, useContext } from 'react';
import debounce from 'lodash.debounce';

export default function Enter(props) {
  const { user, username } = useContext(UserContext)

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main className=' flex flex-col min-h-screen font-CircularMedium lg:max-w-5xl lg:mx-auto bg-slate-50'>
        <NavBar/>
        <div className='mx-auto text-center mt-20'>
        {user ? 
            !username ? <UsernameForm /> : <SignOutButton /> 
            : 
            <SignInButton />
        }
        </div>
        <div className='mt-auto'>
            <Footer/>
        </div>
        
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <button className=" bg-white rounded-full text-lg  py-2 px-3 text-center lg:inline" onClick={signInWithGoogle}>
       Sign in with <Image width={'18px'} height={'18px'} src={'/google.png'} />oogle 
    </button>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

// Username form
function UsernameForm() {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const { user, username } = useContext(UserContext);
  
    const onSubmit = async (e) => {
      e.preventDefault();
  
      // Create refs for both documents
      const userDoc = firestore.doc(`users/${user.uid}`);
      const usernameDoc = firestore.doc(`usernames/${formValue}`);
  
      // Commit both docs together as a batch write.
      const batch = firestore.batch();
      batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
      batch.set(usernameDoc, { uid: user.uid });
  
      await batch.commit();
    };
  
    const onChange = (e) => {
      // Force form value typed in form to match correct format
      const val = e.target.value.toLowerCase();
      const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  
      // Only set form value if length is < 3 OR it passes regex
      if (val.length < 3) {
        setFormValue(val);
        setLoading(false);
        setIsValid(false);
      }
  
      if (re.test(val)) {
        setFormValue(val);
        setLoading(true);
        setIsValid(false);
      }
    };
  
    //
  
    useEffect(() => {
      checkUsername(formValue);
    }, [formValue]);
  
    // Hit the database for username match after each debounced change
    // useCallback is required for debounce to work
    const checkUsername = useCallback(
      debounce(async (username) => {
        if (username.length >= 3) {
          const ref = firestore.doc(`usernames/${username}`);
          const { exists } = await ref.get();
          console.log('Firestore read executed!');
          setIsValid(!exists);
          setLoading(false);
        }
      }, 500),
      []
    );
  
    return (
      !username && (
        <section>
          <h3>Choose Username</h3>
          <form onSubmit={onSubmit}>
            <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
            <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
            <button type="submit" className="btn-green" disabled={!isValid}>
              Choose
            </button>
  
            <h3>Debug State</h3>
            <div>
              Username: {formValue}
              <br />
              Loading: {loading.toString()}
              <br />
              Username Valid: {isValid.toString()}
            </div>
          </form>
        </section>
      )
    );
  }
  
  function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
    } else {
      return <p></p>;
    }
  }