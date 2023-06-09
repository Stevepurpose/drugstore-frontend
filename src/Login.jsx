import { useState } from "react";
import BACKENDURL from './Back'

function Login({user,setUser,error,setError}){
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')

function handleEmail(e){

    setEmail(e.target.value)
}

function handlePassword(e){

    setPassword(e.target.value)
}


    async function handleSubmit(e){
    e.preventDefault()
    
    try{
        
     let  body={email:email,password:password}
    const res=await BACKENDURL.post("/api/user/login",body,{headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${user.token}`
    }}
)
    

    localStorage.setItem('user',JSON.stringify(res.data)) 
    
 setUser(res.data)
   
 setEmail('')
setPassword('')
setError(null) 
    }


 catch(error){
    setUser(null)
     setError(error)

     
 }
 

}



return(
<div className="form-guide">
<p className="pass-guide">password must contain a mix of uppercase,lowercase and special characters</p>
<div className="form-div">
    <form  onSubmit={handleSubmit}>
<input type="email" onChange={handleEmail} value={email}  placeholder="Email"  className="form-input"/>
<input type="password" onChange={handlePassword} value={password} placeholder="password"   className="form-input"/>
<div>
<button className="keys">Login</button>
</div>
    </form>
</div>
    {error&&<p className="warning">incorrect details</p>}
    
</div>
)

}

export default Login


