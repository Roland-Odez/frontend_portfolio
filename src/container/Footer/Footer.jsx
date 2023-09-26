import React, { useState } from 'react';
import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../Wrapper';
import { urlFor, client } from '../../client';

import './Footer.scss';

function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { name, email, message } = formData

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = () => {
    setLoading(true)

    const contact = {
      _type: 'contact',
      name, email, message
    }

    client.create(contact)
      .then(() => {
        setLoading(false)
        setIsFormSubmitted(true)
      })
  }
  return (
    <>
      <h2 className="head-text">Take A Coffee And Chat With Me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:breezyroland@gmail.com" className='p-text'>Breezyroland@gmail.com</a>
        </div>

        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +2347016883820" className='p-text'>+2347016883820</a>
        </div>
      </div>

      {!isFormSubmitted ?
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input type="text" placeholder='Your name' value={name} name="name" onChange={handleChangeInput} />
          </div>

          <div className="app__flex">
            <input type="email" placeholder='Your email' value={email} name="email" onChange={handleChangeInput} />
          </div>

          <div>
            <textarea placeholder='Your Message' name="message" value={message} onClick={handleChangeInput} cols="30" rows="10"></textarea>
          </div>
          <button type='button' onClick={handleSubmit}>{loading ? 'Sending' : 'Send message'}</button>
        </div>
        : <div>
          <h3 className='head-text'>Thank you for getting in touch</h3>
        </div>}
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  "contact",
  "app__whitebg"
)