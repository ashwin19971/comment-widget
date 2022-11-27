import React, { Component, useEffect, useState } from 'react';

import CommentBox from './components/CommentBox';
import { commentWidgetLabel, defaultRoles, noAccessLabel } from './constants';

import './index.scss';

const CommentSection = () => {
  const [commentsInfo, setCommentsInfo] = useState([]);
  const [roles, setRoles] = useState(defaultRoles);

  const saveCommentsInfo = () => {
    // Maintaining data in local storage
    localStorage.setItem('commentsInfo', JSON.stringify(commentsInfo));
  }

  useEffect(() => {
    // Applying user roles
    const roles = JSON.parse(localStorage.getItem('rolesInfo'));
    if(roles){
      setRoles(roles);
    } else {
      localStorage.setItem('rolesInfo', JSON.stringify(defaultRoles));
    }

    // Fetching data from local storage
    const data = JSON.parse(localStorage.getItem('commentsInfo'));
    if (data) {
      setCommentsInfo(data);
    }
  }, []);

  return (
    <div className="comment-section-root">
      <p className="title">{commentWidgetLabel}</p>
      {
        roles.canRead ?
          <CommentBox
            roles={roles}
            commentsInfo={commentsInfo}
            setCommentsInfo={setCommentsInfo}
            saveCommentsInfo={saveCommentsInfo}
          /> : noAccessLabel
      }
    </div>
  );
};

export default CommentSection;
