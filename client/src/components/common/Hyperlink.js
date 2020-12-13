import React from 'react';
import { Link } from 'react-router-dom';

const Hyperlink = ({ text, to }) => (
  <Link
    to={to}
    className="anchor"
  >
    {text}
  </Link>
);

export default Hyperlink;
