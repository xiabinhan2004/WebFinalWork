debugger;
console.log('Hello World!');
const outputbox = document.getElementById('output');
const inputbox = document.getElementById('input-tag');
const submitbox = document.getElementById('submit');
const loadingbox = document.getElementById('loading');

submitbox.addEventListener('click', async () => {
  const input = inputbox.value;
  debugger;
  addMessage(input, 'user');
  
  inputbox.value = '';

  // 显示加载动画
  loadingbox.style.display = 'block';

  // 使用 OpenAI API 获取 ChatGPT 的回答
  const response = await getResponseFromAPI(input);

  // 隐藏加载动画
  loadingbox.style.display = 'none';

  addMessage(response, 'chatgpt');
});

function addMessage(text, sender) {
  const messagebox = document.createElement('div');
  messagebox.classList.add('message');
  messagebox.classList.add(`${sender}-message`);
  messagebox.innerHTML = text;
  outputbox.appendChild(messagebox);
  outputbox.scrollTop = outputbox.scrollHeight;
  
}

async function getResponseFromAPI(input) {
    const endpoint = 'https://api.openai.com/v1/completions';
    const apiKey = 'sess-G1fYlZ53PWAlTMxnShAwJkFTueJpOSauAUsHTsPt'; //换成自己的API Key
    const prompt = input;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },

        body: JSON.stringify({
            model: "text-davinci-003",
            prompt,
            max_tokens: 100,
            n: 1,
            stop: null,
            temperature: 0.5,
        }),
    });
    const result = await response.json();
    console.log(result.choices[0].text)
    return result.choices[0].text;
}
