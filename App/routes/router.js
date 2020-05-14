const router = require('koa-router')();
const controller = require('../controller/controller');
router.get('', (ctx) => {
    ctx.body = "首页"
})
router.get('queryMilk', async (ctx) => {
    let key = ctx.query.id
   let result = await controller.queryMilk(key);
   console.log(result)
   ctx.body = result;
})
router.get('getHistoryInfo', async (ctx) => {
    let key = ctx.query.id
   let result = await controller.getHistoryInfo(key);
   console.log(result)
   ctx.body = result;
})
router.get('queryAllMilks', async (ctx) => {
   let result = await controller.queryAllMilks();
   console.log(result)
   ctx.body = result;
})
router.post('addSourceInfo', async (ctx) => {
    let sourceInfo = ctx.request.body;
    let result = await controller.addSourceInfo(sourceInfo.id,sourceInfo.grassState,sourceInfo.cowState,sourceInfo.milkState)
    console.log(result)
    ctx.body = result;
 })

 router.post('addProcessInfo', async (ctx) => {
    let processInfo = ctx.request.body;
    let result = await controller.addProcessInfo(processInfo.id,processInfo.proteinContent,processInfo.sterilizeTime,processInfo.storageTime)
    console.log(result)
    ctx.body = result;
 })

 router.post('addLogInfo', async (ctx) => {
    let logInfo = ctx.request.body;
    let result = await controller.addLogInfo(logInfo.id,logInfo.logCopName,logInfo.logDepartureTm,logInfo.logArrivalTm,logInfo.logDeparturePl,logInfo.logDest,logInfo.logMOT,logInfo.tempAvg)
    console.log(result)
    ctx.body = result;
 })



module.exports = router.routes()