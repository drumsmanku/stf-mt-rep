import React from "react";
import PropTypes from "prop-types";

function ProBadge({ text, cls = "bg-yellow-400" }) {
  return (
    <span
      className={`text-black text-xs font-semibold px-2 py-1 rounded ${cls}`}
    >
      {text}
    </span>
  );
}

// Making the text prop mandatory
ProBadge.propTypes = {
  text: PropTypes.string.isRequired,
  cls: PropTypes.string,
};

export default ProBadge;
