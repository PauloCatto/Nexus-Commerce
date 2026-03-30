import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';

import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private firestore = inject(Firestore);

  constructor() { }

  async getProfile(uid: string): Promise<UserProfile | null> {
    const docRef = doc(this.firestore, `users/${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  }

  async updateProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
    const docRef = doc(this.firestore, `users/${uid}`);
    const profile = await this.getProfile(uid);

    if (profile) {
      await updateDoc(docRef, { ...data, lastUpdated: Date.now() });
    } else {
      await setDoc(docRef, { uid, ...data, lastUpdated: Date.now() });
    }
  }

  async ensureProfileExists(user: User): Promise<UserProfile> {
    const profile = await this.getProfile(user.uid);
    if (!profile) {
      const newProfile: UserProfile = {
        uid: user.uid,
        email: user.email,
        theme: 'midnight',
        fontFamily: "'Outfit', sans-serif",
        interfaceStyle: 'glass',
        lastUpdated: Date.now()
      };

      await setDoc(doc(this.firestore, `users/${user.uid}`), newProfile);
      return newProfile;
    }
    return profile;
  }
}
