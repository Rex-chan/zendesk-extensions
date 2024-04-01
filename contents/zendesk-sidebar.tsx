import iconBase64 from "data-base64:~assets/icon.png"
import cssText from "data-text:~/contents/google-sidebar.css"
import cssTextBase from "data-text:~/contents/google-sidebar-base.css"
import cssTextTest from "data-text:~/contents/test.css"
import cssTextAntd from "data-text:~/contents/style-antd.css"
import {useEffect, useState} from "react"
import {useStorage} from "@plasmohq/storage/hook"
import antdResetCssText from "data-text:antd/dist/reset.css"
import OrderDetail from './zendesk-sidebar-detail';
import type {
  PlasmoCSConfig,
  PlasmoCSUIJSXContainer,
  PlasmoCSUIProps,
  PlasmoRender
} from "plasmo"
import type { FC } from "react"
import { createRoot } from "react-dom/client"
// Inject to the webpage itself
import "./google-sidebar-base.css"
import DatePicker from "antd/es/date-picker"
import { Table, Button, Modal } from 'antd';
export const config: PlasmoCSConfig = {
  // matches: ["https://www.google.com/*","https://www.plasmo.com/"]
  matches: ["https://micas.zendesk.com/agent/tickets/*"],
  run_at: "document_idle"
}
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = antdResetCssText
  return style
}
export const getRootContainer = () =>
  new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      const rootContainerParent = document.querySelector('body')
      if (rootContainerParent) {
        clearInterval(checkInterval)
        const rootContainer = document.createElement("div")
        rootContainerParent.appendChild(rootContainer)
        resolve(rootContainer)
      }
    }, 137)
  })
const ZendeskSidebar: FC<PlasmoCSUIProps> = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSilderCtrl, setShowSilderCtrl  ] = useState(false)
  const [token] = useStorage<string>("access_token")
  const [curEmail, setCurEmail] = useState('')
  const [orders, setOrders] = useState([{
    id: 1,
    customer: 'John Doe',
    date: '2022-01-01',
    amount: 100,
    status: 'Pending',}]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);

  // 点击操作按钮时显示订单详情弹窗
  const handleShowDetail = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  // 关闭弹窗
  const handleCloseModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    document.body.classList.toggle("zendesk-sidebar-show", isOpen)
  }, [isOpen])
  useEffect(() => {
    function bindClickOnElement(element: Element) {
      element.addEventListener('click', function () {
        console.log('点击事件已触发111');
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
  const columns = [
    {
      title: '订单号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleShowDetail(record)}>详情</Button>
      ),
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

  let getPopupContainerDatePicker= (triggerNode) => triggerNode.parentNode;
  return (
    <div id="zendesk-sidebar">
      {token && curEmail && showSilderCtrl ? (
        <div id="sidebar" className={isOpen ? "open" : "closed"}>
          <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
            {/*{isOpen ? "🟡" : "🟣 "}*/}
            {isOpen ? "😀" : "😎 "}
          </button>
          {token ? (<span>已经登录</span>) : "未登录1"}
          <DatePicker placeholder="select date11" getPopupContainer={triggerNode => triggerNode.parentNode}/>
          <Table columns={columns} dataSource={orders} />
          <Modal
            title="订单详情"
            open={open}
            onCancel={handleCloseModal}
            footer={null}
            getContainer={() => document.getElementById('zendesk-sidebar')}
            okText="确认"
            cancelText="取消"
          >
            {selectedOrder && <OrderDetail key={selectedOrder.id} order={selectedOrder} />}
          </Modal>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
     createRootContainer
   }) => {
  const rootContainer = await createRootContainer()
  const root = createRoot(rootContainer)
  root.render(<ZendeskSidebar />)
}

export default ZendeskSidebar

