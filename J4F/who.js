const APIs=[
    {name:'IPIP.NET',url:'https://myip.ipip.net',t:'text',f:d=>{
        const m=d.match(/IP[：:]\s*(\S+).*?来自于[：:]\s*(.+)/);
        const p=m[2].split(/\s+/);
        return{ip:m[1],loc:p.slice(0,3).join(' '),isp:p[3]}
    }},
    {name:'IP.sb',url:'https://api.ip.sb/geoip',t:'json',f:d=>({
        ip:d.ip,loc:[d.country,d.region,d.city].filter(Boolean).join(' '),isp:d.isp||d.organization
    })},
    {name:'myip.la',url:'https://api.myip.la/cn?json',t:'json',f:d=>({
        ip:d.ip,loc:[d.location?.country,d.location?.province,d.location?.city].filter(Boolean).join(' '),
        isp:d.asn?.operator
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
                <div class="row"><span class="k">IP</span><span class="v">${x.ip||'-'}</span></div>
                <div class="row"><span class="k">位置</span><span class="v">${x.loc||'-'}</span></div>
                <div class="row"><span class="k">运营商</span><span class="v">${x.isp||'-'}</span></div>
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
