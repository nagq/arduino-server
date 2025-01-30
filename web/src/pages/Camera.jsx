import React, { useEffect } from 'react';
import { Space, Button } from 'antd';

const Component = () => {
    return (
        <div>
            <iframe
                src='/camera'
                style={{
                    width: '100%',
                    minHeight: '100vh',
                }}
            />
        </div>
    )
};

export default Component;
