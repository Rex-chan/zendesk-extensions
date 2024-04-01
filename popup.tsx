import {useState,useEffect} from "react"
import './popup.css';
import logoBase64 from "data-base64:~assets/big-logo-white.png"
// @ts-ignore
import {useStorage} from "@plasmohq/storage/hook"
import { Storage } from "@plasmohq/storage"
import Button from "antd/es/button"
import DatePicker from "antd/es/date-picker"

import { ThemeProvider } from "~theme"
import { SearchOutlined } from '@ant-design/icons';
import Table from "~node_modules/antd/es/table";
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
          /*let [tab] = await chrome.tabs.query({active: true, currentWindow: true})
          chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: reloadContentPage
          })*/
        } else {
          setToken(null);
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
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  return (
    <div className="box">
      {/*{token ? (*/}
      {/*  <p>用户已登录</p>*/}
      {/*) : (*/}
      {/*  <p>用户未登录</p>*/}
      {/*)}*/}

      {/*<DatePicker placeholder="select date" />*/}
      {/*<Table dataSource={dataSource} columns={columns} />;*/}

      {/*<ThemeProvider>*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      display: "flex",*/}
      {/*      flexDirection: "column",*/}
      {/*      padding: 16,*/}
      {/*      width:500*/}
      {/*    }}>*/}
      {/*    <h1>*/}
      {/*      Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!*/}
      {/*    </h1>*/}
      {/*    <DatePicker placeholder="select date11" getPopupContainer={triggerNode => triggerNode.parentNode}/>*/}

      {/*  </div>*/}
      {/*</ThemeProvider>*/}
      <p>UI Test Start</p>
      <DatePicker placeholder="select date" />
      <p>UI Test end </p>
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

