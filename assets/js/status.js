document.addEventListener("DOMContentLoaded", function() {
    // 获取HTML元素
    const ipElement = document.getElementById('ip');
    const portElement = document.getElementById('port');
    // const motdRawElement = document.getElementById('motdRaw');
    const motdCleanElement = document.getElementById('motdClean');
    // const motdHtmlElement = document.getElementById('motdHtml');
    const playersOnlineElement = document.getElementById('playersOnline');
    const playersMaxElement = document.getElementById('playersMax');
    const versionElement = document.getElementById('version');
    const onlineElement = document.getElementById('online');
    const protocolVersionElement = document.getElementById('protocolVersion');
    const hostnameElement = document.getElementById('hostname');
    const softnameElement = document.getElementById('softname');
    const iconElement = document.getElementById('icon');
    const queryTimeElement = document.getElementById('queryTime');

    // 记录开始请求的时间
    const startTime = performance.now();

    // API的URL
    const apiUrl = `https://api.mcsrvstat.us/3/play.nhdao.space:19035?timestamp=${Date.now()}`;

    // 使用fetch获取JSON数据
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // 计算总共花费的时间
            const endTime = performance.now();
            const queryTime = (endTime - startTime) / 1000;
            const isOnline = data.online;
            // 更新 <span> 元素的内容
            onlineElement.innerText = isOnline ? '在线' : '离线';
            onlineElement.style.color = isOnline ? '#35AA53' : '#EB4334';  // 绿色或红色
            hostnameElement.innerText = data.hostname ? data.hostname : 'N/A';
            portElement.innerText = data.port;
            ipElement.innerText = data.ip;
            
            if (data.motd) {
                // motdRawElement.innerText = data.motd.raw ? data.motd.raw.join(', ') : 'N/A';
                motdCleanElement.innerText = data.motd.clean ? data.motd.clean.join(', ') : 'N/A';
                // motdHtmlElement.innerText = data.motd.html ? data.motd.html.join(', ') : 'N/A';
            } else {
                // motdRawElement.innerText = 'N/A';
                motdCleanElement.innerText = 'N/A';
                // motdHtmlElement.innerText = 'N/A';
            }

            versionElement.innerText = data.version ? data.version : 'N/A';
            softnameElement.innerText = data.software ? data.software : 'N/A';
            protocolVersionElement.innerText = data.protocol ? data.protocol.version : 'N/A';
            playersMaxElement.innerText = data.players ? data.players.max : 'N/A';
            playersOnlineElement.innerText = data.players ? data.players.online : 'N/A';

            if (data.icon) {
                iconElement.src = data.icon;
            } else {
                iconElement.style.display = 'none';
            }
            
            queryTimeElement.innerText = `${queryTime.toFixed(2)} s`;
        })
        .catch(error => {
            console.error('Error fetching server information:', error);
        });
});
