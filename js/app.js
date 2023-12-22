console.log('Hello World!');
const outputbox = document.getElementById('lis');
const inputbox = document.getElementById('input-tag');
const submitbox = document.getElementById('submit');
const loadingbox = document.getElementById('loading');

submitbox.addEventListener('click', async (event) => {
  event.preventDefault();
  // 阻止表单的默认提交行为
  let input = inputbox.value;
  addMessage(input, 'user');
  
  inputbox.value = '';

  // 显示加载动画
  loadingbox.style.display = 'block';

  // 使用 OpenAI API 获取 ChatGPT 的回答
  let response = await getResponseFromAPI(input);
  // console.log(response)
// debugger
  // 隐藏加载动画
  loadingbox.style.display = 'none';
// debugger
  addMessage(response, 'chatgpt');
  // debugger
});

function addMessage(text, sender) {
  const messagebox = document.createElement('div');
  messagebox.classList.add('message');
  messagebox.classList.add(`${sender}-message`);
  messagebox.innerHTML = text;
  outputbox.appendChild(messagebox);

  outputbox.scrollTop = outputbox.scrollHeight;
  
}

function getResponseFromAPI(input) {
  return new Promise((resolve, reject) => {
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    let apiKey = 'sess-G1fYlZ53PWAlTMxnShAwJkFTueJpOSauAUsHTsPt'; //换成自己的API Key
    let proprt = input;

    let params = {
      model: 'gpt-3.5-turbo',
      messages: [{
          role: 'user',
          content: proprt
      }],
    }
    let xhr = new XMLHttpRequest();
    xhr.open('post', 'https://api.openai.com/v1/chat/completions'); 
    xhr.timeout = 100000; 
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer sess-G1fYlZ53PWAlTMxnShAwJkFTueJpOSauAUsHTsPt');
    xhr.send(JSON.stringify(params));

    xhr.onload = function () {
      let res = JSON.parse(xhr.response);
      console.log(res.choices[0].message.content);
      resolve(res.choices[0].message.content);
    }

    xhr.onerror = function(e) {
      console.log('XHR请求失败: ' + e.error);
      reject(e.error);
    };
  });
}