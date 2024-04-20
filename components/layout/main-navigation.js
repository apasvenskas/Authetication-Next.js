import Link from 'next/link';
import { useSession } from 'next-auth/react';

import classes from './main-navigation.module.css';

function MainNavigation() {
  const { data: session, loading} = useSession();

  console.log(loading);
  console.log(session);
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && !loading &&(
            <li>
            <Link href="/auth">Login</Link>
          </li>
          )}         
          {/* another way of seeting active links via useSession */}
          {session && (
            <li>
            <Link href="/profile">Profile</Link>
          </li>
          )}
          {session && (
            <li>
            <button>Logout</button>
          </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
