# GroupChat

GroupChat is a **real-time chat web application** built with **React (TypeScript)** and **Firebase**.  
It supports **Google authentication**, email/password login, and real-time messaging using Firestore.

## Sample Image of how it looks
<img width="500" height="450" alt="image" src="https://github.com/user-attachments/assets/149890be-715c-41c3-bab9-fbbbdfd5e252" />

<img width="500" height="450" alt="image" src="https://github.com/user-attachments/assets/843c8574-8f3d-450f-b502-2ff88fb1c18d" />

Allows us to login with google account
How it looks at firebase
<img width="700" height="600" alt="tempsnip" src="https://github.com/user-attachments/assets/3775f9b6-953c-4f0e-bbe8-9ceb7273aedf" />


---

## **Setup Instructions**

### **Step 1: Create React App**
```bash
npx create-react-app Groupchat --template typescript
cd Groupchat
```
**Why:**  
- `npx create-react-app` → sets up a React project quickly.  
- `--template typescript` → adds TypeScript support automatically.  
- Gives a ready-to-go folder structure with `.tsx` support for components.

---

### **Step 2: Install Firebase**
```bash
npm install firebase
```
**Why:**  
- Firebase serves as the backend (Auth + Firestore + optional Storage).  
- This library connects your React app to Firebase services.

---

### **Step 3: Connect Firebase**
- Initialize Firebase in your project using `initializeApp`.  
- Set up `auth` for login/registration.  
- Set up `provider` to enable Google login.  
- Set up `db` for Firestore instance for real-time chat.  

**Why:**  
- Firebase Auth allows user registration & login.  
- Firestore allows real-time messaging without a separate server.

---

### **Step 4: Firebase Project Setup**
1. Go to Firebase and **create a project**.  
2. Enable **Authentication**:
   - **Email/Password** → register/login with email.  
   - **Google** → login with Google account.  
3. Create **Firestore Database**:
   - Start in **Test Mode** (read/write for everyone temporarily).  
   - Choose a region close to you.  
4. (Optional) Enable **Storage** if you want file/image sharing.  

**Firestore Structure Example:**
```
Collection: messages
    Document: auto-generated id
        Fields:
            senderId: string
            senderName: string
            text: string
            timestamp: timestamp
```

5. Get **Firebase Config**:
   - Go to Project Settings → Your Apps → Web → Add App → Copy config object.

---

### **Step 5: Deploy to Firebase Hosting**
1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```
2. **Login to Firebase**
```bash
firebase login
```
3. **Initialize Firebase**
```bash
firebase init
```
- Select **Hosting: Configure files for Firebase Hosting**.  
- Choose your Firebase project.  
- Set **public directory** to `build`.  
- Configure as **single-page app** → Yes.  
- Don’t overwrite `index.html` if prompted.

4. **Build React app**
```bash
npm run build
```

5. **Deploy**
```bash
firebase deploy
```

- Your app will be live at:  
```
https://your-app-name.web.app
```
or  
```
https://your-app-name.firebaseapp.com
```

6. **Update Firebase Auth**
- Go to Firebase Console → Authentication → Sign-in method → Authorized domains.  
- Add your hosting domain (`your-app-name.web.app` or `firebaseapp.com`).

✅ Now, your app is accessible on any device, and **Google login works without temporary tunnels**.
