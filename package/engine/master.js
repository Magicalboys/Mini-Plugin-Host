const { fork } = require('child_process');

// 创建子进程
const child = fork('./package/engine/plugin_1.js');

// 监听子进程的消息
// child.on('message', (msg) => {
//     console.log('主进程收到子进程的消息',msg);
// })

// 发送消息给子进程
// child.send('Hello from parent!');

// child.on('message', msg => {
//     const { type, data } = msg;
//     if (type === 'base') {
//         child.send({
//             type:'base' ,
//             data:10
//         })
//     }
//     if (type === 'sum') {
//         console.log('求和的结果是', data);
//     }
// })

// 调用 子进程 加和 的能力
// child.send({
//     type: 'sum',
//     data: [1,2,3]
// })

const handleMessageFromMaster = (message = '') => {
    return new Promise((resolve, reject) => {
        child.on('message', response => {
            resolve(response);
        })
        child.on('error', err => {
            reject(err);
        });
        child.send(message)
    })
}

// 父子之间多次通信
// handleMessageFromMaster('父-->子: 第一次').then((response) => {
//     console.log(response);
//     return handleMessageFromMaster('父-->子: 第二次')
// }).then((res => {
//     console.log(res);
//     return handleMessageFromMaster('父-->子: 第三次')
// })).then((res => {
//     console.log(res);
// }))


// handleMessageFromMaster([1,2,3]).then((res) => {
//     console.log('第一次结果:',res);
//     return handleMessageFromMaster([4,5,6])
// }).then((res) => {
//     console.log('第二次结果:',res);
// }).then((res) => {
//     console.log('第三次结果:',res);
// })

// handleMessageFromMaster([1,2,3]).then((res) => {
//     console.log('第一次结果:',res);
//     return handleMessageFromMaster(6)
// }).then((res) => {
//     console.log('第二次结果:',res);
//     return handleMessageFromMaster('')
// }).then((res) => {
//     console.log('第三次结果:',res);
// })

const userInfo = {
    name : 'yaoshicheng',
    age : 18,
    sex : '男'
}

const log = {
    text : 'log',
    type : 'log',
    data : 'log',
}

handleMessageFromMaster('1-调用plugin1的能力').then((res) => {
        console.log(res);
        return handleMessageFromMaster('3-空语句')
    }).then((res) => {
        console.log(res.text, res.type);
        let ans = null;
        if (res.type === 'userInfo' ){
            ans = {type: 'userInfo', data: userInfo};
        }
        if (res.type === 'log') {
            ans = {type: 'log', data: log};
        }
        return handleMessageFromMaster(ans)
    }).then((res) => {
        console.log(res);
    })
