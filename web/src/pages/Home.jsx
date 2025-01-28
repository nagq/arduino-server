import React, { useEffect, useState } from "react";
import { Switch } from 'antd';

const Home = () => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetch("/status", {
            "method": "GET"
        }).then(resp => resp.text())
        .then((resp) => {
            setStatus(resp);
        })
    })

    const onChange = (checked) => {
        fetch(checked ? "/open" : "/close", {
            "method": "POST"
        })
    };

    return (
        <div>
            ESP Board
            <div>
                {status}
            </div>
            <Switch defaultChecked onChange={onChange} />
        </div>
    )
};

export default Home;
