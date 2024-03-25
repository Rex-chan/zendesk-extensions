import {useState,useEffect} from "react"
import './popup.css';
import logoBase64 from "data-base64:~assets/big-logo-white.png"
// @ts-ignore
import {useStorage} from "@plasmohq/storage/hook"
import { Storage } from "@plasmohq/storage"

function IndexPopup() {
  const storage = new Storage()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useStorage("access_token", null);
  const [isRemember, setIsRemember] = useStorage("isRemember", true)

  const getUserInfoFormStorage = async () => {
    return await storage.get("userInfo")
  }
  useEffect(() => {
    getUserInfoFormStorage().then(res => {
      console.log(res);
      if(res){
        setUsername(res.username)
        setPassword(res.password)
      }
    });
  }, [])
  const handleLogin = async () => {
    fetch('https://erp-dev.decimalpoint.com.cn/dev-api/auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data.code === 200) {
          if (isRemember) {
            storage.set("userInfo", {username: username, password: password})
          } else {
            storage.set("userInfo", '')
          }
          setToken(data.data.access_token)
          let [tab] = await chrome.tabs.query({active: true, currentWindow: true})
          chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: reloadContentPage
          })
        } else {
          alert(data.msg)
        }
      })
      .then(() => {
      })
      .catch((err) => {
        console.log(err)
      })
  };
  function reloadContentPage() {
    location.reload()
  }
  function handleLogout() {
    setToken(null);
    if (!isRemember){
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div className="box">
      {token ? (
        <p>用户已登录</p>
      ) : (
        <p>用户未登录</p>
      )}
      <div className="big-title">
        <div className="logo">
          <img src={logoBase64} alt="Micas"/>
        </div>
        <div className="text">zendesk客服插件</div>
      </div>
      <div className="login-box">
        {token ? (
          <div>
            <button className="btn" onClick={handleLogout}>退出登录</button>
          </div>
        ) : (
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
            <div className="form-group">
              <input type="checkbox"
                     checked={isRemember}
                     onChange={(e) => setIsRemember(e.target.checked)}/>
              <label htmlFor="remember">记住登录信息</label>
            </div>
            <div className="form-group">
              <button className="btn" onClick={handleLogin}>登录</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default IndexPopup

