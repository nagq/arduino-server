import React from 'react';
import { Space, Button } from 'antd';

const Component = () => {

    const onClick = () => {
        fetch("/action", {
            "body": {
                
            },
            "method": "POST"
        }).then(resp => resp.json()).then(console.info);
    };

    return (
        <div>
            <Space>
                <Button onClick={() => onClick(1)}>1</Button>
                <Button onClick={() => onClick(2)}>2</Button>
            </Space>
        </div>
    )
};

export default Component;
