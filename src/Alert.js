import React, { useEffect } from 'react';

const Alert = ({ alert }) => {
  const { type, msg } = alert;
  return <>
    <p className={`alert alert-${type}`}>{msg}</p>
  </>;
};

export default Alert;
