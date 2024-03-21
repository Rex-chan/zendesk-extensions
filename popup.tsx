import {useState} from "react"
import './popup.css';
import logoBase64 from "data-base64:~assets/big-logo-white.png"
// @ts-ignore
import {Storage} from "@plasmohq/storage"

const storage = new Storage()

function IndexPopup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        // 假设这里是向服务器发送登录请求，并且获取到token
        await storage.set("token", "abc11")
        const data = await storage.get("token") // "value"
        console.log(12221, data);

        // 将token存储在localStorage中
        // localStorage.setItem('token', token);
    };

    return (
        <div className="box">
            <div className="big-title">
                <div className="logo">
                    <img src={logoBase64} alt="Micas"/>
                </div>
                <div className="text">zendesk客服插件</div>
            </div>
            <div className="login-box">
                <div id="guest-part">
                    <div className="form-group">
                        <input
                            className="form-input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="请输入ERP账号"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="请输入ERP密码"
                        />
                    </div>
                    {/*<div className="form-group">*/}
                    {/*    <input type="checkbox" id="remember" name="remember" value="remember"/>*/}
                    {/*    <label htmlFor="remember">记住登录信息</label>*/}
                    {/*</div>*/}
                    <div className="form-group">
                        <button className="btn" onClick={handleLogin}>登录</button>
                    </div>
                </div>
                {/*<div id="user-part">*/}
                {/*    <div className="form-group">*/}
                {/*        数据收集到&nbsp;<a*/}
                {/*        target="_blank"*/}
                {/*        href="https://erp-test.decimalpoint.com.cn/buyer-center/selection-pool"*/}
                {/*    >选品池</a*/}
                {/*    >*/}
                {/*    </div>*/}
                {/*    <button className="btn" id="exit">退出登录</button>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default IndexPopup

