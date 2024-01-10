import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../../lib/firebase';
import { useRouter } from 'next/router';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignIn = async () => {
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to the home page after successful sign-in
            router.push('/');
        } catch (error) {
            console.error('Sign-in error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpClick = () => {
        // Navigate to the sign-up page
        router.push('/signup');
    };

    return (
        <div className="main-container">
            <div className="signin-container">
                <h2>Sign In!</h2>
                <form className="signin-form">
                    <label className="form-label">
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                        />
                    </label>
                    <label className="form-label">
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                        />
                    </label>
                    <button type="button" onClick={handleSignIn} className="signin-button">
                        {loading ? <div className="loader"></div> : 'Sign In'}
                    </button>
                </form>
                <p className="signup-option">
                    Don't have an account? <span onClick={handleSignUpClick}>Sign Up</span>
                </p>
            </div>

            <style jsx>{`
        .main-container {
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              height: 90vh;
                            }
                    
                            .signin-container {
                              width: 500px;
                              max-width: 800px;
                              padding: 20px;
                              border: 2px solid #ddd;
                              border-radius: 8px;
                              box-shadow: 0 0 30px rgba(0, 0, 0, 3);
                              background-color: white;
                            }
                    
                            h2 {
                              font-size: 40px;
                              text-align: center;
                              color: #2980b9;
                            }
                    
                            .signin-form {
                              display: flex;
                              flex-direction: column;
                              gap: 16px;
                            }
                    
                            .form-label {
                              font-size: 17px;
                              font-weight: 700;
                              display: flex;
                              flex-direction: column;
                              color: gray;
                            }
                    
                            .form-input {
                              padding: 8px;
                              font-size: 16px;
                              border: 1px solid #ccc;
                              border-radius: 5px;
                            }
                    
                            .signin-button {
                              background-color: #3498db;
                              color: #fff;
                              padding: 10px;
                              font-size: 16px;
                              border: none;
                              border-radius: 5px;
                              cursor: pointer;
                            }
                    
                            .signin-button:hover {
                              background-color: #2980b9;
                            }
                    
                            .signup-option {
                              text-align: center;
                              color:black;
                            }
                            
                            span{
                                cursor: pointer;
                                color: #3498db;
                            }
                            .signup-option span:hover {
                              text-decoration: underline;
                    
                            }
        /* ... (previous styles) */

        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 0.8s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </div>
    );
}