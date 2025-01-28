import React, { useEffect } from 'react';
import { Space, Switch } from 'antd';

const TestB = () => {
    useEffect(() => {
        fetch("/action/status", {
            "method": "GET"
        }).then(resp => resp.json());
    }, []);

    const onChange = (checked) => {
        fetch(checked ? "/action/on" : "/action/off", {
            "body": {
                
            },
            "method": "POST"
        }).then(resp => resp.json()).then(console.info);
    };

    return (
        <div>
            <Space>
                <Switch checkedChildren="ON" unCheckedChildren="OFF" onChange={onChange} />
            </Space>
        </div>
    )
};

export default TestB;
