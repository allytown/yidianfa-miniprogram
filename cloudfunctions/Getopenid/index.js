// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'env'//云开发id
})

// 云函数入口函数
exports.main = async (event, context) => {
  return  cloud.getWXContext()
}