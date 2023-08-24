import "../styles/pages/HomePage.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowRight} from "@fortawesome/free-solid-svg-icons"
export default function HomePage() {
  return (
      <article className="home-container">
        <section className="home-content">
          <section className="home-start">
            <section className="home-start-tittle">
              <label className="os-txt os-txt-xl home-start-main-tittle">Toma las mejores decisiones con <span className="home-application-name">Opti</span>Step</label>

              <label className="os-txt os-txt-sm">
                <FontAwesomeIcon icon={faArrowRight}/> En cualquier lugar y en cualquier momento
              </label>
            </section>

            <section className="d-flex justify-content-center">
              <button className="os-btn os-btn-primary home-start-button">
                <label className="os-txt os-txt-lg">Comenzar a optimizar</label>
              </button>
            </section>
          </section>

          <section className="home-footer">
            <label className="os-txt os-txt-sm">
              <span className="home-application-name">Opti</span>Step maneja algoritmos de programación lineal que nos permite obtener la mejor solución al problema
            </label>
          </section>
        </section>
      </article>
  );
}