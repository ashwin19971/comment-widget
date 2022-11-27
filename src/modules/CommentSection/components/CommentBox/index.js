import React, { Component, useState } from 'react';

import CommentLine from '../CommentLine';
import DeleteLine from '../DeleteLine';
import { enterCommentLabel, postLabel } from '../../constants';
import './index.scss';
import InputBox from '../InputBox';
import { getTime } from '../../utils';

const CommentBox = ({
    roles,
    btnLabel,
    className,
    placeholderText,
    commentsInfo,
    setCommentsInfo,
    saveCommentsInfo
}) => {
    const [text, handleText] = useState();

    const handleSubmit = () => {
        handleText('');
        setCommentsInfo([...commentsInfo, { value: text, isDeleted: false, time: getTime(), comments: [] }]);
        saveCommentsInfo();
    };

    const handleTextChange = (e) => {
        const data = e.target.value;
        if (data.length <= 100) {
            handleText(e.target.value)
        }
    }

    return (
        <div className={`comment-box-root ${className}`}>
            {
                roles.canWrite ?
                    <InputBox
                        text={text}
                        placeholderText={placeholderText || enterCommentLabel}
                        handleTextChange={handleTextChange}
                        btnLabel={btnLabel || postLabel}
                        handleSubmit={handleSubmit}
                    /> : ''
            }
            {
                commentsInfo.map(({ time, value, isDeleted }, index) =>
                    isDeleted ?
                        <DeleteLine key={index} text={value} /> :
                        <CommentLine
                            key={index}
                            index={index}
                            time={time}
                            text={value}
                            roles={roles}
                            commentsInfo={commentsInfo}
                            setCommentsInfo={setCommentsInfo}
                            saveCommentsInfo={saveCommentsInfo}
                        />
                )
            }
        </div>
    );
};

export default CommentBox;
