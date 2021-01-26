import './About.scss';
import React from 'react';
import {Link} from 'react-router-dom';

const About = () => {
    return (
        <div className="about-container">
           <h1>About Me</h1>
           <p className="about">
           <img src="https://firebasestorage.googleapis.com/v0/b/cakedilemma.appspot.com/o/main%2Femma.jpeg?alt=media&token=e512c598-af18-45b9-97fe-6b0bd916fa50" alt="about me" />
           <br/><br/>
           Hi! I’m Emma, just a girl who loves to bake. I’ve been baking since 9 years old when my mum got me a baking set for Christmas. 
           I didn’t even have an electric whisk so my older brother had to do all the heavy whisking, yes, he even hand-whisked meringues! 
           <br/><br/>
           Since then, baking has always been such a huge part of my life, a way to be creative and experiment with different flavours and techniques. 
           I launched The Cake Dilemma to kickstart a career that I am truly passionate about and I hope you enjoy my bakes as much as I love making them for you! 
           <br/><br/>
           Thank you to everyone who has supported me and my journey so far and I cannot wait to see where this path leads.
           <br/><br/>
           If you have any questions, suggestions or opinions to share with me, please don’t hesitate to get in contact via WhatsApp, email, Instagram DM or Facebook Messenger. Contact information is in <Link to="/faqs">FAQs</Link>!
           <br/><br/>
           With Love,
           <br/><br/>
           Emma x
           </p>
        </div>
    )
}

export default About
