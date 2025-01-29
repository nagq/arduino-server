import React, { useEffect } from 'react';
import { Space, Button } from 'antd';

const Component = () => {
    useEffect(() => {
        // 初始化
    }, [])

    const onClick = () => {
        fetch("/action", {
            "body": {
                
            },
            "method": "POST"
        }).then(resp => resp.json()).then(console.info);
    };

    return (
        <div>
            <div>Page05</div>

            <Space>
                <Button onClick={onClick}>1</Button>
            </Space>
        </div>
    )
};

export default Component;
