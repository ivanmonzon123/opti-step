import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/components/CollapsibleInfoComp.css";

export default function CollapsibleInfoComp({ feedback }) {
  const [open, setOpen] = useState(false);
  const { icon, type, title, description, advice } = feedback;

  const getIconStyles = (feedbackType) => {
    const colors = {
      success: "#00CC00",
      warning: "#FFA500",
      error: "#F24E1E",
    };

    return { color: colors[feedbackType] ?? "", "font-size": "20px" };
  };

  return (
    <article className="collapsible-info-container">
      <section
        className="collapsible-info-content-header"
        onClick={() => setOpen(!open)}
      >
        <FontAwesomeIcon icon={icon} style={getIconStyles(type)} />

        <label className="os-txt-md">{title}</label>
      </section>

      <Collapse in={open}>
        <section className="collapsible-info-content-body">
          <label>{description}</label>

          {advice?.empty ? (
            ""
          ) : (
            <section>
              <label className="os-txt-bold mb-1">Sugerencia:</label>
              
              {Object.entries(advice?.message ?? {}).map(([key, value]) => (
                <section>
                  <strong>{key}:</strong> {value}
                </section>
              ))}
            </section>
          )}
        </section>
      </Collapse>
    </article>
  );
}
