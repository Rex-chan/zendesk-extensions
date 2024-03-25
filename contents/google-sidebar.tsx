import iconBase64 from "data-base64:~assets/icon.png"
import cssText from "data-text:~/contents/google-sidebar.css"
import type {PlasmoCSConfig} from "plasmo"
import {useEffect, useState} from "react"
import {useStorage} from "@plasmohq/storage/hook"

// Inject to the webpage itself
import "./google-sidebar-base.css"

export const config: PlasmoCSConfig = {
  // matches: ["https://www.google.com/*","https://www.plasmo.com/"]
  matches: ["https://micas.zendesk.com/agent/tickets/*"],
  run_at: "document_idle"
}
// Inject into the ShadowDOM
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getShadowHostId = () => "plasmo-google-sidebar"

const GoogleSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSilderCtrl, setShowSilderCtrl  ] = useState(false)
  const [token] = useStorage<string>("access_token")
  const [curEmail, setCurEmail] = useState('')
  const [orders, setOrders] = useState([]);
  const bindClick = false
  useEffect(() => {
    document.body.classList.toggle("plasmo-google-sidebar-show", isOpen)
  }, [isOpen])
  useEffect(() => {
    function bindClickOnElement(element) {
      element.addEventListener('click', function () {
        console.log('点击事件已触发');
        setIsOpen(false)
        setTimeout(function () {
          let email = document.querySelector('.ticket-panes-grid-layout.active [data-garden-id="tags.avatar"]')
          console.log(email);
          setCurEmail(email && email.alt)
        }, 1000)
      });
    }

    const observer = new MutationObserver(function (mutationsList, observer) {
      const targetToolbar = document.querySelector('[data-test-id="header-toolbar"]');
      const targetEmail = document.querySelector('.ticket-panes-grid-layout.active [data-garden-id="tags.avatar"]')
      if (targetToolbar && targetEmail) {
        console.log(targetToolbar);
        console.log(targetEmail);
        setCurEmail(targetEmail.alt)
        console.log('curEmail', curEmail);
        bindClickOnElement(targetToolbar);
        observer.disconnect();
      }
    });
    const config = {childList: true, subtree: true, attributes: false};
    observer.observe(document.body, config);
  }, []);
  const fetchOrders = async () => {
    setShowSilderCtrl(false)
    try {
      fetch('https://erp-dev.decimalpoint.com.cn/dev-api/oms/order/get/page', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: curEmail,
        })
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.code === 200) {
            const { records } = res.data
            if(records.length > 0){
              setOrders(records)
              setIsOpen(true)
              setShowSilderCtrl(true)
            }
          } else {
            alert(res.msg)
          }
        })
        .then(() => {
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  window.onload = function () {
    console.log('onload 页面加载完成！');
  };
  useEffect(() => {
    console.log(curEmail);
    if (!token) return
    fetchOrders();
  }, [curEmail]);

  return (
    <div>
      {token && curEmail && showSilderCtrl ? (
        <div id="sidebar" className={isOpen ? "open" : "closed"}>
          <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
            {/*{isOpen ? "🟡" : "🟣 "}*/}
            {isOpen ? "😀" : "😎 "}
          </button>
          {token ? "已经登录" : "未登录"}
          <ul>
            {orders.map((order, index) => (
              <li key={index}>id:{order.id} - {order.email} - {order.orderRemark}</li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default GoogleSidebar
