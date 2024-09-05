import React, { useState } from 'react'
import './login.css'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    })

    const handelAvatar = e =>{
        if(e.target.files[0]){
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
        
        
    }

    const handleLogin = e =>{
        e.preventDefault()
        toast.warn("Hello")
    }

    const handleRegister = async(e) =>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const {username, email, password} = Object.fromEntries(formData)
        try{
            const res = await createUserWithEmailAndPassword(auth,email,password)
            const imgUrl = await upload(avatar.file)

            await setDoc(doc(db, "users",res.user.uid),{
                username,
                email,
                id: res.user.uid,
                blocked: [],

            })

            await setDoc(doc(db, "userChats",res.user.uid),{
                chats: []

            })

            toast.success("Account Created")

        }catch(err){
            console.log(err);
            toast.error(err.message)
            
        }
        
    }
    
  return (
    <div className='login'>
        <div className="item">
            <h2>Welcome Back,</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder='Email' name='email' />
                <input type="password" id="" placeholder='Password' name="password" />
                <button>Sign In</button>
            </form>
        </div>
        <div className="seperator"></div>
        <div className="item">
        <h2>Create an Account,</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="file">Upload an Image <img src={avatar.url || "./avatar.png"} alt="" /></label>
                
                <input type="file" name="file" id="file" style={{display: "none"}} onChange={handelAvatar} />
                <input type="text" name="username" placeholder='Username' id="" />
                <input type="email" placeholder='Email' name='email' />
                <input type="password" id="" placeholder='Password' name="password" />
                <button>Sign Up</button>
            </form>
        </div>

    </div>
  )
}

export default Login