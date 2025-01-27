import React from 'react';
import { Space, Button } from 'antd';

export default () => {

    const onClick = () => {
        fetch("/button/1", {
            "method": "GET"
        });
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
