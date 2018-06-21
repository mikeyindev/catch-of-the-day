import React from 'react';
import PropTypes from 'prop-types';

// Stateless function. Props is no longer bound to react but passed directly as 
// argument. Can also be written as:
// function Header(props) {}
const Header = (props) => {
  return(
    <header className="top">
      <h1>
        Cornucopia
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Sea
      </h1>
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  )
}

Header.propTypes = {
    tagline: PropTypes.string.isRequired
}

export default Header;