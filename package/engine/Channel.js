class Channel {

     constructor(){
         this.id = this.reassign();
         this.events = new Map();
     }
 
     reassign(){
        this.id = Math.random().toString(36).substring(2, 15)
        return this.id;
     }

     listen(target){
        // 监听的是 子进程 -> 父进程
        target.on('message', (e)=>{
            this.events.get(e.id)?.(e.data)
        })
     }
 
     // 监听请求
     async onRequest(target, eventName, callback){
        // 监听的是 父进程 -> 子进程 
        target.on('message', async (e)=>{
             const res = await callback(e)
             if(res){
                 target.send({id:e.id,eventName, data: res})
             }
         })
     }

     // 发送
     async sendRequest(target, eventName, data){
         this.reassign()
         const id = this.id;
         return new Promise(resolve=>{
             this.events.set(id, resolve)
             target.send({id,eventName, data})
         })
     }
 }
 
module.exports = Channel;