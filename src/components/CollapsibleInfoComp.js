import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/components/CollapsibleInfoComp.css";

export default function CollapsibleInfoComp({ feedback }) {
  const [open, setOpen] = useState(false);
  const { icon, type, title, description } = feedback;

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

        <label>{title}</label>
      </section>

      <Collapse in={open} className="collapsible-info-content-body">
        <section>{description}</section>
      </Collapse>
    </article>
  );
}
