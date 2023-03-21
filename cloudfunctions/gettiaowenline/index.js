// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'env'//云开发id
})
const db = cloud.database()
const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
  const countResult = await db.collection('lawline').field({_id:true}).where({
    code: event.code
  }).count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / 100)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('lawline').where({
      code: event.code
    }).field({
      _id: true,
      lawnum: true,
      title: true
    }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}