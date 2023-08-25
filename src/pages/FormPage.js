import "../styles/pages/HomePage.css"
import "../styles/pages/FormPage.css"
import OrderDetailsComp from "../components/OrderDetailsComp";

export default function FormPage() {
  return (
      <article className="forms-container">
        <article className="forms-content">
          <section className="forms-order-details-title">
            <label className="os-txt os-txt-lg os-txt-bold">Detalles del pedido</label>
          </section>

          <OrderDetailsComp/>

          <section className="forms-order-details-buttons">
            <button className="btn btn-primary">
              <label className="os-txt">cancelar</label>
            </button>

            <button className="btn btn-primary">
              <label className="os-txt">siguiente</label>
            </button>
          </section>

        </article>
      </article>
  );
}