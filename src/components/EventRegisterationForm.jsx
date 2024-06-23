import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast';

function EventRegisterationForm() {


  const [selectedOption,setSelectedOption] = useState('');
  const [guestOption,setGuestOption] = useState('');
  const [submitted,setSubmitted] = useState(false);
  const [errors,setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState({});
  const [guestData,setGuestdata] = useState('');
  const [displayData,setDisplayData] = useState({});
  const [data,setData] = useState({
    name : '' ,
    email : '',
    age : '',
    guestname : ''
  })

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setGuestOption(e.target.value);
  }

  let activeToast = false ;

  const validateForm = () => {
    const { name, email, age, guestname} = data;
    const errors = {};
  
    if (!name ) {
      errors.name = 'Name is required';
     if(!activeToast){
      toast.error('Name is required');
      activeToast = true ;
     }
    }
  
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      errors.email = 'Email is required';
      if(!activeToast){
        toast.error('Email is required and should be in a valid format');
        activeToast = true ;
      }
    }
  
    if (!age || isNaN(age) || age <= 0) {
      errors.age = 'Age is required';
      if(!activeToast){
        toast.error('Age is required and should be greater than zero');
        activeToast = true ;
      }
    } 
    
    if(!selectedOption){
      errors.guestname = 'Option must be selected'
      if(!activeToast){
        toast.error('Select an option for guest');
        activeToast = true ;
      }
    }
  
    if (guestOption === 'yes' && !guestname) {
      errors.guestname = 'Guest name is required if attending with a guest';
      if(!activeToast){
        toast.error('Guest name is required if attending with a guest');
        activeToast = true ;
      }
    }
  
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
  
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setSubmitted(true);
      setSubmittedData(data);
      setGuestdata(guestOption);
      setData({name : '',email : '' , age : '' ,guestname :  ''});
      setSelectedOption('');
      setGuestOption('');
      toast.success('Your response has been submitted successfully!');
    }
  };

  useEffect(() => {
    if (submitted) {
      setDisplayData(data);
      const timer = setTimeout(() => {
        setSubmitted(false);
        setDisplayData({});
      }, 30000); // 30 Seconds 
      return () => {
        clearTimeout(timer);
      }
      
    }
  }, [submitted, data]);



  return (
    <div className="container pt-4">
      
      <div className="row justify-content-center ">
        <form 
        onSubmit={handleSubmit}   
        className="col-12 col-md-5 border border-3 rounded d-flex flex-column gap-3 py-3 shadow"
        >

        <h2 className='text-center text-primary bg-body-tertiary py-2'>
        Event Registeration Form
      </h2>

          <div className='text-center'>
            <label htmlFor="name">Name</label><br />
            <input 
            type="text" 
            className='w-75 border border-2 border-primary rounded px-3'
            style={{height:'2.5rem'}}
            placeholder='Enter Your Name...'
            value={data.name}
            onChange={(e)=>setData({...data , name : e.target.value})}
            />
          </div>

          <div className='text-center'>
            <label htmlFor="email">Email</label><br />
            <input 
            type="email" 
            className='w-75 border border-2 border-primary rounded px-3'
            style={{height:'2.5rem'}} 
            placeholder='Enter Your Email'
            value={data.email}
            onChange={(e)=>setData({...data , email : e.target.value})}
            />
          </div>

          <div className='text-center'>
            <label htmlFor="number">Age</label><br />
            <input 
            type="number" 
            className='w-75 border border-2 border-primary rounded px-3'
            style={{height:'2.5rem'}}
            placeholder='Enter Your Age'
            value={data.age}
            onChange={(e)=> setData({...data, age : e.target.value})}
            />
          </div>

          <div className='text-center'>
            <label htmlFor="guests">
              Are you attending with a guest ?
            </label>
            <br />
            <input 
            type="radio" 
            name='guests' 
            value='yes' 
            className='me-1' 
            checked={guestOption === 'yes'}
            onChange={handleOptionChange}
            />
            <label>Yes</label>
            <span className='me-3'></span>
            <input 
            type="radio" 
            name='guests' 
            value='no' 
            className='me-1'
            checked={guestOption === 'no'}
            onChange={handleOptionChange} 
            />
            <label className='mb-0'>No</label>
          </div>

          {guestOption==='yes' && (
            <div className='text-center'>
            <label htmlFor="guestName">Guest Name</label><br />
            <input 
            type="text" 
            className='w-75 border border-2 border-primary rounded px-3'
            style={{height:'2.5rem'}}
            placeholder='Enter Guest Name ...'
            value={data.guestname}
            onChange={(e)=> setData({...data,guestname : e.target.value})}
             />
          </div>
          )}

          <div className="text-center">
            <button 
            type='submit'
            className='border border-1 rounded p-2 btn btn-primary'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="d-flex flex-column align-items-center jsutify-content-center my-3 ">
      {submitted && (
            <div className='justify-content-start border border-4 p-3 shadow'>
              <h3 className='text-success fw-bold'>Your Response has been recieved !</h3>
              <p> 
                <span className="text-primary fw-bold">
                Make a note of your response if required
                </span>
                <span> , </span>
                <span className="text-warning fw-bold">
                it will disappear in 30 sec </span> 
              </p>
              <ul style={{listStyleType:'none'}}>

                <li>
                  <span className='fw-bold'>
                    Name : 
                  </span>
                  <span> </span>
                  <span>
                    {submittedData.name}
                  </span>
                </li>

                <li>
                  <span className='fw-bold'>
                    Email : 
                  </span>
                  <span> </span>
                  <span>
                    {submittedData.email}
                  </span>
                </li>
                <li>
                  <span className='fw-bold'>
                    Age : 
                  </span>
                  <span> </span>
                  <span>
                    {submittedData.age}
                  </span>
                </li>
                
                {guestData === 'yes' && (
                  <li>
                    <span className='fw-bold'>
                      Guest Name :
                    </span>
                    <span>
                      {submittedData.guestname}
                    </span>
                  </li>
                )}

              </ul>
            </div>
          )} 
      </div>
    </div>
  )
}

export default EventRegisterationForm