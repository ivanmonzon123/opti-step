import "../styles/pages/HomePage.css"

export default function HomePage() {
  return (
      <article className="home-container">
        <section className="home-content">
          <section className="home-start">
            <section className="home-start-tittle">
              <label className="os-txt os-txt-xl home-start-tittle-main">Toma las mejores decisiones con OptiStep</label>

              <label className="os-txt os-txt-sm">--> En cualquier lugar y en cualquier momento</label>
            </section>

            <section className="d-flex justify-content-center">
              <button className="os-btn os-btn-primary home-start-button">
                <label className="os-txt os-txt-lg">Comenzar a optimizar</label>
              </button>
            </section>
          </section>

          <section className="home-footer">
            <label className="os-txt os-txt-sm">
              OptiStep maneja algoritmos de programación lineal que nos permite obtener la mejor solución al problema
            </label>
          </section>
        </section>
      </article>
  );
}