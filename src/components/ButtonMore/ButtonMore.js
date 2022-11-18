import React from 'react';
import './ButtonMore.css';

function ButtonMore({ onClick }) {
  return (
    <section className="movies__container-with-button">
      <button className="movies__button" type='button' onClick={onClick}>
        Ещё
      </button>
    </section>
  );
}
export default ButtonMore;

