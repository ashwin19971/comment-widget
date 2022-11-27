import React, { Component } from 'react';

import Button from '../../../../components/Button';
import { cancelLabel } from '../../constants';
import './index.scss';

const InputBox = ({
    className,
    text,
    placeholderText,
    handleTextChange,
    btnLabel,
    handleSubmit,
    showCancel,
    handleCancelBtn
}) => {

    const checkDisable = !text || /^\s*$/.test(text);

    return (
        <form className={`input-box-root ${className}`} onSubmit={handleSubmit}>
            <input
                placeholder={placeholderText}
                className='input-box'
                value={text}
                onChange={handleTextChange}
            />
            <Button
                label={btnLabel}
                isDisabled={checkDisable}
                handleBtnClick={handleSubmit}
            />
            {
                showCancel &&
                <p
                    className='ml10 mb5 align-bottom f-14 d-inline-block bold c-pointer action-btn'
                    onClick={handleCancelBtn}
                >
                    {cancelLabel}
                </p>
            }
        </form>
    );
};

export default InputBox;
