// import React, { useState } from "react";
// import axios from 'axios';
// import {useNavigate} from "react-router-dom";
 
// export default function LoginPage(){
 
//     const [email,setEmail] = useState('');
//     const [password,setPassword] = useState('');
   
//     const navigate = useNavigate();
     
//     const logInUser = () => {
//         if(email.length === 0){
//           alert("Email has left Blank!");
//         }
//         else if(password.length === 0){
//           alert("password has left Blank!");
//         }
//         else{
//             axios.post('http://127.0.0.1:5000/login', {
//                 email: email,
//                 password: password
//             })
//             .then(function (response) {
//                 console.log(response);
//                 //console.log(response.data);
//                 navigate("/");
//             })
//             .catch(function (error) {
//                 console.log(error, 'error');
//                 if (error.response.status === 401) {
//                     alert("Invalid credentials");
//                 }
//             });
//         }
//     }
 
//     let imgs = [
//       'https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg',
//     ];
     
//   return (
//     <div>
//         <div className="container h-100">
//           <div className="container-fluid h-custom">
//             <div className="row d-flex justify-content-center align-items-center h-100">
//               <div className="col-md-9 col-lg-6 col-xl-5">
//                 <img src={imgs[0]} className="img-fluid"/>
//               </div>
//               <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
//                 <form>
//                   <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
//                     <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
//                   </div>
 
//                   <div className="form-outline mb-4">
//                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" />
//                     <label className="form-label" for="form3Example3">Email address</label>
//                   </div>
 
             
//                   <div className="form-outline mb-3">
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
//                     <label className="form-label" for="form3Example4">Password</label>
//                   </div>
 
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div className="form-check mb-0">
//                       <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
//                       <label className="form-check-label" for="form2Example3">
//                         Remember me
//                       </label>
//                     </div>
//                     <a href="#!" className="text-body">Forgot password?</a>
//                   </div>
 
//                   <div className="text-center text-lg-start mt-4 pt-2">
//                     <button type="button" className="btn btn-primary btn-lg" onClick={logInUser} >Login</button>
//                     <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
//                   </div>
 
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";

// export default function LoginPage() {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const navigate = useNavigate();

//     const logInUser = () => {
//         if (email.length === 0) {
//             alert("Email has left Blank!");
//         } else if (password.length === 0) {
//             alert("Password has left Blank!");
//         } else {
//             axios.post('http://127.0.0.1:5000/login', {
//                 email: email,
//                 password: password
//             })
//             .then(function (response) {
//                 console.log(response);
//                 navigate("/");
//             })
//             .catch(function (error) {
//                 console.log(error);
//                 if (error.response && error.response.status === 401) {
//                     alert("Invalid credentials");
//                 } else {
//                     alert("An error occurred. Please try again later.");
//                 }
//             });
//         }
//     }

//     let imgs = [
//         'https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg',
//     ];

//     return (
//         <div>
//             <div className="container h-100">
//                 <div className="container-fluid h-custom">
//                     <div className="row d-flex justify-content-center align-items-center h-100">
//                         <div className="col-md-9 col-lg-6 col-xl-5">
//                             <img src={imgs[0]} className="img-fluid" alt="Sample" />
//                         </div>
//                         <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
//                             <form>
//                                 <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
//                                     <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
//                                 </div>

//                                 <div className="form-outline mb-4">
//                                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" />
//                                     <label className="form-label" htmlFor="form3Example3">Email address</label>
//                                 </div>

//                                 <div className="form-outline mb-3">
//                                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
//                                     <label className="form-label" htmlFor="form3Example4">Password</label>
//                                 </div>

//                                 <div className="d-flex justify-content-between align-items-center">
//                                     <div className="form-check mb-0">
//                                         <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
//                                         <label className="form-check-label" htmlFor="form2Example3">
//                                             Remember me
//                                         </label>
//                                     </div>
//                                     <a href="#!" className="text-body">Forgot password?</a>
//                                 </div>

//                                 <div className="text-center text-lg-start mt-4 pt-2">
//                                     <button type="button" className="btn btn-primary btn-lg" onClick={logInUser} >Login</button>
//                                     <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
//                                 </div>

//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const logInUser = async () => {
        if (email.length === 0) {
            alert("Email has left Blank!");
        } else if (password.length === 0) {
            alert("Password has left Blank!");
        } else {
            try {
                const response = await axios.post('http://127.0.0.1:5000/login', {
                    email: email,
                    password: password
                });

                console.log('Response:', response);
                navigate("/");
            } catch (error) {
                console.error('Error during login:', error);

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log('Error response data:', error.response.data);
                    console.log('Error response status:', error.response.status);
                    console.log('Error response headers:', error.response.headers);

                    if (error.response.status === 401) {
                        alert("Invalid credentials");
                    } else {
                        alert("An error occurred. Please try again later.");
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log('Error request:', error.request);
                    alert("No response received from the server. Please try again later.");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error message:', error.message);
                    alert("An error occurred. Please try again later.");
                }
            }
        }
    }

    const imgs = [
        'https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg',
        // 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fwoman-working-big-data-tech-600nw-2015415110.jpg&tbnid=mQEttNXzkRvxXM&vet=12ahUKEwj38uOXxJqGAxX4kP0HHRQGC5MQMygAegQIARBU..i&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fadministrative-cartoon&docid=MWj-nvLdS1J3eM&w=600&h=445&q=administrator%20animationpicture&hl=en-US&ved=2ahUKEwj38uOXxJqGAxX4kP0HHRQGC5MQMygAegQIARBU.jpg'
    ];

    return (
        <div>
            <div className="container h-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src={imgs[0]} className="img-fluid" alt="Sample" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="form3Example3"
                                        className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                    />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="form3Example4"
                                        className="form-control form-control-lg"
                                        placeholder="Enter password"
                                    />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <a href="#!" className="text-body">Forgot password?</a>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-lg" onClick={logInUser}>Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
