import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

let List = [{"id":"d6cfe5dC-b8f7-c0bA-CDDd-1b0C4CfF7d73","name":"彭秀兰","addr":"湖南省 郴州市 桂阳县","age":21,"birth":"1996-05-17","sex":1,"sexLabel":"男"},{"id":"020fdDb0-f79e-e7BC-7DEb-Fd2dfF9F0C6F","name":"易秀兰","addr":"湖南省 怀化市 辰溪县","age":37,"birth":"2019-03-22","sex":0,"sexLabel":"女"},{"id":"BA4FadeF-C4Be-5BA4-55f2-d6D2dC159Cd8","name":"汤刚","addr":"江苏省 泰州市 姜堰区","age":53,"birth":"1972-11-20","sex":0,"sexLabel":"女"},{"id":"B86Cb830-8B5B-888c-B933-5C6E91fF7FfB","name":"贺静","addr":"上海 上海市 闸北区","age":34,"birth":"1980-03-17","sex":0,"sexLabel":"女"},{"id":"fD315e2d-eaEb-14C5-2e2F-c6aB1d6BFb5D","name":"姚洋","addr":"青海省 果洛藏族自治州 久治县","age":24,"birth":"2002-06-01","sex":0,"sexLabel":"女"},{"id":"58EEadFa-E14D-1e6c-2DdD-9f66Bb8a5452","name":"曹艳","addr":"宁夏回族自治区 石嘴山市 大武口区","age":22,"birth":"1999-01-19","sex":1,"sexLabel":"男"},{"id":"AbeE9fd7-FFa5-Aaf1-f7d7-B7bfD91FfBbB","name":"高芳","addr":"上海 上海市 虹口区","age":41,"birth":"1990-10-26","sex":1,"sexLabel":"男"},{"id":"D3997F8F-2Fc7-F876-03bf-114c0eC9B249","name":"蒋霞","addr":"浙江省 丽水市 龙泉市","age":27,"birth":"2003-03-24","sex":0,"sexLabel":"女"},{"id":"d6EAA543-6Ff2-8d31-BeCD-e82F56Ba7A3f","name":"文霞","addr":"广西壮族自治区 百色市 乐业县","age":36,"birth":"2006-04-06","sex":1,"sexLabel":"男"},{"id":"51b8501C-1Bbc-394e-80f5-EE52BeeFAbfC","name":"彭军","addr":"上海 上海市 金山区","age":59,"birth":"2004-09-07","sex":0,"sexLabel":"女"},{"id":"D3Bb19e5-B900-Ba61-e08E-bfA8efE1DCeb","name":"何洋","addr":"甘肃省 平凉市 泾川县","age":55,"birth":"1986-08-20","sex":1,"sexLabel":"男"},{"id":"Fbd784d8-DA54-48cA-f7f1-C2C734BB3EB7","name":"姜涛","addr":"山西省 吕梁市 石楼县","age":29,"birth":"2012-07-16","sex":0,"sexLabel":"女"},{"id":"1dCeA640-Fc3E-D6D1-1eae-Bbb74b3EFF35","name":"任艳","addr":"山东省 青岛市 莱西市","age":42,"birth":"2007-06-25","sex":0,"sexLabel":"女"},{"id":"A088B47c-ABC3-4Fa5-D245-efA98cbeDa43","name":"龙超","addr":"江西省 上饶市 上饶县","age":54,"birth":"2009-01-17","sex":0,"sexLabel":"女"},{"id":"C790eC6a-7e46-3C77-CE1B-ddc2dE042e11","name":"夏平","addr":"内蒙古自治区 呼和浩特市 土默特左旗","age":45,"birth":"2020-03-22","sex":1,"sexLabel":"男"},{"id":"84EA6cB8-f14A-3EdF-Afc1-0bEE7fCEF554","name":"黎艳","addr":"云南省 昆明市 禄劝彝族苗族自治县","age":33,"birth":"1989-07-12","sex":0,"sexLabel":"女"},{"id":"9Df7eCAb-Ec6C-7762-93CA-d598dab60eDF","name":"汤丽","addr":"宁夏回族自治区 石嘴山市 其它区","age":18,"birth":"2016-10-04","sex":1,"sexLabel":"男"},{"id":"174CC8A0-9f03-CfDd-6e4e-c332b2BB8436","name":"于涛","addr":"海南省 三亚市 -","age":36,"birth":"1977-05-06","sex":1,"sexLabel":"男"},{"id":"83a7EDfC-FBEE-5f35-a342-17d6977bA5CE","name":"林娟","addr":"陕西省 安康市 汉阴县","age":34,"birth":"1972-04-24","sex":0,"sexLabel":"女"},{"id":"67C538e1-3F48-52aB-50ba-4C84DD516AAc","name":"萧桂英","addr":"海南省 海口市 秀英区","age":25,"birth":"1982-07-15","sex":0,"sexLabel":"女"}]

// const count = 200

// for (let i = 0; i < count; i++) {
//   List.push(
//     Mock.mock({
//       id: Mock.Random.guid(),
//       name: Mock.Random.cname(),
//       addr: Mock.mock('@county(true)'),
//       'age|18-60': 1,
//       birth: Mock.Random.date(),
//       sex: Mock.Random.integer(0, 1)
//     })
//   )
// }

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList: config => {
    console.log(config)
    const { name, page = 1, limit = 20 } = param2Obj(config.url)
    console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },
  /**
   * 增加用户
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createUser: config => {
    console.log("config",config)
    const { name, addr, age, birth, sex } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: sex
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: config => {
    console.log("id",config)
    let { id } = param2Obj(config.url)
    // const id=JSON.parse(config.body.params)
    console.log("iid",id)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 20000,
      data: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改用户
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: config => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
    const sex_num = parseInt(sex)
    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.addr = addr
        u.age = age
        u.birth = birth
        u.sex = sex_num
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  }
}
