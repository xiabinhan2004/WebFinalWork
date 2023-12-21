console.log('Hello World!');
const outputbox = document.getElementById('lis');
const inputbox = document.getElementById('input-tag');
const submitbox = document.getElementById('submit');
const loadingbox = document.getElementById('loading');

submitbox.addEventListener('click', async () => {
  let input = inputbox.value;
  addMessage(input, 'user');
  
  inputbox.value = '';

  // 显示加载动画
  loadingbox.style.display = 'block';

  // 使用 OpenAI API 获取 ChatGPT 的回答
  let response = await getResponseFromAPI(input);
  console.log(response)
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

  // outputbox.scrollTop = outputbox.scrollHeight;
  
}

async function getResponseFromAPI(input) {
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
  let result
  xhr.onload = function () {
      console.log(JSON.parse(xhr.response));
      let res = JSON.parse(xhr.response)
      // inputDom.innerHTML = inputDom.innerHTML +
      //     '<div class="message frnd_message"><p>' + res.choices[0].message.content + '</span><br><span>' +
      //     new Date().toLocaleString() +
      console.log(res.choices[0].message.content)
    
    // const response = await fetch(endpoint, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${apiKey}`
    //     },

    //     body: JSON.stringify({
    //         model: "text-davinci-003",
    //         prompt,
    //         max_tokens: 100,
    //         n: 1,
    //         stop: null,
    //         temperature: 0.5,
    //     }),
    // }
    // );
    // const result = await response.json();
    // console.log(result)
    // return result.choices[0].text;
    result = res.choices[0].message.content
}

return result
}
