

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../lib/firebase';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // useRouter hook

  const handleSignUp = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to the home page after successful sign-up
      router.push('/');
    } catch (error) {
      console.error('Sign-up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExistingAccountClick = () => {
    // Navigate to the sign-in page
    router.push('/signin');
  };

  return (
    <div className="main-container">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form className="signup-form">
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
          <button type="button" onClick={handleSignUp} className="signup-button">
            {loading ? <div className="loader"></div> : 'Sign Up'}
          </button>
        </form>
        <p className="signin-option">
          Already have an account? <span onClick={handleExistingAccountClick}>Sign In</span>
        </p>
      </div>

      <style jsx>{`
        .main-container {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 90vh;
        }

        .signup-container {
            width: 400px;
            max-width: 800px;
            padding: 20px;
            border: 2px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            background-color:white;


        }

        h2 {
            font-size: 40px;
            text-align: center;
            color: #2980b9;
        }

        .signup-form {
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
            border-radius: 4px;
        }

        .signup-button {
            background-color: #3498db;
            color: #fff;
            padding: 10px;
            font-size: 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .signup-button:hover {
            background-color: #2980b9;
        }

        .signin-option {
            text-align: center;
            
        }
        
        span{
            color: #3498db;
            cursor: pointer;
            
        }
        .signin-option {
          
           color: black;
      }
        .signin-option span:hover {
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