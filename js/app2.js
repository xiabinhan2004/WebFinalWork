console.log("hello")
window.apikey = "sess-G1fYlZ53PWAlTMxnShAwJkFTueJpOSauAUsHTsPt";
window.system = "";
window.prompt1 = "";
window.mt = 2096;
window.tpr = 1;
window.tp = 1;
window.fp = 0;
window.pp = 0;
window.mode = "true";
window.csize = 30;
window.username = "user";
const textarea = window.document.getElementById("lis");
const inputbox = window.document.getElementById("input-tag");
var histories = [];
addText("欢迎使用ChatGPT智能AI客服,本项目基于GPT-3.5 turbo接口开发,能够实现与ChatGPT类似的持续性对话功能,AI将记忆并结合语境对话。点击发送按钮发送问题,点击清空按钮清除历史记录。");
if (getCookie("apikey") != undefined && getCookie("apikey") != "") {
    window.apikey = getCookie("apikey");
} else {
    window.apikey = prompt("请在输入框内输入并提交您从官方网站获取的apikey:");
    setCookie("apikey", window.apikey);
}
if (getCookie("prompt") != undefined) {
    window.prompt1 = getCookie("prompt");
}
if (getCookie("mt") != undefined) {
    window.mt = Number(getCookie("mt"));
}
if (getCookie("tpr") != undefined) {
    window.tpr = Number(getCookie("tpr"));
}
if (getCookie("tp") != undefined) {
    window.tp = Number(getCookie("tp"));
}
if (getCookie("fp") != undefined) {
    window.fp = Number(getCookie("fp"));
}
if (getCookie("pp") != undefined) {
    window.pp = Number(getCookie("pp"));
}
if (getCookie("mode") != undefined) {
    window.mode = getCookie("mode");
}
if (getCookie("csize") != undefined) {
    window.csize = Number(getCookie("csize"));
}
function ask() {
    let intputtext = inputbox.value;
    if (intputtext.startsWith("/")) {
        intputtext = intputtext.substring(1);
        switch (intputtext) {
            case "help":
                addText("请输入以下指令来更改ChatGPT的参数:\n\n" +
                    "/apikey  (用于设置apikey,只有在官网注册获取apikey才能正常使用本服务)\n" +
                    "/system  (为每次发送的文本添加系统级描述)\n" +
                    "/prompt  (为每次发送的文本添加前置上下文)\n" +
                    "/maxtoken  (用于控制ChatGPT每次能生成的词数.)\n" +
                    "/tpr (可以用来控制ChatGPT生成的话的多样性)\n" +
                    "/top  (可以用来控制ChatGPT生成的话的质量)\n" +
                    "/fp  (可以用来控制ChatGPT生成的话的“新颖程度”)\n" +
                    "/pp  (用于控制ChatGPT产生的句子的长度)\n" +
                    "/info  (用于显示当前各项参数的值)\n" +
                    "/mode  (用于设置是否启用持续对话模式)\n" +
                    "/csize  (用于设置记忆历史对话的条数)\n" +
                    "/save  (用于将设置的参数保存到浏览器的Cookie,有效期30天)");
                break;
            case "info": addText(
                "当前的各项参数:\n\n" +
                "apikey:" + window.apikey + "\n\n" +
                "system:" + window.system + "\n\n" +
                "prompt:" + window.prompt1 + "\n\n" +
                "Max_tokens:" + window.mt + "\n" +
                "Temperature:" + window.tpr + "\n" +
                "Top_p:" + window.tp + "\n" +
                "Frequency_penalty:" + window.fp + "\n" +
                "Presence_penalty:" + window.pp + "\n" +
                "mode:" + window.mode + "\n" +
                "csize:" + window.csize);
                break;
            case "save":
                setCookie("apikey", window.apikey);
                setCookie("system", window.system);
                setCookie("prompt", window.prompt1);
                setCookie("mt", window.mt);
                setCookie("tpr", window.tpr);
                setCookie("tp", window.tp);
                setCookie("fp", window.fp);
                setCookie("pp", window.pp);
                setCookie("mode", window.mode);
                setCookie("csize", window.csize);
                addText("参数保存成功,数据将保存30天");
                break;
            case "apikey": window.apikey = prompt("apikey 请输入从官网获取到的apikey,默认为空"); addText("设置成功"); break;
            case "system": window.system = prompt("system 请输入要添加的系统级描述文本,默认为空"); addText("设置成功"); break;
            case "prompt": window.prompt1 = prompt("prompt 请输入要添加的上下文文本,默认为空"); addText("设置成功"); break;
            case "maxtoken": window.mt = Number(prompt("Max_tokens 请输入ChatGPT每次能生成的词数,默认为2096")); addText("设置成功"); break;
            case "tpr": window.tpr = Number(prompt("Temperature 请输入一个0到1.0的一位小数,默认为1.0")); addText("设置成功"); break;
            case "top": window.tp = Number(prompt("Top_p 请输入一个0到1.0的一位小数,默认为1.0")); addText("设置成功"); break;
            case "fp": window.fp = Number(prompt("Frequency_penalty 请输入一个-2.0到2.0的一位小数,默认为0")); addText("设置成功"); break;
            case "pp": window.pp = Number(prompt("Presence_penalty 请输入一个-2.0到2.0的一位小数,默认为0")); addText("设置成功"); break;
            case "mode": window.mode = prompt("mode 输入“true”开启持续对话模式,输入“false”关闭该模式,默认为“true”"); addText("设置成功"); break;
            case "csize": window.csize = Number(prompt("csize 用于设置记忆历史对话的条数,默认为30条")); addText("设置成功"); break;
            default: alert("未知指令");
        }
        inputbox.value = "";
        return;
    }
    if (window.mode == "false") {
        histories = [];
    }
    histories.push({ "role": window.username, "content": intputtext });
    
    if (histories.length > window.csize) {
        histories = histories.slice(-window.csize);
    }
    addText(window.username + "说：\n\n" + intputtext);
    textarea.value += '\n正在请求数据......';
    textarea.scrollTop = textarea.scrollHeight;
    const question = JSON.parse(JSON.stringify(histories));
    if (window.prompt1 != "") {
        question.unshift({ "role": window.username, "content": window.prompt1 });
    }
    if (window.system != "") {
        question.unshift({ "role": 'system', "content": window.system });
    }
    console.log(question);
    axios.post('https://api.openai.com/v1/chat/completions', {
        messages: question, max_tokens: window.mt, model: "gpt-3.5-turbo", temperature: window.tpr,
        top_p: window.tp, frequency_penalty: window.fp, presence_penalty: window.pp
    }, {
        headers: { 'Content-type': 'application/json', 'Authorization': 'Bearer ' + window.apikey }
    }
    ).then(response => {
        removeLine();
        let resultstring = response.data.choices[0].message.content;
        let resultname = response.data.choices[0].message.role;
        let result = { "role": resultname, "content": resultstring };
        histories.push(result);
        addText(resultname + "说:\n\n" + resultstring);
        inputbox.value = "";
    }).catch(error => {
        removeLine();
        console.log(error);
        alert("服务器报错:\n" + error);
    });
}
function addText(text) {
    textarea.value += "\n" + text + "\n" + "————————————————————";
    textarea.scrollTop = textarea.scrollHeight;
}
function removeLine() {
    let arr = textarea.value.split("\n");
    arr = arr.slice(0, arr.length - 1);
    textarea.value = arr.join("\n");
}
// 添加cookie
function setCookie(name, value) {
    let days = 10;
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
// 读取cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function clear1() {
    console.log("已清除对话历史记录。");
    histories = [];
    textarea.value = "";
}