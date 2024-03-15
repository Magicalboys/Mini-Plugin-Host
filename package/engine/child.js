const Channel = require('./Channel');

const channel = new Channel();

channel.listen(process);

async function sleep(time){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(123)
        },time)
    })
}

let i = 0

channel.onRequest(process,'hello',async e=>{
    if(i===0){
        i++;
        await sleep(3000)
        return 111111
    }else {
        return 22222
    }
})

// channel.onRequest(process,'Finish',async e=>{
//     const {eventName,data} = e;
//     console.log(e);
//     if (eventName === 'sum'){
//         return data.reduce((a,b)=> a + b);
//     }
// })