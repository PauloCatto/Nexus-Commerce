import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  authState,
  User,
  updateProfile
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);

  public user$: Observable<User | null> = authState(this.auth);

  constructor() { }

  async register(email: string, password: string, displayName?: string): Promise<User> {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    return cred.user;
  }

  async login(email: string, password: string): Promise<User> {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    return cred.user;
  }

  // Login with Google
  async loginWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(this.auth, provider);
    return cred.user;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  getAuthErrorMessage(error: any): string {
    const code = error.code || '';
    switch (code) {
      case 'auth/weak-password':
        return 'Weak password. It must be at least 6 characters.';
      case 'auth/email-already-in-use':
        return 'This email is already in use by another account.';
      case 'auth/invalid-email':
        return 'The email address is badly formatted.';
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Invalid email or password. Please check your credentials.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/operation-not-allowed':
        return 'Email/password accounts are not enabled.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}
