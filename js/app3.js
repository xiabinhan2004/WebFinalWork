console.log('Hello World!');
const outputbox = document.getElementById('lis');
const inputbox = document.getElementById('input-tag');
const submitbox = document.getElementById('submit');
const loadingbox = document.getElementById('loading');

submitbox.addEventListener('click', () => {
    let input = inputbox.value;
    addMessage(input, 'user');
    
    inputbox.value = '';
  
    // 显示加载动画
    loadingbox.style.display = 'block';
  
    // 使用 OpenAI API 获取 ChatGPT 的回答
    getResponseFromAPI(input).then(response => {
      console.log(response)
  
      // 隐藏加载动画
      loadingbox.style.display = 'none';
  
      addMessage(response, 'chatgpt');
    }).catch(error => {
      console.error('Error:', error);
  
      // 隐藏加载动画
      loadingbox.style.display = 'none';
    });
  });

function addMessage(text, sender) {
  const messagebox = document.createElement('div');
  messagebox.classList.add('message');
  messagebox.classList.add(`${sender}-message`);
  messagebox.innerHTML = text;
  outputbox.appendChild(messagebox);

  // outputbox.scrollTop = outputbox.scrollHeight;
  
}

async function getResponseFromAPI(input) {
    return new Promise((resolve, reject) => {
      const endpoint = 'https://api.openai.com/v1/chat/completions';
      let apiKey = 'sess-G1fYlZ53PWAlTMxnShAwJkFTueJpOSauAUsHTsPt'; //换成自己的API Key
      let proprt = input;
  
      const params = {
        model: 'gpt-3.5-turbo',
        messages: [{
            role: 'user',
            content: proprt
        }],
      }
      let xhr = new XMLHttpRequest();
      xhr.open('post', 'https://api.openai.com/v1/chat/completions'); 
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer sess-G1fYlZ53PWAlTMxnShAwJkFTueJpOSauAUsHTsPt');
      xhr.send(JSON.stringify(params));
      xhr.onload = function () {
        if (xhr.status == 200) {
          let res = JSON.parse(xhr.response)
          resolve(res.choices[0].message.content);
        } else {
          reject(new Error(xhr.statusText));
        }
      };
    });

  }


