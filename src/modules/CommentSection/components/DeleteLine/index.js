import React, { Component } from 'react';

import { deletedLabel } from '../../constants';
import './index.scss';

const DeleteLine = ({ text }) => {
    return (
        <div className='delete-line-root f-14 italic mt10 mb10'>
            <p className='d-inline-block blue'>{text}</p>&nbsp;
            <p className='d-inline-block red'>{deletedLabel}</p>
        </div>
    );
};

export default DeleteLine;