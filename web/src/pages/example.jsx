import React from 'react';
import { Space, Button } from 'antd';

const TestB = () => {

    const onClick1 = () => {
        fetch("/action", {
            "body": {
                
            },
            "method": "POST"
        }).then(resp => resp.json()).then(console.info);
    };

    const onClick2 = () => {
        fetch("/action/a", {
            "body": {
                
            },
            "method": "POST"
        }).then(resp => resp.json()).then(console.info);
    };

    return (
        <div>
            <Space>
                <Button onClick={onClick1}>1</Button>
                <Button onClick={onClick2}>2</Button>
            </Space>
        </div>
    )
};

export default TestB;
