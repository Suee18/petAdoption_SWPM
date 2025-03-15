import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included
import './Pages.css'; // Make sure your custom styles don't interfere
import dogImage from '../assets/images/dog-please-adopt-me-fb.jpg'; // Import the image

export default function SignUp() {
  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="card rounded-3">
              {/* Image */}
              <img
                src={dogImage}
                className="w-100"
                style={{
                  borderTopLeftRadius: ".3rem",
                  borderTopRightRadius: ".3rem",
                }}
                alt="Please Adopt Me!"
              />
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>

                <form className="px-md-2">
                  {/* User Name Input */}
                  <div className="form-outline mb-4">
                    <input type="text" id="userName" className="form-control" />
                    <label className="form-label" htmlFor="userName">
                      User Name
                    </label>
                  </div>

                  {/* Email Input */}
                  <div className="form-outline mb-4">
                    <input type="email" id="email" className="form-control" />
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                  </div>

                  {/* Password Input */}
                  <div className="form-outline mb-4">
                    <input type="password" id="password" className="form-control" />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>

                  {/* Address Fields */}
                  <div className="form-outline mb-4">
                    <input type="text" id="address" className="form-control" />
                    <label className="form-label" htmlFor="address">
                      Address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" id="city" className="form-control" />
                    <label className="form-label" htmlFor="city">
                      City
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="text" id="zipCode" className="form-control" />
                    <label className="form-label" htmlFor="zipCode">
                      Zip Code
                    </label>
                  </div>

                  {/* Birthdate */}
                  <div className="form-outline mb-4">
                    <input type="date" id="birthdate" className="form-control" />
                    <label className="form-label" htmlFor="birthdate">
                      Birthdate
                    </label>
                  </div>

                  {/* Gender Dropdown */}
                  <div className="form-outline mb-4">
                    <select id="gender" className="form-control">
                      <option value="1" disabled>Select Gender</option>
                      <option value="2">Female</option>
                      <option value="3">Male</option>
                      <option value="4">Other</option>
                    </select>
                    <label className="form-label" htmlFor="gender">
                      Gender
                    </label>
                  </div>

                  {/* Previous Pets? Dropdown */}
                  <div className="form-outline mb-4">
                    <select id="previousPets" className="form-control">
                      <option value="1" disabled>Previous Pets?</option>
                      <option value="2">Yes</option>
                      <option value="3">No</option>
                    </select>
                    <label className="form-label" htmlFor="previousPets">
                      Previous Pets?
                    </label>
                  </div>

                  {/* Current Pets? Dropdown */}
                  <div className="form-outline mb-4">
                    <select id="currentPets" className="form-control">
                      <option value="1" disabled>Current Pets?</option>
                      <option value="2">Yes</option>
                      <option value="3">No</option>
                    </select>
                    <label className="form-label" htmlFor="currentPets">
                      Current Pets?
                    </label>
                  </div>

                  {/* Job Input */}
                  <div className="form-outline mb-4">
                    <input type="text" id="job" className="form-control" />
                    <label className="form-label" htmlFor="job">
                      Job
                    </label>
                  </div>

                  {/* Marital Status Dropdown */}
                  <div className="form-outline mb-4">
                    <select id="maritalStatus" className="form-control">
                      <option value="1" disabled>Marital Status</option>
                      <option value="2">Single</option>
                      <option value="3">Married</option>
                      <option value="4">Divorced</option>
                    </select>
                    <label className="form-label" htmlFor="maritalStatus">
                      Marital Status
                    </label>
                  </div>

                  {/* Children Input */}
                  <div className="form-outline mb-4">
                    <select id="children" className="form-control">
                      <option value="1" disabled>Children</option>
                      <option value="2">Yes</option>
                      <option value="3">No</option>
                    </select>
                    <label className="form-label" htmlFor="children">
                      Children (Yes/No)
                    </label>
                  </div>

                  {/* Children Count */}
                  <div className="form-outline mb-4">
                    <input type="number" id="childrenCount" className="form-control" />
                    <label className="form-label" htmlFor="childrenCount">
                      Children Count
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-success btn-lg mb-1"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
