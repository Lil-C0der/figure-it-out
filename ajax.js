const myAjax = function (options) {
  let { url, method, data, contentType, success, fail } = options;
  data = method === "GET" || method === "HEAD" ? null : data;

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange(() => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(xhr.responseText);
      } else {
        fail(xhr.responseText);
      }
    }
  });

  xhr.open(method, url);
  if (method === "POST") {
    xhr.setRequestHeader("Content-Type", contentType);
  }
  xhr.send(data);
};

// 使用 Promise 封装
const myPromiseAjax = function (options) {
  let { url, method, data, contentType } = options;
  data = method === "GET" || method === "HEAD" ? null : data;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange(() => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.responseText);
        }
      }
    });
    xhr.open(method, url);
    if (method === "POST") {
      xhr.setRequestHeader("Content-Type", contentType);
    }
    xhr.send(data);
  });
};

// 使用 fetch API 实现 AJAX
const options = {
  // 请求方法
  method: "POST",
  // 设置请求头
  headers: { "Content-Type": "application/json" },
  // 请求参数
  body: JSON.stringify({ name: "123" }),
  // cookie设置
  credentials: "same-origin",
  // 跨域
  mode: "cors",
};

fetch("http://www.xxx.com")
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    // 响应数据
    console.log(myJson);
  })
  .catch(function (err) {
    // 异常处理
    console.log(err);
  });
