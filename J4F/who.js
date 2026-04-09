const APIs=[
    {name:'IPIP.NET',url:'https://myip.ipip.net',t:'text',f:d=>{
        const m=d.match(/IP[：:]\s*(\S+).*?来自于[：:]\s*(.+)/);
        if(!m)return{ip:'-',country:'-',region:'-',city:'-',isp:'-'};
        const p=m[2].split(/\s+/).filter(Boolean);
        return{ip:m[1],country:p[0]||'-',region:p[1]||'-',city:p[2]||'-',isp:p[3]||'-'}
    }},
    {name:'IP.sb',url:'https://api.ip.sb/geoip',t:'json',f:d=>({
        ip:d.ip,country:d.country||'-',region:d.region||'-',city:d.city||'-',isp:d.isp||d.organization||'-'
    })},
    {name:'myip.la',url:'https://api.myip.la/cn?json',t:'json',f:d=>({
        ip:d.ip,country:d.location?.country_name||'-',region:d.location?.province||'-',city:d.location?.city||'-',isp:'-'
    })}
];

function query(){
    box.innerHTML='';
    APIs.forEach(api=>{
        const div=document.createElement('div');
        div.className='card';
        div.innerHTML=`<div class="title">${api.name}<span class="status">查询...</span></div><div class="body">-</div>`;
        box.appendChild(div);

        fetch(api.url,{mode:'cors'}).then(r=>api.t=='text'?r.text():r.json())
        .then(d=>{
            const x=api.f(d);
            div.querySelector('.status').className='status ok';
            div.querySelector('.status').textContent='成功';
            div.querySelector('.body').innerHTML=`
                <div class="row"><span class="k">IP</span><span class="v">${x.ip}</span></div>
                <div class="row"><span class="k">国家</span><span class="v">${x.country}</span></div>
                <div class="row"><span class="k">省份</span><span class="v">${x.region}</span></div>
                <div class="row"><span class="k">城市</span><span class="v">${x.city}</span></div>
                <div class="row"><span class="k">运营商</span><span class="v">${x.isp}</span></div>
                <pre>${typeof d=='string'?d:JSON.stringify(d,null,2)}</pre>
            `;
        }).catch(e=>{
            div.querySelector('.status').className='status err';
            div.querySelector('.status').textContent='失败';
            div.querySelector('.body').innerHTML=`<div class="err">${e=='Failed to fetch'?'网络/CORS错误':e}</div>`;
        });
    });
}

query();
