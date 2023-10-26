import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

export default function UserLogin() {
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [loggedin, setLoggedin] = useState(false);
  const [resData, setResData] = useState('');

  const updateUsername = (event) => {
    event.preventDefault();
    const val = event.target.value;
    setStudentEmail(val);
  };

  const updatePassword = (event) => {
    event.preventDefault();
    const val = event.target.value;
    setStudentPassword(val);
  };

  const login = (event) => {
    event.preventDefault();
    const loginBody = JSON.stringify({
      StudentEmail: studentEmail,
      StudentPassword: studentPassword,
    });

    axios({
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
      url: 'http://localhost:3200/api/users/studentLogin',
      data: loginBody,
    })
      .then((response) => {
        console.log('Arrived to login request');
        if (response.status === 200) {
          setResData(response.data);
          console.log('this is resData status ' + resData.messageCode);
          if (resData.messageCode === '1000') {
            setLoggedin(true);
            Swal.fire({
              position: 'middle',
              icon: 'success',
              title: 'User Login Successful !',
              showConfirmButton: false,
              timer: 3500,
            });
          }
          console.log('this is login status 2 ' + loggedin);
        }
      })
      .then(navigateToHome)
      .catch(() => console.log('ISSUES !'));
  };

  const navigateToHome = () => {
    if (loggedin) {
      console.log('came for navigation');
      // You can use navigation logic here.
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://cutewallpaper.org/24x/nm6zpu95e/400414300.jpg")',
        backgroundSize: 'cover',
        position: 'relative',
        height: '750px',
      }}
    >
      <div
        className="card"
        style={{
          opacity: 0.8,
          borderRadius: 30,
          position: 'absolute',
          marginTop: 50,
          height: 400,
          width: 400,
          justifyContent: 'center',
          marginLeft: 500,
          marginRight: 500,
        }}
      >
        <div className="card-body">
          <form>
            <br />
            <div style={{ justifyContent: 'center', alignItems: 'center' }}>
              {' '}
              <h3> User Login</h3>{' '}
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={updateUsername}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={updatePassword}
                required
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={login}
            >
              Login
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
          {loggedin && <Navigate to="/dashboard" />}
        </div>
      </div>
    </div>
  );
}