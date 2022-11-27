import React, { Component, useEffect, useState } from 'react';

import {
    editLabel,
    deleteLabel,
    replyLabel,
    enterReplyLabel,
    updatePlaceholderLabel,
} from '../../constants';
import CommentBox from '../CommentBox';
import InputBox from '../InputBox';
import './index.scss';

const CommentLine = ({
    roles,
    index,
    text,
    time,
    commentsInfo,
    setCommentsInfo,
    saveCommentsInfo
}) => {
    const [showCommentBox, handleShowCommentBox] = useState(commentsInfo[index]?.comments && commentsInfo[index]?.comments.length > 0 ? true : false);
    const [isEdit, handleEditBtn] = useState(false);
    const [editText, handleEditText] = useState(text);

    const [replyCommentsInfo, handleReplyCommentsInfo] = useState(commentsInfo[index]?.comments);

    useEffect(() => {
        commentsInfo[index].comments = [...replyCommentsInfo];
        saveCommentsInfo();
    }, [replyCommentsInfo]);

    const handleEditClick = () => {
        commentsInfo[index].value = editText;
        setCommentsInfo([...commentsInfo]);
        saveCommentsInfo();
        toggleEdit();
    }

    const handleDelete = () => {
        commentsInfo[index].isDeleted = true;
        setCommentsInfo([...commentsInfo]);
        saveCommentsInfo();
    };

    const toggleEdit = () => {
        handleEditBtn(!isEdit);
    }

    const handleReply = () => {
        handleShowCommentBox(true);
    };

    const handleEditTextChange = (e) => {
        const data = e.target.value;
        if (data.length <= 100) {
            handleEditText(e.target.value)
        }
    }

    return (
        <div className='comment-line-root'>
            {
                isEdit ?
                    <InputBox
                        text={editText}
                        placeholderText={updatePlaceholderLabel}
                        handleTextChange={handleEditTextChange}
                        btnLabel={editLabel}
                        handleSubmit={handleEditClick}
                        showCancel={true}
                        handleCancelBtn={toggleEdit}
                    /> :
                    <>
                        <p className='mr5 f-14 d-inline-block bold'>{time}</p>
                        <p className='mr5 f-14 d-inline-block'>{text}</p>
                        {
                            roles.canWrite && roles.canEdit ?
                                <p
                                    className='ml5 f-14 d-inline-block blue bold c-pointer action-btn'
                                    onClick={toggleEdit}
                                >
                                    {editLabel}
                                </p> : ''
                        }
                        {
                            roles.canDelete ?
                                <p
                                    className='ml5 mr5 f-14 d-inline-block red bold c-pointer action-btn'
                                    onClick={handleDelete}
                                >
                                    {deleteLabel}
                                </p> : ''
                        }
                        {
                            !showCommentBox && roles.canWrite ?
                                <p
                                    className='ml5 f-14 d-inline-block blue bold c-pointer action-btn'
                                    onClick={handleReply}
                                >
                                    {replyLabel}
                                </p> : ''
                        }
                        {
                            showCommentBox ?
                                <CommentBox
                                    key={index}
                                    index={index}
                                    roles={roles}
                                    className='mt10 ml15'
                                    placeholderText={enterReplyLabel}
                                    btnLabel={replyLabel}
                                    commentsInfo={replyCommentsInfo}
                                    setCommentsInfo={handleReplyCommentsInfo}
                                    saveCommentsInfo={saveCommentsInfo}
                                /> : ''
                        }
                    </>
            }
        </div>
    );
};

export default CommentLine;