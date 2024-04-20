import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
// import { useEffect, useState } from 'react';
// import { getSession } from 'next-auth/react';

function UserProfile() {
  // // Redirect away if NOT auth
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   getSession().then(session => {
  //     // setLoadedSession(session)
  //     if(!session){
  //       window.location.href = '/auth'; 
  //     } else {
  //       setIsLoading(false)
  //     }
  //   })
  // }, [])

  // // const { data: session, loading} = useSession();

  // if(isLoading){
  //   return <p className={classes.profile}>Loading...</p>
  // }

  // used a getServerSideProps function in the pages/profile.js file instead

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
