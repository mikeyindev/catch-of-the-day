import React from 'react';

// Stateless function. Props is no longer bound to react but passed directly as 
// argument. Can also be written as:
// function Header(props) {}
const Header = (props) => {
    return(
        <header className="top">
            <h1>
                Catch
                <span className="ofThe">
                    <span className="of">of</span>
                    <span className="the">the</span>
                </span>
                Day
            </h1>
            <h3 className="tagline"><span>{props.tagline}</span></h3>
        </header>
    )
}

Header.propTypes = {
    tagline: React.PropTypes.string.isRequired
}

export default Header;