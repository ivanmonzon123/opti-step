import React from 'react';
import {Card, Modal} from 'react-bootstrap';
import "../styles/components/AboutMeComp.css"
import Avatar from "../images/about-me-image.jpeg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import {faInstagram} from "@fortawesome/free-brands-svg-icons";
import {faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {Link} from "react-router-dom";

const AboutMeModal = ({show$, setShow$}) => {
  const handleClose = () => setShow$(false);
  // const handleShow = () => setShow$(true);

  return (
     <Modal show={show$} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="about-me-modal-container"
     >
       <Modal.Header closeButton>
         <Modal.Title className="os-txt">Acerca de mí</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <label className="os-txt text-center mb-2">
           ¡Hola! Soy Iván Monzón, estudiante de sistemas en la UMSS. Mi pasión por la programación y la industria del calzado me llevó a desarrollar esta aplicación para la toma de decisiones basada en algoritmos de programación lineal.
         </label>

         <section className="about-me-modal-card">
           <Card className="os-sm-shadow">
             <Card.Body>
               <section className="about-me-modal-card-personal-info">
                 <img src={Avatar} alt="about-me-avatar"/>

                 <section>
                   <label className="os-txt os-txt-md">Ivan <span className="text-black">Monzon Yujra</span></label>

                   <label className="os-txt os-txt-sm">ivanmonzon000@gmail.com</label>

                   <label className="os-txt os-txt-sm">71468885</label>
                 </section>
               </section>
             </Card.Body>
           </Card>

           <section className="about-me-modal-card-skills-info mt-4">
             <FontAwesomeIcon icon={faFacebook} />
             <FontAwesomeIcon icon={faInstagram} />
             <FontAwesomeIcon icon={faLinkedin} />
           </section>
         </section>
       </Modal.Body>
     </Modal>
  );
};

export default AboutMeModal;
