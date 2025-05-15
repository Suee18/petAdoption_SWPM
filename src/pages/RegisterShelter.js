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

  const [errors, setErrors] = useState({});
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
    
    // Final validation of all steps before submission
    const isStep1Valid = validateStep(1);
    const isStep2Valid = validateStep(2);
    const isStep3Valid = validateStep(3);
    
    if (isStep1Valid && isStep2Valid && isStep3Valid) {
      // In a real application, you would submit the form data to your backend
      console.log("Form submitted:", formData);
      alert("Thank you for registering your shelter!");
      // Reset form or redirect user
    } else {
      // If there are errors in a specific step, go to that step
      if (!isStep1Valid) {
        setCurrentStep(1);
      } else if (!isStep2Valid) {
        setCurrentStep(2);
      }
      // Step 3 errors will be visible as user is already on step 3 during submission
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;
    
    if (step === 1) {
      // Validate username
      if (!formData.username.trim()) {
        newErrors.username = "Username is required";
        isValid = false;
      } else if (formData.username.length < 4) {
        newErrors.username = "Username must be at least 4 characters";
        isValid = false;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email format is invalid";
        isValid = false;
      }
      
      // Validate password
      if (!formData.password) {
        newErrors.password = "Password is required";
        isValid = false;
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
        isValid = false;
      }
      
      // Validate confirm password
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }
    
    if (step === 2) {
      // Validate shelter name
      if (!formData.shelterName.trim()) {
        newErrors.shelterName = "Shelter name is required";
        isValid = false;
      }
      
      // Validate phone (optional but if provided, validate format)
      if (formData.phone && !/^[0-9+\-\s()]{7,20}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
        isValid = false;
      }
      
      // Validate address
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
        isValid = false;
      }
      
      // Validate city
      if (!formData.city) {
        newErrors.city = "City is required";
        isValid = false;
      }
      
      // Validate state
      if (!formData.state) {
        newErrors.state = "Governorate is required";
        isValid = false;
      }
      
      // Validate zipCode
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = "Postal code is required";
        isValid = false;
      } else if (!/^[0-9]{5,10}$/.test(formData.zipCode)) {
        newErrors.zipCode = "Please enter a valid postal code";
        isValid = false;
      }
      
      // Validate pet types (at least one should be selected)
      const hasPetType = Object.values(formData.petTypes).some(value => value);
      if (!hasPetType) {
        newErrors.petTypes = "Please select at least one pet type";
        isValid = false;
      }
    }
    
    if (step === 3) {
      // Validate terms acceptance
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = "You must accept the terms to register";
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep < totalSteps ? currentStep + 1 : currentStep);
      // Clear any previous errors when moving to next step
      setErrors({});
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep > 1 ? currentStep - 1 : currentStep);
    // Clear errors when going back
    setErrors({});
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
                  className={errors.username ? 'input-error' : ''}
                  required
                  placeholder="Choose a username for your shelter account"
                />
                {errors.username && <div className="error-message">{errors.username}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'input-error' : ''}
                  required
                  placeholder="Enter your shelter's contact email"
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
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
                    className={errors.password ? 'input-error' : ''}
                    required
                    placeholder="Create a secure password"
                  />
                  {errors.password && <div className="error-message">{errors.password}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.confirmPassword ? 'input-error' : ''}
                    required
                    placeholder="Re-enter your password"
                  />
                  {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
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
                  className={errors.shelterName ? 'input-error' : ''}
                  required
                  placeholder="Enter your shelter's official name"
                />
                {errors.shelterName && <div className="error-message">{errors.shelterName}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'input-error' : ''}
                  placeholder="Enter a contact phone number"
                />
                {errors.phone && <div className="error-message">{errors.phone}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'input-error' : ''}
                  required
                  placeholder="Enter your shelter's street address"
                />
                {errors.address && <div className="error-message">{errors.address}</div>}
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
                    className={`select-input ${errors.city ? 'input-error' : ''}`}
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
                  {errors.city && <div className="error-message">{errors.city}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="state">Governorate</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className={`select-input ${errors.state ? 'input-error' : ''}`}
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
                  {errors.state && <div className="error-message">{errors.state}</div>}
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
                    className={errors.zipCode ? 'input-error' : ''}
                  />
                  {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
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
                <div className={`checkbox-group ${errors.petTypes ? 'checkbox-group-error' : ''}`}>
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
                {errors.petTypes && <div className="error-message">{errors.petTypes}</div>}
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
                <label className={`checkbox-container ${errors.acceptTerms ? 'checkbox-container-error' : ''}`}>
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
                {errors.acceptTerms && <div className="error-message">{errors.acceptTerms}</div>}
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