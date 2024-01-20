
// 监听消息
// process.on('message', msg =>{
//     console.log(msg)
//     // 发送给父进程
//     process.send('hello')
// })

// let temp;

// process.on('message', msg => {
//     const {type, data} = msg;
//     if (type == 'sum'){
//         const sum = data.reduce((prev, cur) => prev + cur);
//         temp = sum;
//         process.send({type: 'base'});
//     }
//     if (type == 'base'){
//         temp = temp + data;
//         process.send({type: 'sum', data: temp});
//     }
// })

const handleMessageFromChild = (message = '')  => {
    return new Promise((resolve, reject) => {
        process.on('message',response => {
            resolve(response);
        })
        process.on('error', err => {
            reject(err);
        })
        process.send(message);
    })
}

// handleMessageFromChild('子-->父: 第一次').then((response => {
//     console.log(response);
//     return handleMessageFromChild('子-->父: 第二次');
// })).then((res => {
//     console.log(res);
//     return handleMessageFromChild('子-->父: 第三次');
// })).then((res => {
//     console.log(res);
// }))

// handleMessageFromChild('求和功能被调用').then(arr1 => {
//     return handleMessageFromChild('请你给我另一个数组').then(arr2 => {
//         const arr = [...arr1, ...arr2]
//         const sum = arr.reduce((prev, cur) => prev + cur);
//         return handleMessageFromChild(sum);
//     })
// })

// handleMessageFromChild('').then((arr1) => {
//     const sum = arr1.reduce((prev, cur) => prev + cur);
//     return handleMessageFromChild(sum).then((base) => {
//           const sum2 = sum + base;
//           return handleMessageFromChild(sum2);
//     })
// })

handleMessageFromChild('2-plugin_1的功能被调用').then((res) => {
    console.log(res);
    return handleMessageFromChild({text:'4-我需要你提供',type:'log'})
}).then((res) => {
    console.log(res);
    return handleMessageFromChild('6-空语句')
}).then((res) => {
    console.log(res.type,'接收成功', res.data);
})