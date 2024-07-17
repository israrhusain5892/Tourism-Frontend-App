import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactUs.css'

function ContactUs() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMessageSent, setMessageSent] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleSend = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const emailParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      message: formData.get('message'),
    };

    emailjs.send('service_6fba6ot', 'template_jtaowm3', emailParams, 'kfmE6H6G0rNxfEtky')
      .then((result) => {
        console.log(result.text);
        setMessageSent(true);
        setModalOpen(false);
      }, (error) => {
        console.log(error.text);
      });

    form.reset();
  };

  return (
    <div className="w-full h-[400px] relative h-[400px] bg-fixed bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' }}>
      <div className="flex flex-col items-center justify-center h-full bg-blue-400 bg-opacity-20">
        <h1 className="text-4xl md:text-[2.5rem] lg:text-[2.75rem] xl:text-[3rem] font-playfair font-bold text-lime-100 mb-4">Contact us if you're ready</h1>
        <h3 className="text-lg md:text-xl lg:text-[1.75rem] xl:text-[2rem] font-playfair font-bold text-yellow-50 mb-6">Experience the wonders of India with personalized tours crafted just for you.</h3>
        <button 
          className="font-semibold px-4 h-12 w-60 text-lg md:text-xl lg:text-[1.75rem] xl:text-[2rem] text-[#600180] bg-transparent border-2 border-[#600180] rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-[#600180] hover:text-[#ffffff]"
          onClick={toggleModal}
        >
          CONTACT US
        </button>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="card">
            <p className="heading">Contact Us</p>
            <form onSubmit={handleSend}>
              <div className="input-div">
                <input type="text" name="name" className="input" placeholder="Name" required />
              </div>
              <div className="input-div">
                <input type="email" name="email" className="input" placeholder="Email" required />
              </div>
              <div className="input-div">
                <input type="text" name="message" className="input" placeholder="Message" required />
              </div>
              <div className="button-div">
                <button type="submit" className="submit">Send</button>
                <button type="button" className="submit" onClick={toggleModal}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isMessageSent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="card">
            <p className="heading">Message Successfully Sent</p>
            <div className="button-div">
              <button className="submit" onClick={() => setMessageSent(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactUs;
