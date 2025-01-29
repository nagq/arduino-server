import React, { useEffect, useState } from 'react';
import { Space, Switch } from 'antd';

const TestB = () => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        fetch("/action/status", {
            "method": "GET"
        }).then(resp => resp.json())
        .then((resp) => {
            if (!Number(resp.code)) {
                setChecked(resp.result === 0);
            }
        })
    }, [])

    const onChange = (checked) => {
        setChecked(checked);
        fetch(checked ? "/action/on" : "/action/off", {
            "method": "POST"
        }).then(resp => resp.json()).then(console.info);
    };

    return (
        <div>
            <Space>
                <Switch
                    checkedChildren="ON"
                    unCheckedChildren="OFF"
                    checked={checked}
                    onChange={onChange}
                />
            </Space>
        </div>
    )
};

export default TestB;
