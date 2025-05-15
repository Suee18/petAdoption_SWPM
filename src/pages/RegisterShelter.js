// src/pages/RegisterShelter.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Pages.css';
import './RegisterShelter.css';

const RegisterShelter = () => {
  const [formData, setFormData] = useState({
    shelterName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    petTypes: {
      dogs: false,
      cats: false,
      birds: false,
      smallAnimals: false,
      reptiles: false,
      other: false
    },
    socialMedia: {
      website: '',
      facebook: '',
      instagram: '',
      twitter: ''
    },
    logo: null,
    acceptTerms: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would submit the form data to your backend
    console.log("Form submitted:", formData);
    alert("Thank you for registering your shelter!");
    // Reset form or redirect user
  };

  const nextStep = () => {
    // Add validation here before proceeding to next step
    setCurrentStep(currentStep < totalSteps ? currentStep + 1 : currentStep);
  };

  const prevStep = () => {
    setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <div className="page-container register-shelter-page">
      <motion.div
        className="register-shelter-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="register-title"
          variants={itemVariants}
        >
          Register Your Shelter
        </motion.h1>
        
        <motion.p 
          className="register-description"
          variants={itemVariants}
        >
          Join our network of shelters connecting with pet lovers looking to adopt.
        </motion.p>
        
        <motion.div 
          className="progress-container"
          variants={itemVariants}
        >
          {Array.from({ length: totalSteps }).map((_, index) => (
            <motion.div
              key={index}
              className={`progress-step ${index + 1 <= currentStep ? 'active' : ''}`}
              whileHover={{ scale: 1.1 }}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-label">
                {index === 0 ? 'Account' : index === 1 ? 'Shelter Details' : 'Review'}
              </div>
            </motion.div>
          ))}
          <div className="progress-line">
            <div 
              className="progress-line-fill" 
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
        </motion.div>
        
        <motion.form 
          onSubmit={handleSubmit}
          className="register-form"
          variants={itemVariants}
        >
          {/* Step 1: Account Information */}
          {currentStep === 1 && (
            <motion.div 
              className="form-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2>Account Information</h2>
              
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  placeholder="Choose a username for your shelter account"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your shelter's contact email"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Create a secure password"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="Re-enter your password"
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Step 2: Shelter Details */}
          {currentStep === 2 && (
            <motion.div 
              className="form-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2>Shelter Details</h2>
              
              <div className="form-group">
                <label htmlFor="shelterName">Shelter Name</label>
                <input
                  type="text"
                  id="shelterName"
                  name="shelterName"
                  value={formData.shelterName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your shelter's official name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter a contact phone number"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your shelter's street address"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="select-input"
                  >
                    <option value="">Select City</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Giza">Giza</option>
                    <option value="Sharm El Sheikh">Sharm El Sheikh</option>
                    <option value="Luxor">Luxor</option>
                    <option value="Aswan">Aswan</option>
                    <option value="Hurghada">Hurghada</option>
                    <option value="Mansoura">Mansoura</option>
                    <option value="Tanta">Tanta</option>
                    <option value="Port Said">Port Said</option>
                    <option value="Suez">Suez</option>
                    <option value="Ismailia">Ismailia</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="state">Governorate</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="select-input"
                  >
                    <option value="">Select Governorate</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Giza">Giza</option>
                    <option value="South Sinai">South Sinai</option>
                    <option value="Luxor">Luxor</option>
                    <option value="Aswan">Aswan</option>
                    <option value="Red Sea">Red Sea</option>
                    <option value="Dakahlia">Dakahlia</option>
                    <option value="Gharbia">Gharbia</option>
                    <option value="Port Said">Port Said</option>
                    <option value="Suez">Suez</option>
                    <option value="Ismailia">Ismailia</option>
                    <option value="Sharqia">Sharqia</option>
                    <option value="Qalyubia">Qalyubia</option>
                    <option value="Beheira">Beheira</option>
                    <option value="Minya">Minya</option>
                    <option value="Asyut">Asyut</option>
                    <option value="Faiyum">Faiyum</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="zipCode">Postal Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    placeholder="Postal Code"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Shelter Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell potential adopters about your shelter, mission, and values"
                  rows={4}
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Pet Types (Select all that apply)</label>
                <div className="checkbox-group">
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="petTypes.dogs"
                      checked={formData.petTypes.dogs}
                      onChange={handleInputChange}
                    />
                    <span className="checkbox-label">Dogs</span>
                  </label>
                  
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="petTypes.cats"
                      checked={formData.petTypes.cats}
                      onChange={handleInputChange}
                    />
                    <span className="checkbox-label">Cats</span>
                  </label>
                  
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="petTypes.birds"
                      checked={formData.petTypes.birds}
                      onChange={handleInputChange}
                    />
                    <span className="checkbox-label">Birds</span>
                  </label>
                  
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="petTypes.smallAnimals"
                      checked={formData.petTypes.smallAnimals}
                      onChange={handleInputChange}
                    />
                    <span className="checkbox-label">Small Animals</span>
                  </label>
                  
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="petTypes.reptiles"
                      checked={formData.petTypes.reptiles}
                      onChange={handleInputChange}
                    />
                    <span className="checkbox-label">Reptiles</span>
                  </label>
                  
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="petTypes.other"
                      checked={formData.petTypes.other}
                      onChange={handleInputChange}
                    />
                    <span className="checkbox-label">Other</span>
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="logo">Shelter Logo (Optional)</label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={handleInputChange}
                  accept="image/*"
                />
              </div>
            </motion.div>
          )}
          
          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <motion.div 
              className="form-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2>Review Your Information</h2>
              
              <div className="review-section">
                <h3>Account Information</h3>
                <div className="review-item">
                  <span className="review-label">Username:</span>
                  <span className="review-value">{formData.username}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Email:</span>
                  <span className="review-value">{formData.email}</span>
                </div>
              </div>
              
              <div className="review-section">
                <h3>Shelter Details</h3>
                <div className="review-item">
                  <span className="review-label">Shelter Name:</span>
                  <span className="review-value">{formData.shelterName}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Phone:</span>
                  <span className="review-value">{formData.phone}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Address:</span>
                  <span className="review-value">
                    {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                  </span>
                </div>
                <div className="review-item">
                  <span className="review-label">Pet Types:</span>
                  <span className="review-value">
                    {Object.entries(formData.petTypes)
                      .filter(([_, value]) => value)
                      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
                      .join(', ')}
                  </span>
                </div>
                {formData.logo && (
                  <div className="review-item">
                    <span className="review-label">Logo:</span>
                    <div className="review-image">
                      <img 
                        src={URL.createObjectURL(formData.logo)} 
                        alt="Shelter Logo Preview"
                        width="100"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="checkbox-label">
                    I agree to the Terms of Service and Privacy Policy
                  </span>
                </label>
              </div>
            </motion.div>
          )}
          
          <div className="form-navigation">
            {currentStep > 1 && (
              <motion.button
                type="button"
                className="btn-secondary"
                onClick={prevStep}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Previous
              </motion.button>
            )}
            
            {currentStep < totalSteps ? (
              <motion.button
                type="button"
                className="btn-primary"
                onClick={nextStep}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 6px 20px rgba(108, 95, 141, 0.4)"
                }}
                whileTap={{ scale: 0.97 }}
              >
                Next
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                className="btn-primary submit-btn"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 6px 20px rgba(108, 95, 141, 0.4)"
                }}
                whileTap={{ scale: 0.97 }}
                disabled={!formData.acceptTerms}
              >
                Register Shelter
              </motion.button>
            )}
          </div>
        </motion.form>
        
        <motion.div 
          className="register-shelter-decoration" 
          variants={itemVariants}
          aria-hidden="true"
        >
          <div className="paw-print paw-print-1"></div>
          <div className="paw-print paw-print-2"></div>
          <div className="paw-print paw-print-3"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterShelter;