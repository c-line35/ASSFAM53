import React from 'react';
import { Rate } from 'antd';

const BookNote = ({ notice }) => {
    return (
        <div>
            <Rate disabled value={notice.level} />
        </div>
    );
};

export default BookNote;