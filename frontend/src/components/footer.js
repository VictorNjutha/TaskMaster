import React from 'react';
import service1 from './src/images/service1.jpeg';
import container from './src/images/container.jpeg';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: '#010101', color: 'white' }}>
      <div className="container">
        <div className="row">

          <div className="col-md-3">
  <p style={{ color: 'gray', display: 'inline-block', marginBottom: '40px', marginTop: '40px' }}>
    To continuously provide high value services to our clients through alignment of our services to their needs, by making the client our focal point.
  </p>
  <button className="btn btn-primary">ABOUT US</button>
</div>

<div className="col-md-3">
    <h4 style={{ color: 'white', display: 'inline-block', marginBottom: '40px', marginTop: '40px' }}>
        <span style={{position: 'relative', zIndex: 1, borderBottom: '4px solid #007bff', paddingBottom: '10px'}}>Ne</span>
        <span style={{position: 'relative', zIndex: 0,}}>wsletter</span></h4>
    <p style={{ color: 'gray' }}>Subscribe to our newsletter to get our latest updates & news</p>
    <form>
        <input type="email" placeholder="Your email address" className="form-control mb-2" />
        <button type="submit" className="btn btn-primary">Subscribe</button>
    </form>
</div>

<div className="col-md-3">
    <h4 style={{ color: 'white', display: 'inline-block', marginBottom: '40px', marginTop: '40px' }}>
        <span style={{ position: 'relative', zIndex: 1,borderBottom: '4px solid #007bff',paddingBottom: '10px'}}>Of</span>
        <span style={{position: 'relative',zIndex: 0,}}>ficial Info:</span></h4>
        
        <div className="contact-info">
    <p className="location" style={{ color: 'gray' }}><span className="icon">&#127968;</span>Outering Road, Donholm, Nairobi</p>
    <p className="phone" style={{ color: 'gray' }}><span className="icon">&#128241;</span> +254 718 272 729 / +254 715 460 922</p>
</div>


    <p style={{ color: 'white', fontWeight: 'bold', textDecoration: 'underline' }}>Open Hours:</p>
    <p style={{ color: 'gray', marginBottom: '1px' }}>Mon - Sat: 8 am - 5 pm,</p>
    <p style={{ color: 'gray' }}>Sunday: CLOSED</p>
</div>

<div className="col-md-3">
    <h4 style={{ color: 'white', display: 'inline-block', marginBottom: '40px', marginTop: '40px' }}>
        <span style={{position: 'relative', zIndex: 1,borderBottom: '4px solid #007bff',paddingBottom: '10px'}}>Ou</span>
        <span style={{position: 'relative',zIndex: 0,}}>r Services</span></h4>
        <div className="row">
        <div className="col-sm-4">
            <img src={service1} alt="Service 1" className="img-fluid mb-3" />
        </div>
        <div className="col-sm-4">
            <img src={container} alt="Service 2" className="img-fluid mb-3" />
        </div>
        <div className="col-sm-4">
            <img src={service1} alt="Service 3" className="img-fluid mb-3" />
        </div>
        <div className="w-100"></div>
        <div className="col-sm-4">
            <img src={container} alt="Service 4" className="img-fluid mb-3" />
        </div>
        <div className="col-sm-4">
            <img src={service1} alt="Service 5" className="img-fluid mb-3" />
        </div>
        <div className="col-sm-4">
            <img src={container} alt="Service 6" className="img-fluid mb-3" />
        </div>
    </div>
</div>

        </div>
        {/* Copyright Notice */}
        <div className="row">
  <div className="col-md-12 text-center" style={{ borderTop: '1px solid gray',marginTop:'40px', paddingTop: '20px', paddingBottom: '10px' }}>
    <p>© 2024 Pace of Africa Ltd. All rights reserved.</p>
  </div>
</div>
</div>
    </footer>
  );
};

export default Footer;