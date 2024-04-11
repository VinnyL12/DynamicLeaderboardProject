import React from 'react';
import "../assets/Breadcrumb.css";
import caret from '../images/angles-left-solid.svg';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items, state }) => {

    return (
        <div className="breadcrumb-container">
            <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                    {items.map((item, index) => (
                        <div className='list-item'>
                            {index !== 0 ?
                                <img className="sideCaret" src={caret}></img> :
                                <></>
                            }
                            <li key={index} className="breadcrumb-item">
                                {index === items.length - 1 ? (
                                    <span>{item.label}</span>
                                ) : (
                                    <Link to={item.link} state={state}>{item.label}</Link>
                                )}
                            </li>
                        </div>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Breadcrumb;