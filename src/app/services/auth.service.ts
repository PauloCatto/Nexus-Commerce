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

  // Observable que escuta as mudanças de estado do usuário (logado/deslogado)
  public user$: Observable<User | null> = authState(this.auth);

  constructor() {}

  // Criar conta com Email e Senha
  async register(email: string, password: string, displayName?: string): Promise<User> {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    if (displayName) {
      // Atualiza o perfil com o nome do usuário assim que cria a conta
      await updateProfile(cred.user, { displayName });
    }
    return cred.user;
  }

  // Login com Email e Senha
  async login(email: string, password: string): Promise<User> {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    return cred.user;
  }

  // Login com Google
  async loginWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(this.auth, provider);
    return cred.user;
  }

  // Fazer Logout
  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}
