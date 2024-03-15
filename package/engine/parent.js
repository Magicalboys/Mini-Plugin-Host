const {fork} = require('child_process');
const Channel = require('./Channel');
// 创建子进程
const child = fork('./child.js');
const child2 = fork('./child2.js');

const channel = new Channel();

channel.listen(child)
channel.listen(child2)

async function main() {
   const res = await Promise.all([
        channel.sendRequest(child, 'hello',{a:1}),
        channel.sendRequest(child, 'hello',{a:2}),
    ])
    console.log(res)
}
async function main() {
    const res1 = await channel.sendRequest(child, 'sum',[1,2,3])
    
    console.log('ans',res1)
}
main()